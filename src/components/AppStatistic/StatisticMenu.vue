<template>
  <div class="statistic__menu">
    <div
      class="statistic-menu__point"
      :class="{ 'statistic-menu__point--act': statMenu == 'templ' }"
      @click="statMenu = 'templ'"
    >
      <font-awesome-icon :icon="['fas', 'church']" size="xs" />
    </div>
    <div
      class="statistic-menu__point"
      :class="{ 'statistic-menu__point--act': statMenu == 'services' }"
      @click="statMenu = 'services'"
    >
      <font-awesome-icon :icon="['fas', 'truck-field']" size="xs" />
    </div>
    <div
      class="statistic-menu__point"
      :class="{ 'statistic-menu__point--act': statMenu == 'allstat' }"
      @click="statMenu = 'allstat'"
    >
      <font-awesome-icon :icon="['fas', 'chart-pie']" size="xs" />
    </div>
  </div>
</template>

<script>
export default {
  name: "StatisticMenu",
  data() {
    return {
      statMenu: "templ",
    };
  },
  watch: {
    statMenu(newVal) {
      this.$emit("statMenu", newVal);
    },
  },
};
</script>

<style lang="scss">
.statistic-menu__point {
  background: $col-bg-hover;
  width: 100%;
  height: calc(8dvh - 10px);
  transition: 0.3s ease-in-out;
  &:nth-child(2n) {
    margin: 0px 5px;
  }
  &.statistic-menu__point--act {
    background: $col-basic;
  }
}
</style>