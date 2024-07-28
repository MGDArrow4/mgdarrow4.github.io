<template>
  <div class="deanery__add">
    <div
      class="switch"
      :class="{ 'js-switch--is-bog': deanery == 'Богоявленский' }"
    ></div>
    <div @click="$emit('isDeanery', 'Николаеский')">Николаевский</div>
    <div @click="$emit('isDeanery', 'Богоявленский')">Богоявленский</div>
  </div>
</template>

<script>
export default {
  name: "SettingsTemplsDeanery",
  props: ["deanery"],
};
</script>

<style lang="scss">
.deanery__add {
  width: 100%;
  height: 40px;
  margin-top: 10px;
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
    &.js-switch--is-bog {
      left: 50%;
    }
  }
}
</style>