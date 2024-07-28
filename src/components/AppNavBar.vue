<template>
  <nav class="funerals-menu">
    <router-link to="/read" class="funerals-menu__point">
      <div class="point-check" v-if="!!getFuneralsForRead.length">
        {{ getFuneralsForRead.length }}
      </div>
      <font-awesome-icon :icon="['fas', 'list-ul']" size="xs"
    /></router-link>
    <router-link to="/statistic" class="funerals-menu__point">
      <font-awesome-icon :icon="['fas', 'chart-simple']" size="xs"
    /></router-link>
    <router-link to="/" class="funerals-menu__point">
      <font-awesome-icon :icon="['fas', 'plus']" size="xs"
    /></router-link>
    <router-link to="/allocation" class="funerals-menu__point">
      <div class="point-check-all" v-if="!!getFuneralsForAllocationAll.length">
        {{ getFuneralsForAllocationAll.length }}
      </div>
      <div class="point-check" v-if="!!getFuneralsForAllocation.length">
        {{ getFuneralsForAllocation.length }}
      </div>
      <font-awesome-icon :icon="['fas', 'shuffle']" size="xs"
    /></router-link>

    <router-link to="/phone" class="funerals-menu__point">
      <div class="point-check-all" v-if="!!getFuneralsForPhoneAll.length">
        {{ getFuneralsForPhoneAll.length }}
      </div>
      <div class="point-check" v-if="!!getFuneralsForPhone.length">
        {{ getFuneralsForPhone.length }}
      </div>

      <font-awesome-icon :icon="['fas', 'phone']" size="xs" />
    </router-link>

    <router-link to="/settings" class="funerals-menu__point"
      ><font-awesome-icon :icon="['fas', 'gear']" size="xs"
    /></router-link>
  </nav>
</template>

<script>
import { useFuneralsStore } from "@/stores/FuneralsStore.js";
import { mapState } from "pinia";

export default {
  name: "AppNavBar",
  computed: {
    ...mapState(useFuneralsStore, [
      "getFuneralsForPhone",
      "getFuneralsForPhoneAll",
      "getFuneralsForAllocation",
      "getFuneralsForAllocationAll",
      "getFuneralsForRead",
    ]),
  },
};
</script>

<style lang="scss">
.funerals-menu {
  width: calc(100% - 10px);
  height: calc(8dvh - 10px);
  margin: 5px;
  display: flex;
  font-size: 1.7em;
  line-height: calc(8dvh - 15px);
  text-align: center;
  & .funerals-menu__point {
    margin-right: 5px;
    background: $col-bg-hover;
    width: calc((100% / 6));
    height: calc(8dvh - 10px);
    transition: 0.3s ease-in-out;
    position: relative;
    &:last-child {
      margin-right: 0px;
      &.router-link-active {
        background: $col-basic;
      }
    }
    &.router-link-exact-active {
      background: $col-basic;
    }
  }
}
.point-check {
  position: absolute;
  height: calc((100vw - 35px) / 6 / 5);
  aspect-ratio: 1 / 1;
  outline: 1px solid $col-bg-hover;
  background: $col-basic;
  border-radius: 100%;
  top: 3%;
  right: 3%;
  font-size: calc((100vw - 35px) / 6 / 5 / 1.2);
  line-height: calc((100vw - 35px) / 6 / 5 / 1.1);
}
.point-check-all {
  position: absolute;
  height: calc((100vw - 35px) / 6 / 5);
  aspect-ratio: 1 / 1;
  outline: 1px solid $col-bg-hover;
  background: $col-bg-hover-max;
  border-radius: 100%;
  top: 3%;
  right: 3%;
  font-size: calc((100vw - 35px) / 6 / 5 / 1.2);
  line-height: calc((100vw - 35px) / 6 / 5 / 1.1);
}
</style>