<template>
  <div class="blank__table-location">
    <div class="table-location__name">
      <span class="print-correct"> Местоположение </span>
    </div>
    <div class="table-location__row">
      <div class="location-row__name">
        <span class="print-correct"> В храмах </span>
      </div>
      <div class="location-row__count">
        <span class="print-correct">
          {{ templs }}
        </span>
      </div>
    </div>
    <div class="table-location__row">
      <div class="location-row__name">
        <span class="print-correct"> На ГБ №2 </span>
      </div>
      <div class="location-row__count">
        <span class="print-correct">
          {{ hospital }}
        </span>
      </div>
    </div>
    <div class="table-location__row">
      <div class="location-row__name">
        <span class="print-correct"> На кладбищах </span>
      </div>
      <div class="location-row__count">
        <span class="print-correct">
          {{ cemeterys }}
        </span>
      </div>
    </div>
    <div class="table-location__row">
      <div class="location-row__name">
        <span class="print-correct"> По адресам </span>
      </div>
      <div class="location-row__count">
        <span class="print-correct">
          {{ addresses }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrintLocation",
  props: ["templs", "hospital", "cemeterys", "addresses"],
};
</script>

<style lang="scss">
.blank__table-location {
  margin-left: 6mm;
  width: 77mm;
  height: 100%;
  border: 2px solid $print-border;
  border-bottom: 1px solid $print-border;
  & .table-location__name {
    width: 100%;
    text-align: center;
    border-bottom: 2px solid $print-border;
    background: $print-deanery;
    font-size: 1.1em;
    font-weight: 500;
    padding-bottom: 1mm;
  }
  & .table-location__row {
    width: 100%;
    height: 6mm;
    display: flex;
    flex-wrap: nowrap;
    border-bottom: 1px solid $print-border;
    & .location-row__name {
      flex-grow: 1;
      padding-left: 2px;
      border-right: 1px solid $print-border;
    }
    & .location-row__count {
      text-align: center;
      width: 6mm;
      background: $print-sum;
    }
    &:nth-child(even) {
      background: $print-grey;
    }
  }
}
</style>