<template>
  <div class="statistic__services">
    <div class="service-stat__chart">
      <doughnut-chart
        class="chart__block"
        :colors="getColorsChart"
        :dataChart="getDataChart"
        :lablesChart="getLablesChart"
      />
    </div>
    <div class="services-table__head">
      <div class="services-table-head__service">
        <font-awesome-icon :icon="['fas', 'truck-field']" />
      </div>
      <div class="services-table-head__all">
        <font-awesome-icon :icon="['fas', 'square-poll-vertical']" />
      </div>
      <div class="services-table-head__check">
        <font-awesome-icon :icon="['fas', 'chart-pie']" />
      </div>
    </div>
    <div class="services-stat-table">
      <div
        class="services-table__body"
        v-for="(service, ind) in statServices"
        :key="service.id"
      >
        <div class="services-table-body__service">{{ service.name }}</div>
        <div class="services-table-body__all">
          {{ service.allFun }}
        </div>
        <div
          class="services-table-body__check"
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
    </div>
  </div>
</template>

<script>
import { useServicesStore } from "@/stores/ServicesStore.js";

import { chartColors } from "@/assets/daysName";
import DoughnutChart from "@/components/ui/DoughnutChart.vue";

export default {
  components: { DoughnutChart },
  name: "StatisticServices",
  props: ["funerals"],
  data() {
    return {
      checked: [],
      colors: chartColors,
    };
  },
  computed: {
    statServices() {
      let services = useServicesStore().services;
      let funerals = this.$props.funerals;
      let servicesStat = [];

      services.forEach((i) => {
        let allFun = funerals.reduce((acc, fun) => {
          return fun.service == i.name ? ++acc : acc;
        }, 0);

        servicesStat.push({
          name: i.name,
          allFun,
        });
      });

      return servicesStat;
    },
    getDataChart() {
      let stat = this.statServices;
      let data = [];

      stat.forEach((el, i) => {
        if (!this.checked.includes(i)) {
          data.push(el.allFun);
        }
      });
      return data;
    },
    getLablesChart() {
      let stat = this.statServices;
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
.statistic__services {
  width: 100%;
}
.service-stat__chart {
  width: 100%;
  height: 200px;
  padding: 5px;
  background: $col-bg-dark-hover;
  margin-bottom: 5px;
  & .chart__block {
    margin: 0 auto;
  }
}
.services-table__head {
  width: 100%;
  height: 40px;
  background: $col-bg-hover;
  display: flex;
  flex-wrap: nowrap;
  font-size: 1.3em;
  justify-content: center;
  align-items: center;
  text-align: center;
  & .services-table-head__service {
    width: 80%;
  }
  & .services-table-head__all,
  .services-table-head__check {
    width: 10%;
  }
  & .services-table-head__all {
    color: $col-basic;
  }
}
.services-stat-table {
  width: 100%;
  height: calc(70dvh - 250px);
  overflow: auto;
}
.services-table__body {
  width: 100%;
  background: $col-bg-dark-hover;
  display: flex;
  flex-wrap: nowrap;
  font-size: 1.1em;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 5px;
  & .services-table-body__service {
    width: 80%;
    height: max-content;
    text-align: left;
    padding: 5px;
  }
  & .services-table-body__all,
  .services-table-body__check {
    width: 10%;
  }
  & .services-table-body__all {
    color: $col-basic;
  }
}
</style>
