<template>
  <div class="app-push">
    <transition-group name="push">
      <div
        v-for="message in this.push"
        :key="message.id"
        class="push__item"
        :class="{
          basic: message.color == 'basic',
          red: message.color == 'red',
        }"
      >
        {{ message.label }}
      </div>
    </transition-group>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/UserStore";
import { mapState } from "pinia";

export default {
  name: "AppPush",
  computed: {
    ...mapState(useUserStore, ["push"]),
  },
};
</script>

<style lang="scss">
.app-push {
  position: fixed;
  top: 8dvh;
  right: 0;
  z-index: 99999;
  overflow: hidden;
}
.push {
  &__item {
    width: calc(80vw - 5px);
    height: calc(8dvh - 10px);
    line-height: calc(8dvh - 10px);
    margin-right: 5px;
    margin-bottom: 5px;
    font-weight: 500;
    text-transform: uppercase;
    background: $col-bg-hover-max;
    text-align: center;
    overflow: hidden;
    &.basic {
      background: $col-bg-hover-max;
    }
    &.red {
      background: $col-red;
    }
  }
  &-enter-from {
    transform: translateX(100%);
    opacity: 0;
  }
  &-enter-active {
    transition: all 0.2s ease;
  }
  &-enter-to {
    opacity: 1;
  }
  &-leave-from {
    height: calc(8dvh - 10px);
    opacity: 1;
  }
  &-leave-active {
    transition: transform 0.2s ease, opacity 0.2s, height 0.2s 0.1s;
  }
  &-leave-to {
    height: 0;
    transform: translateX(100%);
    opacity: 0;
  }
  &-move {
    transition: transform 0.3s ease;
  }
}
</style>