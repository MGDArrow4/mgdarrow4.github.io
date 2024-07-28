<template>
  <div class="app__allocation">
    <h1>{{ getDate }}</h1>
    <div
      class="allocation__data"
      v-for="(data, key) in getFunerals"
      :key="data.id"
    >
      <h2>{{ key }}</h2>

      <allocation-point
        v-for="funeral in data"
        :key="funeral.id"
        :funeral="funeral"
      />
    </div>
  </div>
</template>

<script>
import AllocationPoint from "@/components/AppAllocation/AllocationPoint.vue";

import { useFuneralsStore } from "@/stores/FuneralsStore.js";
import { useDateStore } from "@/stores/DateStore.js";

export default {
  name: "AppFunAllocation",
  components: { AllocationPoint },
  computed: {
    getFunerals() {
      let funerals = useFuneralsStore().getFuneralsForAllocation;
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
      return `Распределить на${useDateStore().getDateDay}`;
    },
  },
};
</script>

<style lang="scss">
.app__allocation {
  width: 100%;
  height: calc(100dvh - 16dvh);
  overflow: auto;
}
</style>