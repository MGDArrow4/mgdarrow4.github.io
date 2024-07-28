<template>
  <div class="add-services">
    <div
      class="add-services__point"
      v-for="serv in getServices"
      :key="serv.id"
      @click="$emit('getService', serv)"
    >
      {{ serv.name }}
    </div>
  </div>
</template>

<script>
import { useServicesStore } from "@/stores/ServicesStore.js";

export default {
  name: "AddServices",
  computed: {
    getServices() {
      return useServicesStore().services;
    },
  },
};
</script>

<style lang="scss">
.add-services {
  width: 100%;
  height: calc(100dvh - 24dvh + 5px);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  & .add-services__point {
    width: calc((100% - 10px) / 3);
    height: calc((100% - 15px - 8dvh) / 3);
    background: $col-bg-dark-hover;
    border: 2px solid $col-basic;
    text-align: center;
    text-transform: uppercase;
    line-height: calc((100dvh - 32dvh) / 3);
    font-size: 1.3em;
    font-weight: 400;
  }
  & .add-services__point:first-child {
    width: 100%;
    height: 8dvh;
    line-height: 8dvh;
  }
}
</style>