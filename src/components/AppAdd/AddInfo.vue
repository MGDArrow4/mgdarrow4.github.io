<template>
  <div class="add-info">
    <div class="info__funerals" v-if="getFuneralsInTempl.length && !!templ">
      <div class="info__funerals--name">В этом храме есть отпевания на:</div>
      <div
        class="info__funerals--times"
        :class="{ 'info-red': time.overlap }"
        v-for="time in getFuneralsInTempl"
        :key="time.id"
      >
        {{ time.time }}
      </div>
    </div>
    <div class="info__funerals--name" v-if="getMessageStdSun">
      Возможно накладка на службу?
    </div>
    <div class="info__funerals--name" v-if="getCelebration">
      {{ getCelebration }}
    </div>
  </div>
</template>

<script>
import { celebrations } from "@/assets/daysName";
import { useDateStore } from "@/stores/DateStore";
import { useFuneralsStore } from "@/stores/FuneralsStore";
import { mapState } from "pinia";

export default {
  name: "AddInfo",
  props: ["time", "templ"],
  data() {
    return {
      celebrations,
    };
  },
  computed: {
    ...mapState(useDateStore, ["getCorrectDate"]),
    ...mapState(useFuneralsStore, ["getFuneralsForRead"]),
    getFuneralsInTempl() {
      let funerals = this.getFuneralsForRead;
      let times = [];
      funerals.forEach((el) => {
        if (el.locationTempl == this.$props.templ) {
          let overlap = this.timeOverlap(el.time, this.$props.time);
          times.push({
            time: el.time,
            overlap,
          });
        }
      });
      return times;
    },
    getMessageStdSun() {
      let weekDay = this.getCorrectDate.week;
      if (
        (weekDay === 6) & (this.$props.time >= "13:30") ||
        (weekDay === 0 && this.$props.time <= "10:00")
      ) {
        return true;
      } else {
        return false;
      }
    },
    getCelebration() {
      let dayNow = this.getCorrectDate.day;
      let monthNow = this.getCorrectDate.month + 1;
      let req = false;
      this.celebrations.forEach((cel) => {
        if (cel.month === monthNow && cel.day === dayNow) {
          req = `Сегодня ${cel.name}`;
        }
      });
      return req;
    },
  },
  methods: {
    timeOverlap(a, b) {
      a = a.split(":");
      b = b.split(":");
      let date1 = new Date(2023, 1, 1, a[0], a[1], 0);
      let date2 = new Date(2023, 1, 1, b[0], b[1], 0);
      let diff = Math.abs((date2 - date1) / 60000);
      return diff < 15 ? true : false;
    },
  },
};
</script>

<style lang="scss">
.add-info {
  margin-top: 5px;
  width: 100%;
  & .info__funerals {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    &--name {
      width: 100%;
      padding: 0 10px;
      font-size: 1.3em;
      color: $col-basic;
    }
    &--times {
      text-align: center;
      font-size: 1.3em;
      width: max-content;
      padding: 0 10px;
      color: $col-green;
      &.info-red {
        color: $col-red;
      }
    }
  }
}
</style>