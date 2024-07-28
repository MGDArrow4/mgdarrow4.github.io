<template>
  <div class="app__statistic">
    <h1>
      Статистика за {{ this.getDateForStatistic }}
      <router-link to="/export">
        <font-awesome-icon
          :icon="['fas', 'file-arrow-down']"
          class="statistic__export"
      /></router-link>
    </h1>
    <div class="statistic__content">
      <transition name="slide">
        <statistic-templs
          v-if="statMenu == 'templ'"
          :funerals="this.getFuneralsForStatistic"
        />
        <statistic-services
          v-else-if="statMenu == 'services'"
          :funerals="this.getFuneralsForStatistic"
        />
        <statistic-funerals
          v-else-if="statMenu == 'allstat'"
          :funerals="this.getFuneralsForStatistic"
        />
      </transition>
    </div>
    <statistic-menu @statMenu="(e) => (statMenu = e)" />
  </div>
</template>

<script>
import StatisticMenu from "@/components/AppStatistic/StatisticMenu.vue";
import StatisticTempls from "@/components/AppStatistic/StatisticTempls.vue";
import StatisticServices from "@/components/AppStatistic/StatisticServices.vue";
import StatisticFunerals from "@/components/AppStatistic/StatisticFunerals.vue";

import { useDateStore } from "@/stores/DateStore.js";
import { useFuneralsStore } from "@/stores/FuneralsStore.js";
import { mapState } from "pinia";

export default {
  components: {
    StatisticMenu,
    StatisticTempls,
    StatisticServices,
    StatisticFunerals,
  },
  name: "AppFunStatistic",
  data() {
    return {
      statMenu: "templ",
    };
  },
  computed: {
    ...mapState(useDateStore, ["getDateForStatistic"]),
    ...mapState(useFuneralsStore, ["getFuneralsForStatistic"]),
  },
};
</script>

<style lang="scss">
.app__statistic {
  width: 100%;
  height: calc(100dvh - 16dvh);
  overflow: hidden;
  & h1 {
    position: relative;
    & .statistic__export {
      position: absolute;
      top: 5px;
      right: 5px;
      font-size: 0.5em;
      color: $col-basic;
    }
  }
  .statistic__content {
    width: 100%;
    height: calc(100dvh - 30dvh);
    margin-bottom: 5px;
    overflow: auto;
    position: relative;
  }
  .statistic__menu {
    width: 100%;
    height: calc(8dvh - 10px);
    display: flex;
    font-size: 1.7em;
    line-height: calc(8dvh - 15px);
    text-align: center;
  }
}
</style>