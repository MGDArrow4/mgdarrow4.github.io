<template>
  <div class="log-reg">
    <login-reg-log
      class="log-reg__login"
      :class="{ 'js-log-reg--active': !isReg }"
    ></login-reg-log>
    <login-reg-reg
      class="log-reg__registration"
      :class="{ 'js-log-reg--active': isReg }"
    ></login-reg-reg>
    <login-reg-nav
      class="log-reg__nav"
      @isReg="(e) => (isReg = e)"
    ></login-reg-nav>
  </div>
</template>

<script>
import LoginRegNav from "@/components/AppLogin/LoginRegNav.vue";
import LoginRegLog from "@/components/AppLogin/LoginRegLog.vue";
import LoginRegReg from "@/components/AppLogin/LoginRegReg.vue";

export default {
  components: { LoginRegNav, LoginRegLog, LoginRegReg },
  name: "LayoutLogin",
  data() {
    return {
      isReg: false,
    };
  },
};
</script>

<style lang="scss">
.log-reg {
  height: calc(100dvh - 10px);
  padding: 10px;
  margin: 5px;
  border: 2px solid $col-basic;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  & .log-reg__login,
  .log-reg__registration {
    width: 0px;
    height: calc(100dvh - 95px);
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    &.js-log-reg--active {
      width: 100%;
    }
  }
}
</style>