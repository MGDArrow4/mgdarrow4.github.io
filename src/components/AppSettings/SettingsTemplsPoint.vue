<template>
  <the-swiper @swipe="(e) => (swipe = e)">
    <div class="settings-templs__point">
      <div class="templs-point__name">{{ templ?.name }}</div>
      <div class="templs-point__abbot-label">
        <div class="templs-point__abbot">{{ templ?.abbot }}</div>
        <div class="templs-point__label">{{ templ?.label }}</div>
      </div>
      <div class="templs-point__min-fun">{{ templ?.minFun }}</div>
    </div>
  </the-swiper>
</template>

<script>
import TheSwiper from "@/components/ui/TheSwiper.vue";
import { useTemplsStore } from "@/stores/TemplsStore.js";

export default {
  components: { TheSwiper },
  name: "SettingsTemplsPoint",
  props: ["templ"],
  data() {
    return {
      swipe: null,
    };
  },
  watch: {
    swipe(newVal) {
      if (newVal == "delete") {
        useTemplsStore().deleteTempls(this.$props.templ);
      }
      if (newVal == "edit") {
        this.$emit("getEdit", this.$props.templ.id);
      }
      this.swipe = null;
    },
  },
};
</script>

<style lang="scss">
.settings-templs__point {
  width: 100%;
  background: $col-bg-dark-hover;
  margin-bottom: 5px;
  display: flex;
  flex-wrap: nowrap;
  align-self: center;
  padding: 5px 0;
  & .templs-point__name {
    width: 55%;
    padding: 0 3px;
    text-align: center;
    align-self: center;
  }
  & .templs-point__abbot-label {
    margin: 0 5px;
    width: 40%;
    font-size: 0.8em;
    font-style: italic;
    text-align: center;
    align-self: center;
    & .templs-point__abbot {
      color: $col-basic;
    }
    & .templs-point__label {
      color: $col-bg-hover-max;
    }
  }
  & .templs-point__min-fun {
    width: 5%;
    text-align: center;
    align-self: center;
  }
}
</style>