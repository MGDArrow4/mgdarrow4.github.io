<template>
  <div class="statistic__templs">
    <div class="templs-table__head">
      <div
        class="templs-table-head__templ"
        :class="{ sort: sort == 'id' }"
        @click="sort = 'id'"
      >
        <font-awesome-icon :icon="['fas', 'church']" />
      </div>
      <div
        class="templs-table-head__all"
        :class="{ sort: sort == 'all' }"
        @click="sort = 'all'"
      >
        <font-awesome-icon :icon="['fas', 'square-poll-vertical']" />
      </div>
      <div
        class="templs-table-head__2b"
        :class="{ sort: sort == '2b' }"
        @click="sort = '2b'"
      >
        <font-awesome-icon :icon="['fas', 'hospital']" />
      </div>
      <div
        class="templs-table-head__cemetery"
        :class="{ sort: sort == 'cemetery' }"
        @click="sort = 'cemetery'"
      >
        <font-awesome-icon :icon="['fas', 'cross']" />
      </div>
      <div
        class="templs-table-head__adress"
        :class="{ sort: sort == 'adress' }"
        @click="sort = 'adress'"
      >
        <font-awesome-icon :icon="['fas', 'house']" />
      </div>
    </div>
    <div
      class="templs-table__body"
      v-for="templ in statTemplSort"
      :key="templ.id"
    >
      <div class="templs-table-body__templ">
        {{ templ.name }}
        <span>
          {{ templ.abbot }}
        </span>
      </div>
      <div
        class="templs-table-body__all"
        :class="{
          'templs-stat-green': templ.diffFun >= 1,
          'templs-stat-orange': templ.diffFun < 1,
          'templs-stat-yellow': templ.diffFun <= 0.66,
          'templs-stat-red': templ.diffFun <= 0.33,
        }"
      >
        {{ templ.allFun }}
      </div>
      <div class="templs-table-body__2b">{{ templ.all2b }}</div>
      <div class="templs-table-body__cemetery">{{ templ.allCemetery }}</div>
      <div class="templs-table-body__adress">{{ templ.allAddress }}</div>
    </div>
  </div>
</template>

<script>
import { useTemplsStore } from "@/stores/TemplsStore.js";

export default {
  name: "StatisticTempls",
  props: ["funerals"],
  data() {
    return {
      sort: "id",
    };
  },
  computed: {
    statTempls() {
      let templs = useTemplsStore().templs;
      let templStat = [];
      let fun = this.$props.funerals;

      templs.forEach((i, id) => {
        let allFun = 0,
          all2b = 0,
          allCemetery = 0,
          allAddress = 0;

        fun.forEach((fun) => {
          if (fun.templ == i.name && fun.payment) {
            allFun = allFun + 1;
            if (fun.locationTempl == "Свято-Пантелеимоновский храм (ГБ №2)") {
              all2b = all2b + 1;
            }
            allCemetery = !!fun.locationCemetery ? ++allCemetery : allCemetery;
            allAddress = !!fun.locationAddress ? ++allAddress : allAddress;
          }
        });

        // Коэффициент недостающих отпеваний
        let diffFun = 1;
        if (i.minFun > 0) {
          diffFun = Math.round((allFun / i.minFun) * 100) / 100;
        }

        let obj = {
          id,
          name: i.name,
          abbot: i.abbot,
          allFun,
          all2b,
          allCemetery,
          allAddress,
          diffFun,
        };

        templStat.push(obj);
      });

      return templStat;
    },
    statTemplSort() {
      let stat = this.statTempls;
      switch (this.sort) {
        case "id":
          stat.sort((a, b) => a.id - b.id);
          break;
        case "all":
          stat.sort((a, b) => parseFloat(b.diffFun) - parseFloat(a.diffFun));
          break;
        case "2b":
          stat.sort((a, b) => b.all2b - a.all2b);
          break;
        case "cemetery":
          stat.sort((a, b) => b.allCemetery - a.allCemetery);
          break;
        case "adress":
          stat.sort((a, b) => b.allAddress - a.allAddress);
          break;
      }
      return stat;
    },
  },
};
</script>

<style lang="scss">
.templs-table__head {
  width: 100%;
  height: 40px;
  background: $col-bg-hover;
  position: sticky;
  top: -5px;
  display: flex;
  flex-wrap: nowrap;
  font-size: 1.3em;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 5px;
  & .templs-table-head__templ {
    width: 60%;
  }
  & .templs-table-head__all,
  .templs-table-head__2b,
  .templs-table-head__cemetery,
  .templs-table-head__adress {
    width: 10%;
  }
  & .sort {
    color: $col-basic;
  }
}
.templs-table__body {
  width: 100%;
  background: $col-bg-dark-hover;
  display: flex;
  flex-wrap: nowrap;
  font-size: 1.1em;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 5px;
  & span {
    display: block;
    font-size: 0.7em;
    color: $col-bg-hover-max;
  }
  & .templs-table-body__templ {
    width: 60%;
    text-align: left;
    padding: 5px;
  }
  & .templs-table-body__all,
  .templs-table-body__2b,
  .templs-table-body__cemetery,
  .templs-table-body__adress {
    width: 10%;
    &.templs-stat-green {
      color: $col-green;
    }
    &.templs-stat-orange {
      color: $col-chart-2;
    }
    &.templs-stat-yellow {
      color: $col-chart-8;
    }
    &.templs-stat-red {
      color: $col-red;
    }
  }
  & .templs-table-body__all {
    color: $col-basic;
  }
}
</style>