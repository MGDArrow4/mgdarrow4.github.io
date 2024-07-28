<template>
  <the-swiper @swipe="(e) => (swipe = e)">
    <div class="settings-cemeterys__point">
      <div class="cemeterys-point__name">{{ cemetery?.name }}</div>
      <div class="cemeterys-point__label">{{ cemetery?.label }}</div>
    </div>
  </the-swiper>
</template>
  
  <script>
import TheSwiper from "@/components/ui/TheSwiper.vue";
import { useCemeterysStore } from "@/stores/CemeterysStore";

export default {
  components: { TheSwiper },
  name: "SettingsCemeterysPoint",
  props: ["cemetery"],
  data() {
    return {
      swipe: null,
    };
  },
  watch: {
    swipe(newVal) {
      if (newVal == "delete") {
        useCemeterysStore().deleteCemeterys(this.$props.cemetery);
      }
      if (newVal == "edit") {
        this.$emit("getEdit", this.$props.cemetery.id);
      }
      this.swipe = null;
    },
  },
};
</script>
  
  <style lang="scss">
.settings-cemeterys__point {
  width: 100%;
  background: $col-bg-dark-hover;
  margin-bottom: 5px;
  padding: 5px 0;
  & .cemeterys-point__name,
  .cemeterys-point__label {
    width: 100%;
    padding: 0 10px;
  }
  & .cemeterys-point__label {
    color: $col-bg-hover-max;
  }
}
</style>