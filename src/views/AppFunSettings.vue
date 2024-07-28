<template>
  <div class="app__settings">
    <h1>Настройки</h1>
    <div class="settings__conten">
      <router-view v-slot="{ Component }">
        <transition name="slide">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <div class="settings__menu">
      <router-link to="/settings/templs" class="settings-menu__point">
        <font-awesome-icon :icon="['fas', 'church']" size="xs"
      /></router-link>
      <router-link to="/settings/cemeterys" class="settings-menu__point">
        <font-awesome-icon :icon="['fas', 'cross']" size="xs"
      /></router-link>
      <router-link to="/settings/services" class="settings-menu__point">
        <font-awesome-icon :icon="['fas', 'truck-field']" size="xs"
      /></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppFunSettings",
};
</script>

<style lang="scss">
.app__settings {
  width: 100%;
}
.settings__conten {
  width: 100%;
  height: calc(100dvh - 30dvh);
  overflow: auto;
  position: relative;
}
.settings__menu {
  width: 100%;
  height: calc(8dvh - 10px);
  margin-top: 5px;
  display: flex;
  font-size: 1.7em;
  line-height: calc(8dvh - 15px);
  text-align: center;
  & .settings-menu__point {
    background: $col-bg-hover;
    width: 100%;
    height: calc(8dvh - 10px);
    transition: 0.3s ease-in-out;
    &:nth-child(2n) {
      margin: 0px 5px;
    }
    &.router-link-exact-active {
      background: $col-basic;
    }
  }
}
</style>