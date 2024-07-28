<template>
  <div
    class="settings-templs__add"
    :class="{ 'settings-templs__add--open': isOpen }"
  >
    <div
      class="templs-add__btn"
      :class="{ 'templs-add__btn--open': isOpen }"
      @click="clearForm"
    >
      <font-awesome-icon :icon="['fas', 'plus']" size="xs" />
    </div>
    <div class="templs-add__form">
      <the-input-text :type="'text'" :label="'Название'" v-model.trim="name" />
      <the-input-text
        :type="'text'"
        :label="'Настоятель'"
        v-model.trim="abbot"
      />
      <the-input-text :type="'text'" :label="'Район'" v-model.trim="label" />
      <the-input-text
        :type="'number'"
        :label="'Количество отпеваний'"
        v-model.trim="minFun"
      />
      <settings-templs-deanery
        :deanery="deanery"
        @isDeanery="(e) => (this.deanery = e)"
      />
      <the-button
        v-if="editID"
        :text="'Изменить'"
        @click="editTempl()"
      ></the-button>
      <the-button v-else :text="'Добавить'" @click="addTempl()"></the-button>
    </div>
  </div>
</template>

<script>
import TheButton from "@/components/ui/TheButton.vue";
import TheInputText from "@/components/ui/TheInputText.vue";
import SettingsTemplsDeanery from "@/components/AppSettings/SettingsTemplsDeanery.vue";

import { useTemplsStore } from "@/stores/TemplsStore.js";

export default {
  name: "SettingsTemplsAdd",
  props: ["editID"],
  components: { TheInputText, TheButton, SettingsTemplsDeanery },
  data() {
    return {
      isOpen: false,
      name: "",
      deanery: "Николаевский",
      abbot: "",
      label: "",
      minFun: undefined,
    };
  },
  methods: {
    clearForm() {
      this.isOpen = !this.isOpen;
      this.name = "";
      this.deanery = "Николаевский";
      this.abbot = "";
      this.label = "";
      this.minFun = undefined;
      this.$emit("clearForm", null);
    },
    addTempl() {
      useTemplsStore()
        .postTempls({
          name: this.name,
          deanery: this.deanery,
          abbot: this.abbot,
          label: this.label,
          minFun: this.minFun,
        })
        .then(this.clearForm());
    },
    editTempl() {
      useTemplsStore()
        .putTempls(
          {
            name: this.name,
            deanery: this.deanery,
            abbot: this.abbot,
            label: this.label,
            minFun: this.minFun,
          },
          this.$props.editID
        )
        .then(this.clearForm());
    },
  },
  watch: {
    editID(newVal) {
      if (newVal) {
        let templs = useTemplsStore().templs.find((el) => el.id == newVal);
        this.isOpen = true;
        this.name = templs.name;
        this.deanery = templs.deanery;
        this.abbot = templs.abbot;
        this.label = templs.label;
        this.minFun = templs.minFun;
      }
    },
  },
};
</script>

<style lang="scss" >
.settings-templs__add {
  width: calc(100vw - 10px);
  height: 50px;
  border: 2px solid $col-basic;
  margin-bottom: 5px;
  padding: 0 5px;
  transition: 0.3s ease-in-out;
  overflow: hidden;
  position: relative;
  &.settings-templs__add--open {
    height: 450px;
  }
}
.templs-add__btn {
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 1.9em;
  transition: 0.3s ease-in-out;
  position: absolute;
  right: 50%;
  transform: translateX(50%);
  z-index: 3;
  &.templs-add__btn--open {
    width: 40px;
    height: 40px;
    right: 0;
    font-size: 1.6em;
    transform: rotateZ(45deg);
    color: $col-basic;
  }
}
</style>