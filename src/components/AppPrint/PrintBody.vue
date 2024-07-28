<template>
  <div class="table__body">
    <div class="table__deanery">
      <span class="print-correct"> <slot></slot> </span>
    </div>
    <div class="row" v-for="templ in templs" :key="templ.id">
      <div class="row__templ">
        <span class="print-correct">
          {{ templ.name }}
        </span>
      </div>
      <div class="row__data">
        <div class="row-data__cell" v-for="n in days" :key="n.index">
          <div
            :class="{
              'row-data__cell--2b': getFuneralsCount2b(templ.name, n),
              'row-data__cell--cemetery': getFuneralsCountCemetery(
                templ.name,
                n
              ),
              'row-data__cell--address': getFuneralsCountAddress(templ.name, n),
            }"
          ></div>
          <span class="print-correct">
            {{ getFuneralsCount(templ.name, n) }}
          </span>
        </div>
      </div>
      <div class="row__all">
        <span class="print-correct">
          {{ getFuneralsAll(templ.name) }}
        </span>
      </div>
      <div class="row__percent">
        <span class="print-correct">
          {{ getFuneralsPercent(templ.name) }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { useDateStore } from "@/stores/DateStore";
import { useFuneralsStore } from "@/stores/FuneralsStore";
import { mapState } from "pinia";

export default {
  name: "PrintBody",
  props: ["templs", "days"],
  computed: {
    ...mapState(useDateStore, ["getCorrectDate"]),
    ...mapState(useFuneralsStore, ["getFuneralsForStatistic"]),
  },
  methods: {
    addZero(num) {
      return num < 10 ? `0${num}` : num;
    },
    getFuneralsTempl(templ) {
      let funerals = this.getFuneralsForStatistic;
      let funInTempl = funerals.filter(
        (el) => el.templ === templ && !!el.payment
      );
      return funInTempl;
    },
    getFuneralsInDate(templ, day) {
      let funerals = this.getFuneralsTempl(templ);
      let dateCall = this.getCorrectDate;
      dateCall = `${dateCall.year}-${this.addZero(
        dateCall.month + 1
      )}-${this.addZero(day)}`;
      let funInDay = funerals.filter((el) => el.date === dateCall);
      return funInDay;
    },
    getFuneralsCount(templ, day) {
      let funeralsInDay = this.getFuneralsInDate(templ, day).length;
      return funeralsInDay ? funeralsInDay : "";
    },
    getFuneralsCount2b(templ, day) {
      let funeralsInDay = this.getFuneralsInDate(templ, day);
      let is2b = funeralsInDay.filter(
        (el) => el.locationTempl === "Свято-Пантелеимоновский храм (ГБ №2)"
      );
      return is2b.length;
    },
    getFuneralsCountCemetery(templ, day) {
      let funeralsInDay = this.getFuneralsInDate(templ, day);
      let isCemetery = funeralsInDay.filter((el) => !!el.locationCemetery);
      return isCemetery.length;
    },
    getFuneralsCountAddress(templ, day) {
      let funeralsInDay = this.getFuneralsInDate(templ, day);
      let isAddress = funeralsInDay.filter((el) => !!el.locationAddress);
      return isAddress.length;
    },
    getFuneralsAll(templ) {
      let funInTemplAll = this.getFuneralsTempl(templ).length;
      return funInTemplAll ? funInTemplAll : 0;
    },
    getFuneralsPercent(templ) {
      let funInTemplAll = this.getFuneralsTempl(templ).length;
      let percent = 0;
      if (funInTemplAll) {
        percent = 100 / (this.getFuneralsForStatistic.length / funInTemplAll);
        percent = Math.round(percent * 10) / 10;
      }
      return percent;
    },
  },
};
</script>


<style lang="scss">
.table__body {
  & .table__deanery {
    width: 100%;
    height: 7mm;
    font-weight: 500;
    font-size: 1.2em;
    text-align: center;
    background: $print-deanery;
    border-bottom: 1px solid $print-border;
  }
  & .row {
    display: flex;
    flex-wrap: nowrap;
    border-bottom: 1px solid $print-border;
    text-align: center;
    font-weight: 400;
    font-size: 0.9em;
    & .row__templ {
      width: 70mm;
      border-right: 1px solid $print-border;
      text-align: left;
      padding-left: 2px;
    }
    & .row__data {
      flex-grow: 1;
      display: flex;
      flex-wrap: nowrap;
      & .row-data__cell {
        flex-basis: 0;
        flex: 1 1 0px;
        border-right: 1px solid $print-border;
        position: relative;
        &:nth-child(odd) {
          background: $print-light-grey;
        }
        & .row-data__cell--2b {
          position: absolute;
          width: 40%;
          height: 40%;
          right: 0;
          border: 5px solid transparent;
          border-top: 5px solid $print-2b;
          border-right: 5px solid $print-2b;
        }
        & .row-data__cell--cemetery {
          position: absolute;
          width: 40%;
          height: 40%;
          right: 0;
          border: 5px solid transparent;
          border-top: 5px solid $print-cemetery;
          border-right: 5px solid $print-cemetery;
        }
        & .row-data__cell--address {
          position: absolute;
          width: 40%;
          height: 40%;
          right: 0;
          border: 5px solid transparent;
          border-top: 5px solid $print-address;
          border-right: 5px solid $print-address;
        }
      }
    }
    & .row__all {
      width: 12mm;
      border-right: 1px solid $print-border;
      background: $print-sum;
    }
    & .row__percent {
      width: 10mm;
      background: $print-sum;
    }
    &:nth-child(odd) {
      background: $print-grey;
    }
  }
}
</style>