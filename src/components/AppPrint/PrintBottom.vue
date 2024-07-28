<template>
  <div class="table__bottom">
    <div class="table-bottom__name">
      <span class="print-correct"> Всего за месяц: </span>
    </div>
    <div class="table-bottom__days">
      <div class="head-bottom__number">
        <div v-for="n in days" :key="n.index">
          <span class="print-correct">
            {{ getFuneralsInDay(n) }}
          </span>
        </div>
      </div>
    </div>
    <div class="table-bottom__all-all">
      <span class="print-correct">
        {{ getFuneralsAllMonth }}
      </span>
    </div>
    <div class="table-bottom__bo">
      <span class="print-correct">
        {{ getFuneralsAllMonthWithoutPayment }} б/о
      </span>
    </div>
  </div>
</template>

<script>
import { useFuneralsStore } from "@/stores/FuneralsStore";
import { useDateStore } from "@/stores/DateStore";

export default {
  name: "PrintBottom",
  props: ["days"],
  computed: {
    getFuneralsAllMonth() {
      let funerals = useFuneralsStore().getFuneralsForStatistic;
      let funAllPayment = funerals.filter((el) => !!el.payment);
      return funAllPayment.length;
    },
    getFuneralsAllMonthWithoutPayment() {
      let funerals = useFuneralsStore().getFuneralsForStatistic;
      let funAllWithoutPayment = funerals.filter((el) => !el.payment);
      return funAllWithoutPayment.length;
    },
  },
  methods: {
    getFuneralsInDay(day) {
      let funerals = useFuneralsStore().getFuneralsForStatistic;
      let dateCall = useDateStore().getCorrectDate;
      dateCall = `${dateCall.year}-${this.addZero(
        dateCall.month + 1
      )}-${this.addZero(day)}`;
      let funInDay = funerals.filter(
        (el) => el.date === dateCall && el.payment
      );
      return funInDay.length;
    },
    addZero(num) {
      return num < 10 ? `0${num}` : num;
    },
  },
};
</script>

<style lang="scss">
.table__bottom {
  display: flex;
  flex-wrap: nowrap;
  font-weight: 500;
  text-align: center;
  height: 6mm;
  line-height: 6mm;
  font-size: 0.9em;
  background: $print-sum;
  & .table-bottom__name {
    width: 70mm;
    border-right: 1px solid $print-border;
  }
  & .table-bottom__days {
    flex-grow: 1;
    & .head-bottom__number {
      display: flex;
      flex-wrap: nowrap;
      height: 6mm;
      font-weight: 400;
      & div {
        flex-basis: 0;
        flex: 1 1 0px;
        border-right: 1px solid $print-border;
      }
    }
  }
  & .table-bottom__all-all {
    width: 12mm;
    font-size: 1.1em;
    border-right: 1px solid $print-border;
    background: $print-sumAll;
  }
  & .table-bottom__bo {
    width: 10mm;
    font-size: 0.9em;
  }
}
</style>