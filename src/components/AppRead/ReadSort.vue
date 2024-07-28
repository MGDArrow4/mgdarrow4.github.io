<template>
  <div class="read-sort">
    <div class="sort__all">Всего: {{ all }}</div>
    <div class="sort__block">
      <div class="sort__switch" :class="{ 'js-switch--is-sort': isSort }"></div>
      <div @click="isSort = false">
        <font-awesome-icon :icon="['fas', 'truck-field']" />
      </div>
      <div @click="isSort = true">
        <font-awesome-icon :icon="['fas', 'church']" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReadSort",
  props: ["all"],
  data() {
    return {
      isSort: false,
    };
  },
  watch: {
    isSort(newVal) {
      this.$emit("isSort", newVal);
    },
  },
};
</script>

<style lang="scss">
.read-sort {
  width: 100%;
  height: calc(7dvh - 10px);
  line-height: calc(7dvh - 10px);
  margin-bottom: 5px;
  font-size: 1.3em;
  text-align: center;
  display: flex;
  flex-wrap: nowrap;
  & .sort__all {
    margin-right: 5px;
    width: 16dvh;
    background: $col-basic;
    font-weight: 400;
    text-transform: uppercase;
  }
  & .sort__block {
    width: calc(100% - 16dvh + 10px);
    height: 100%;
    background: $col-bg-hover;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    position: relative;
    & div {
      height: 100%;
      width: 50%;
      z-index: 2;
    }
    & .sort__switch {
      height: 100%;
      position: absolute;
      background: $col-basic;
      left: 0;
      transition: 0.3s ease-in-out;
      &.js-switch--is-sort {
        left: 50%;
      }
    }
  }
}
</style>