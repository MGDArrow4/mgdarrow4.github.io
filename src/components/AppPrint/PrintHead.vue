<template>
  <div class="table__head">
    <div class="table-head__name">
      <span class="print-correct">
        {{ month }}
      </span>
    </div>
    <div class="table-head__days">
      <div class="head-days__number">
        <div v-for="n in getDayInMonth" :key="n.index">
          <span class="print-correct">
            {{ n }}
          </span>
        </div>
      </div>
      <div class="head-days__week">
        <div
          v-for="n in getDayInMonth"
          :key="n.index"
          :class="{ 'js-weekSunday': getWeekDay(n) == 'Вс' }"
        >
          <span class="print-correct">
            {{ getWeekDay(n) }}
          </span>
        </div>
      </div>
    </div>
    <div class="table-head__all-in-templ">
      <span class="print-correct"> Всего </span>
    </div>
    <div class="table-head__percent">
      <span class="print-correct"> % </span>
    </div>
  </div>
</template>

<script>
import { DaysWeakWithoutDot } from "@/assets/daysName";
import { useDateStore } from "@/stores/DateStore";
import { mapState } from "pinia";

export default {
  name: "PrintHead",
  props: ["month"],
  computed: {
    ...mapState(useDateStore, ["getCorrectDate"]),
    getDayInMonth() {
      let year = this.getCorrectDate.year;
      let month = this.getCorrectDate.month;
      return (
        (new Date(year, month + 1, 1) - new Date(year, month, 1)) / 86400000
      );
    },
  },
  methods: {
    getWeekDay(day) {
      let dayWeek = new Date(
        this.getCorrectDate.year,
        this.getCorrectDate.month,
        day
      ).getDay();
      return DaysWeakWithoutDot[dayWeek];
    },
  },
};
</script>

<style lang="scss">
.table__head {
  display: flex;
  flex-wrap: nowrap;
  font-weight: 500;
  text-align: center;
  height: 11mm;
  & .table-head__name {
    width: 70mm;
    font-size: 1.3em;
    line-height: 11mm;
    border-right: 1px solid $print-border;
    border-bottom: 1px solid $print-border;
  }
  & .table-head__days {
    flex-grow: 1;
    height: 11mm;
    & .head-days__number,
    .head-days__week {
      display: flex;
      flex-wrap: nowrap;
      height: 5.5mm;
      & div {
        flex-basis: 0;
        flex: 1 1 0px;
        border-right: 1px solid $print-border;
        border-bottom: 1px solid $print-border;
        &:nth-child(odd) {
          background: $print-light-grey;
        }
        &.js-weekSunday {
          background: $print-sunday;
          font-weight: 400;
        }
      }
    }
    & .head-days__week {
      font-weight: 300;
    }
  }
  & .table-head__all-in-templ {
    width: 12mm;
    border-right: 1px solid $print-border;
    border-bottom: 1px solid $print-border;
    background: $print-sum;
    font-size: 1.3em;
    line-height: 11mm;
  }
  & .table-head__percent {
    width: 10mm;
    background: $print-sum;
    border-bottom: 1px solid $print-border;
    font-size: 1.3em;
    line-height: 11mm;
  }
}
</style>