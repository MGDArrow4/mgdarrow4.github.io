<template>
  <div class="app__read">
    <h1>
      {{ getDate }}
    </h1>
    <div class="read__empty" v-if="!isEmpty">Отпеваний нет</div>
    <read-sort v-if="isEmpty" :all="isEmpty" @isSort="(e) => (sort = e)" />
    <div
      class="read__service"
      v-for="(service, key) in getFuneralsArray"
      :key="service.id"
    >
      <h2>{{ key }}</h2>
      <the-swiper
        @swipe="(e) => swipeEmit(e, funeral.id)"
        v-for="funeral in service"
        :key="funeral.id"
      >
        <read-point :funeral="funeral" />
      </the-swiper>
    </div>
  </div>
</template>

<script>
import ReadPoint from "@/components/AppRead/ReadPoint.vue";
import TheSwiper from "@/components/ui/TheSwiper.vue";

import { useDateStore } from "@/stores/DateStore.js";
import { useFuneralsStore } from "@/stores/FuneralsStore.js";
import ReadSort from "@/components/AppRead/ReadSort.vue";

export default {
  name: "AppFunRead",
  components: { ReadPoint, TheSwiper, ReadSort },
  data() {
    return {
      sort: false,
    };
  },
  computed: {
    getDate() {
      return `Отпевания на${useDateStore().getDateDay}`;
    },
    isEmpty() {
      return useFuneralsStore().getFuneralsForRead.length;
    },
    getFuneralsArray() {
      return useFuneralsStore().getFuneralsForRead.reduce((group, funeral) => {
        const { service } = funeral;
        const { templ } = funeral;
        if (!this.sort) {
          group[service] = group[service] ?? [];
          group[service].push(funeral);
        } else {
          if (templ == false || templ == "false") {
            group["Не распределено"] = group["Не распределено"] ?? [];
            group["Не распределено"].push(funeral);
          } else {
            group[templ] = group[templ] ?? [];
            group[templ].push(funeral);
          }
        }
        return group;
      }, {});
    },
  },
  methods: {
    swipeEmit(newVal, id) {
      if (newVal == "delete") {
        useFuneralsStore().deleteFunerals(id);
      }
      if (newVal == "edit") {
        this.$router.replace({ path: `/edit/${id}` });
      }
    },
  },
};
</script>

<style lang="scss">
.app__read {
  width: 100%;
  height: calc(100dvh - 16dvh);
  overflow: auto;
}
.read__empty {
  width: 100%;
  height: 100%;
  height: calc(100dvh - 24dvh);
  line-height: calc(100dvh - 24dvh);
  text-align: center;
  font-weight: 500;
  font-size: 2em;
  color: $col-basic;
  text-transform: uppercase;
}
</style>