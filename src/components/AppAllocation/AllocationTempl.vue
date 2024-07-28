<template>
  <div
    class="allocation__templs"
    :class="{
      'allocation__templs--open': open,
      'allocation__templs--open-max': getTempls,
    }"
  >
    <the-input-text
      :type="'text'"
      :label="'Выбрать храм'"
      v-model.trim="inputTempl"
    />
    <div class="add-templ__blanks">
      <div
        class="add-templ__blank"
        v-for="templ in getTempls"
        :key="templ.id"
        @click="inputTempl = templ.name"
      >
        <div class="add-templ__blank--name">{{ templ?.name }}</div>
        <div class="add-templ__blank--label">{{ templ?.label }}</div>
        <div class="add-templ__blank--abbot">{{ templ?.abbot }}</div>
      </div>
    </div>
    <the-button :text="'Распределить'" @click="updateAllocation()" />
  </div>
</template>

<script>
import TheButton from "@/components/ui/TheButton.vue";
import TheInputText from "@/components/ui/TheInputText.vue";

import { useFuneralsStore } from "@/stores/FuneralsStore.js";

export default {
  components: { TheInputText, TheButton },
  name: "AllocationTempl",
  props: ["open", "templs", "funeral"],
  data() {
    return {
      inputTempl: "",
    };
  },
  computed: {
    getTempls() {
      let templs = this.$props.templs;
      let inputNow = this.inputTempl.toLowerCase();
      if (inputNow === "" || this.isTempl) {
        return;
      }

      let block = templs.filter((el) => {
        let Name = el.name.toLowerCase().includes(inputNow);
        let Abbot = el.abbot
          ? el.abbot.toLowerCase().includes(inputNow)
          : false;
        let Label = el.label
          ? el.label.toLowerCase().includes(inputNow)
          : false;
        return Name || Abbot || Label;
      });

      return block;
    },
    isTempl() {
      let templs = this.$props.templs;
      return templs.find((el) => {
        return el.name.toLowerCase() === this.inputTempl.toLowerCase();
      });
    },
  },
  methods: {
    updateAllocation() {
      if (this.isTempl) {
        useFuneralsStore().putFunerals(
          { templ: this.inputTempl },
          this.$props.funeral.id
        );
      }
    },
  },
};
</script>

<style lang="scss">
.allocation__templs {
  width: 100%;
  height: 0px;
  overflow: hidden;
  background: $col-bg-dark-hover;
  transition: 0.2s ease-in-out;
  padding: 0 5px;
  &.allocation__templs--open {
    height: 150px;
  }
  &.allocation__templs--open-max {
    height: max-content;
  }
}
.add-templ__blanks {
  width: 100%;
  max-height: 160px;
  overflow: auto;
  & .add-templ__blank {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid $col-basic;
    display: flex;
    flex-wrap: wrap;
    background: $col-bg-dark-hover;
    padding: 0 10px;
    & .add-templ__blank--name {
      width: 100%;
      height: 20px;
    }
    & .add-templ__blank--abbot {
      width: 60%;
      height: 20px;
      color: $col-basic;
      font-style: italic;
      font-size: 0.8em;
    }
    & .add-templ__blank--label {
      width: 40%;
      height: 20px;
      color: $col-bg-hover-max;
      font-style: italic;
      font-size: 0.8em;
    }
  }
}
</style>