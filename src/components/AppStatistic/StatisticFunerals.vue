<template>
  <div class="statistic__funerals">
    <div class="funerals-stat__chart">
      <doughnut-chart
        class="chart__block"
        :colors="getColorsChart"
        :dataChart="getDataChart"
        :lablesChart="getLablesChart"
      />
    </div>
    <div class="funerals-table__head">
      <div class="funerals-table-head__funeral">
        <font-awesome-icon :icon="['fas', 'chart-column']" />
      </div>
      <div class="funerals-table-head__all">
        <font-awesome-icon :icon="['fas', 'square-poll-vertical']" />
      </div>
      <div class="funerals-table-head__check">
        <font-awesome-icon :icon="['fas', 'chart-pie']" />
      </div>
    </div>
    <div class="funerals-stat-table">
      <div
        class="funerals-table__body"
        v-for="(funeral, ind) in statFunerals"
        :key="funeral.id"
      >
        <div class="funerals-table-body__funeral">{{ funeral.name }}</div>
        <div class="funerals-table-body__all">
          {{ funeral.stat }}
        </div>
        <div
          class="funerals-table-body__check"
          @click="changeCheck(ind)"
          :style="{ color: colors[ind] }"
        >
          <font-awesome-icon
            :icon="['fas', 'square-check']"
            v-if="!checked.includes(ind)"
          />
          <font-awesome-icon :icon="['far', 'square']" v-else />
        </div>
      </div>
      <div
        class="funerals-table-body__allFun"
        @click="emailsOpen = !emailsOpen"
      >
        Всего за месяц: {{ getFuneralsLength }}
      </div>
      <div class="funerals-table-body__emails" v-if="emailsOpen">
        <div
          class="funerals-table-body__emails__item"
          v-for="(email, i) in emailFunerals"
          :key="email.id"
        >
          <span> {{ i }}</span>
          <span> {{ email }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { chartColors } from "@/assets/daysName";
import DoughnutChart from "@/components/ui/DoughnutChart.vue";

import { useFuneralsStore } from "@/stores/FuneralsStore.js";

export default {
  components: { DoughnutChart },
  name: "StatisticFunerals",
  props: ["funerals"],
  data() {
    return {
      checked: [],
      colors: chartColors,
      emailsOpen: false,
    };
  },
  computed: {
    statFunerals() {
      let funerals = this.$props.funerals;
      let allTempls = 0,
        all2b = 0,
        allCemeterys = 0,
        allAdress = 0;

      funerals.forEach((el) => {
        if (el.locationTempl) {
          if (el.locationTempl != "Свято-Пантелеимоновский храм (ГБ №2)") {
            ++allTempls;
          } else {
            ++all2b;
          }
        }
        allCemeterys = el.locationCemetery ? ++allCemeterys : allCemeterys;
        allAdress = el.locationAddress ? ++allAdress : allAdress;
      });

      let funeralsStat = [
        { name: "В храмах", stat: allTempls },
        { name: "На ГБ №2", stat: all2b },
        { name: "На Кладбищах", stat: allCemeterys },
        { name: "По адресам", stat: allAdress },
      ];

      return funeralsStat;
    },
    emailFunerals() {
      let funerals = this.$props.funerals;
      let emails = {};
      funerals.forEach((fun) => {
        emails[`${fun.idUserName}`] = emails.hasOwnProperty(`${fun.idUserName}`)
          ? ++emails[`${fun.idUserName}`]
          : 1;
      });
      return emails;
    },
    getDataChart() {
      let stat = this.statFunerals;
      let data = [];

      stat.forEach((el, i) => {
        if (!this.checked.includes(i)) {
          data.push(el.stat);
        }
      });

      return data;
    },
    getLablesChart() {
      let stat = this.statFunerals;
      let lables = [];

      stat.forEach((el, i) => {
        if (!this.checked.includes(i)) {
          lables.push(el.name);
        }
      });

      return lables;
    },
    getColorsChart() {
      let colorsArr = chartColors;
      let colors = [];
      colorsArr.forEach((el, i) => {
        if (!this.checked.includes(i)) {
          colors.push(el);
        }
      });

      return colors;
    },
    getFuneralsLength() {
      return useFuneralsStore().getFuneralsForStatistic.length;
    },
  },
  methods: {
    changeCheck(ind) {
      if (this.checked.indexOf(ind, 0) != -1) {
        this.checked.splice(this.checked.indexOf(ind, 0), 1);
      } else {
        this.checked.push(ind);
      }
    },
  },
};
</script>
  
<style lang="scss">
.statistic__funerals {
  width: 100%;
}
.funerals-stat__chart {
  width: 100%;
  height: 200px;
  padding: 5px;
  background: $col-bg-dark-hover;
  margin-bottom: 5px;
  & .chart__block {
    margin: 0 auto;
  }
}
.funerals-table__head {
  width: 100%;
  height: 40px;
  background: $col-bg-hover;
  display: flex;
  flex-wrap: nowrap;
  font-size: 1.3em;
  justify-content: center;
  align-items: center;
  text-align: center;
  & .funerals-table-head__funeral {
    width: 80%;
  }
  & .funerals-table-head__all,
  .funerals-table-head__check {
    width: 10%;
  }
  & .funerals-table-head__all {
    color: $col-basic;
  }
}
.funerals-stat-table {
  width: 100%;
  height: calc(70dvh - 250px);
  overflow: auto;
}
.funerals-table__body {
  width: 100%;
  background: $col-bg-dark-hover;
  display: flex;
  flex-wrap: nowrap;
  font-size: 1.1em;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 5px;
  & .funerals-table-body__funeral {
    width: 80%;
    height: max-content;
    text-align: left;
    padding: 5px;
  }
  & .funerals-table-body__all,
  .funerals-table-body__check {
    width: 10%;
  }
  & .funerals-table-body__all {
    color: $col-basic;
  }
}
.funerals-table-body__allFun {
  width: 100%;
  padding: 5px;
  font-size: 1.3em;
  margin-top: 5px;
  background: $col-bg-dark-hover;
  text-align: center;
  text-transform: uppercase;
  font-weight: 500;
}
.funerals-table-body__emails {
  &__item {
    width: 100%;
    padding: 5px 15%;
    font-size: 1.1em;
    margin-top: 5px;
    background: $col-bg-dark-hover;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
    & span {
      display: block;
      width: 80%;
      &:last-child {
        text-align: right;
        width: 20%;
        color: $col-basic;
      }
    }
  }
}
</style>
  