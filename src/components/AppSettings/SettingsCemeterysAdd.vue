<template>
  <div
    class="settings-cemeterys__add"
    :class="{ 'settings-cemeterys__add--open': isOpen }"
  >
    <div
      class="cemeterys-add__btn"
      :class="{ 'cemeterys-add__btn--open': isOpen }"
      @click="clearForm"
    >
      <font-awesome-icon :icon="['fas', 'plus']" size="xs" />
    </div>
    <div class="cemeterys-add__form">
      <the-input-text :type="'text'" :label="'Название'" v-model.trim="name" />
      <the-input-text :type="'text'" :label="'Район'" v-model.trim="label" />
      <the-button
        v-if="editID"
        :text="'Изменить'"
        @click="editCemetery()"
      ></the-button>
      <the-button v-else :text="'Добавить'" @click="addCemetery()"></the-button>
    </div>
  </div>
</template>
  
  <script>
import TheButton from "@/components/ui/TheButton.vue";
import TheInputText from "@/components/ui/TheInputText.vue";

import { useCemeterysStore } from "@/stores/CemeterysStore.js";

export default {
  name: "SettingsCemeterysAdd",
  props: ["editID"],
  components: { TheInputText, TheButton },
  data() {
    return {
      isOpen: false,
      name: "",
      label: "",
    };
  },
  methods: {
    clearForm() {
      this.isOpen = !this.isOpen;
      this.name = "";
      this.label = "";
      this.$emit("clearForm", null);
    },
    addCemetery() {
      useCemeterysStore()
        .postCemeterys({
          name: this.name,
          label: this.label,
        })
        .then(this.clearForm());
    },
    editCemetery() {
      useCemeterysStore()
        .putCemeterys(
          {
            name: this.name,
            label: this.label,
          },
          this.$props.editID
        )
        .then(this.clearForm());
    },
  },
  watch: {
    editID(newVal) {
      if (newVal) {
        let cemeterys = useCemeterysStore().cemeterys.find(
          (el) => el.id == newVal
        );
        this.isOpen = true;
        this.name = cemeterys.name;
        this.label = cemeterys.label;
      }
    },
  },
};
</script>
  
  <style lang="scss" >
.settings-cemeterys__add {
  width: calc(100vw - 10px);
  height: 50px;
  border: 2px solid $col-basic;
  margin-bottom: 5px;
  padding: 0 5px;
  transition: 0.3s ease-in-out;
  overflow: hidden;
  position: relative;
  &.settings-cemeterys__add--open {
    height: 230px;
  }
}
.cemeterys-add__btn {
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 1.9em;
  transition: 0.3s ease-in-out;
  position: absolute;
  right: 50%;
  transform: translateX(50%);
  z-index: 3;
  &.cemeterys-add__btn--open {
    width: 40px;
    height: 40px;
    right: 0;
    font-size: 1.6em;
    transform: rotateZ(45deg);
    color: $col-basic;
  }
}
</style>