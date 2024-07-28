<template>
  <div class="blank__table-legend">
    <div class="table-legend__name">
      <span class="print-correct"> Легенда </span>
    </div>
    <div class="table-legend__row">
      <div class="legend-row__name">
        <span class="print-correct"> На 2-й больнице </span>
      </div>
      <div class="legend-row__count legend-2b"></div>
    </div>
    <div class="table-legend__row">
      <div class="legend-row__name">
        <span class="print-correct"> На кладбище </span>
      </div>
      <div class="legend-row__count legend-cemetery"></div>
    </div>
    <div class="table-legend__row">
      <div class="legend-row__name">
        <span class="print-correct"> На адресе </span>
      </div>
      <div class="legend-row__count legend-address"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrintLegend",
};
</script>

<style lang="scss">
.blank__table-legend {
  margin-left: 6mm;
  flex-grow: 1;
  height: 100%;
  border: 2px solid $print-border;
  border-bottom: 1px solid $print-border;
  & .table-legend__name {
    width: 100%;
    text-align: center;
    border-bottom: 2px solid $print-border;
    background: $print-deanery;
    font-size: 1.1em;
    font-weight: 500;
    padding-bottom: 1mm;
  }
  & .table-legend__row {
    width: 100%;
    height: 6mm;
    display: flex;
    flex-wrap: nowrap;
    border-bottom: 1px solid $print-border;
    & .legend-row__name {
      flex-grow: 1;
      padding-left: 2px;
      border-right: 1px solid $print-border;
    }
    & .legend-row__count {
      width: 6mm;
      &.legend-2b {
        background: $print-2b;
      }
      &.legend-cemetery {
        background: $print-cemetery;
      }
      &.legend-address {
        background: $print-address;
      }
    }
    &:nth-child(even) {
      background: $print-grey;
    }
  }
}
</style>