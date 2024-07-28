<template>
  <div class="log-reg__nav--inside">
    <div class="switch" :class="{ 'js-switch--is-reg': isReg }"></div>
    <div @click="isReg = false">Авторизация</div>
    <div @click="isReg = true">Регистрация</div>
  </div>
</template>

<script>
export default {
  name: "LoginRegNav",
  data() {
    return {
      isReg: false,
    };
  },
  watch: {
    isReg(newVal) {
      this.$emit("isReg", newVal);
    },
  },
};
</script>

<style lang="scss">
.log-reg__nav--inside {
  width: 100%;
  height: 40px;
  margin: 10px auto;
  background: $col-bg-dark-hover;
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  & div {
    width: 50%;
    z-index: 2;
    text-align: center;
    font-size: 22px;
  }
  & .switch {
    height: 40px;
    position: absolute;
    background: $col-basic;
    left: 0;
    transition: 0.3s ease-in-out;
    &.js-switch--is-reg {
      left: 50%;
    }
  }
}
</style>