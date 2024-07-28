<template>
  <div class="app__phone">
    <h1>{{ getDate }}</h1>
    <div class="phone__date" v-for="(date, key) in getFunerals" :key="date.id">
      <h2>{{ key }}</h2>
      <the-swiper-phone
        v-for="funeral in date"
        :key="funeral.id"
        :phoneLocation="funeral.phoneLocation"
        :phoneTempl="funeral.phoneTempl"
        @swipe="(e) => getSwipe(e, funeral.id)"
      >
        <read-point :funeral="funeral" />
      </the-swiper-phone>
    </div>
  </div>
</template>

<script>
import ReadPoint from "@/components/AppRead/ReadPoint.vue";
import TheSwiperPhone from "@/components/ui/TheSwiperPhone.vue";

import { useFuneralsStore } from "@/stores/FuneralsStore.js";
import { useDateStore } from "@/stores/DateStore.js";

export default {
  name: "AppFunPhone",
  components: { ReadPoint, TheSwiperPhone },
  computed: {
    getFunerals() {
      let funerals = useFuneralsStore().getFuneralsForPhone;
      const templs = funerals.reduce((group, funeral) => {
        const { locationTempl } = funeral;
        const { locationCemetery } = funeral;
        const { locationAddress } = funeral;
        if (locationTempl) {
          group[locationTempl] = group[locationTempl] ?? [];
          group[locationTempl].push(funeral);
        }
        if (locationCemetery) {
          group[locationCemetery] = group[locationCemetery] ?? [];
          group[locationCemetery].push(funeral);
        }
        if (locationAddress) {
          group[locationAddress] = group[locationAddress] ?? [];
          group[locationAddress].push(funeral);
        }

        return group;
      }, {});
      return templs;
    },
    getDate() {
      return `Обзвон на${useDateStore().getDateDay}`;
    },
  },
  methods: {
    async getSwipe(swipe, id) {
      if (swipe === "templ") {
        useFuneralsStore().putFunerals({ phoneTempl: true }, id);
      } else {
        useFuneralsStore().putFunerals({ phoneLocation: true }, id);
      }
    },
  },
};
</script>

<style lang="scss">
.app__phone {
  width: 100%;
  height: calc(100dvh - 16dvh);
  overflow: auto;
}
</style>