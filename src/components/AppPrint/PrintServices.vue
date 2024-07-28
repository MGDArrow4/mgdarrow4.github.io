<template>
  <div class="blank__table-services">
    <div class="table-services__name">
      <span class="print-correct"> Ритуальные услуги </span>
    </div>
    <div class="row-services" v-for="service in services" :key="service.id">
      <div class="services__name">
        <span class="print-correct">
          {{ service.name }}
        </span>
      </div>
      <div class="services__count">
        <span class="print-correct">
          {{ getServicesAll(service.name) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { useFuneralsStore } from "@/stores/FuneralsStore";

export default {
  name: "PrintServices",
  props: ["services"],
  methods: {
    getServicesAll(service) {
      let funerals = useFuneralsStore().getFuneralsForStatistic;
      let servicesInMonth = funerals.filter((el) => el.service == service);
      return servicesInMonth.length;
    },
  },
};
</script>

<style lang="scss">
.blank__table-services {
  width: 154mm;
  border: solid $print-border;
  border-width: 2px 0px 1px 2px;
  display: flex;
  flex-wrap: wrap;
  & .table-services__name {
    width: 100%;
    text-align: center;
    border-bottom: 2px solid $print-border;
    border-right: 2px solid $print-border;
    background: $print-deanery;
    font-size: 1.1em;
    font-weight: 500;
    padding-bottom: 1mm;
  }
  & .row-services {
    width: calc(50% - 1px);
    height: 6mm;
    display: flex;
    flex-wrap: nowrap;
    border-bottom: 1px solid $print-border;
    & .services__name {
      flex-grow: 1;
      padding-left: 2px;
      border-right: 1px solid $print-border;
    }
    & .services__count {
      text-align: center;
      border-right: 1px solid $print-border;
      width: 6mm;
      background: $print-sum;
    }
    &:nth-child(odd) {
      border-right: 1px solid $print-border;
    }
    &:nth-child(even) {
      width: calc(50% + 1px);
    }
    &:nth-child(4n + 1) {
      background: $print-grey;
    }
    &:nth-child(4n + 2) {
      background: $print-grey;
    }
  }
}
</style>