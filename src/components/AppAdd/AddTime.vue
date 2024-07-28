<template>
  <div class="add-time">
    <div
      class="add-time__point"
      v-for="(blank, i) in timeBlanks"
      :key="i"
      @click="time = blank"
    >
      {{ blank }}
    </div>
    <!-- <div class="add-time__point-any">Другое</div> -->
    <input type="time" class="add-time__point-any" v-model="time" />
  </div>
</template>

<script>
export default {
  name: "AddTime",
  data() {
    return {
      time: "00:00",
    };
  },
  computed: {
    timeBlanks() {
      let hours = ["08", "09", "10", "11", "12", "13", "14", "15"];
      let minutes = ["00", "15", "30", "45"];
      let blanks = [];
      hours.forEach((h) => {
        minutes.forEach((m) => {
          blanks.push(`${h}:${m}`);
        });
      });
      return blanks;
    },
  },
  watch: {
    time(newVal) {
      this.$emit("getTime", newVal);
    },
  },
};
</script>

<style lang="scss">
.add-time {
  width: 100%;
  height: calc(100dvh - 24dvh + 5px);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  overflow: auto;
  & .add-time__point,
  .add-time__point-any {
    width: calc((100% - 15px) / 4);
    height: calc((100% - 8dvh) / 9);
    background: $col-bg-dark-hover;
    border: 2px solid $col-basic;
    text-align: center;
    text-transform: uppercase;
    line-height: calc((100dvh - 32dvh - 15px) / 9);
    font-size: 1.3em;
    font-weight: 400;
  }
  & .add-time__point-any {
    width: 100%;
    color: $col-text;
    outline: none;
  }
}
</style>