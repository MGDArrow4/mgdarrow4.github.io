<template>
  <div class="input-block">
    <label
      :class="{
        'input--is-focus': isFocus,
        'input--is-text': modelValue || modelValue === 0,
        'input--is-valid': dirty && !isFocus && valid,
        'input--is-invalid': dirty && !isFocus && !valid,
      }"
    >
      {{ labelText }}
      <input
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="isFocus = true"
        @blur="
          isFocus = false;
          $emit('blur', true);
        "
      />
    </label>
  </div>
</template>

<script>
export default {
  name: "TheInputText",
  props: ["type", "label", "dirty", "valid", "labelInvalid", "modelValue"],
  data() {
    return {
      isFocus: false,
    };
  },
  computed: {
    labelText() {
      if (this.$props.labelInvalid && !this.isFocus && this.$props.dirty) {
        return `Заполните поле "${this.$props.label}"`;
      } else {
        return this.$props.label;
      }
    },
  },
};
</script>

<style lang="scss">
.input-block {
  width: 100%;
  height: 80px;
  position: relative;
  margin: 5px auto 0;
  & label {
    width: 100%;
    height: 40px;
    position: absolute;
    padding: 0 2%;
    color: $col-bg-hover-max;
    font-size: 22px;
    top: 40px;
    // overflow: hidden;
    transition: all 0.3s ease-in-out;
    & input {
      width: 100%;
      height: 40px;
      position: absolute;
      top: 0px;
      left: 0;
      padding: 0 2%;
      color: $col-text;
      font-size: 22px;
      background: transparent;
      outline: transparent;
      border: 0px;
      border-bottom: 2px solid $col-bg-hover-max;
      transition: all 0.3s ease-in-out;
    }
    &.input--is-focus,
    &.input--is-text {
      top: 0;
      & input {
        top: 40px;
      }
    }
    &.input--is-focus,
    &.input--is-text {
      color: $col-basic;
      & input {
        border-bottom: 2px solid $col-basic;
      }
    }
    &.input--is-valid {
      color: $col-green;
      & input {
        border-bottom: 2px solid $col-green;
      }
    }
    &.input--is-invalid {
      color: $col-red;
      & input {
        border-bottom: 2px solid $col-red;
      }
    }
  }
}
</style>