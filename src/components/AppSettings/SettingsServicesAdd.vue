<template>
  <div
    class="settings-services__add"
    :class="{ 'settings-services__add--open': isOpen }"
  >
    <div
      class="services-add__btn"
      :class="{ 'services-add__btn--open': isOpen }"
      @click="clearForm"
    >
      <font-awesome-icon :icon="['fas', 'plus']" size="xs" />
    </div>
    <div class="services-add__form">
      <the-input-text :type="'text'" :label="'Название'" v-model.trim="name" />
      <the-button
        v-if="editID"
        :text="'Изменить'"
        @click="editService()"
      ></the-button>
      <the-button v-else :text="'Добавить'" @click="addService()"></the-button>
    </div>
  </div>
</template>

<script>
import TheButton from "@/components/ui/TheButton.vue";
import TheInputText from "@/components/ui/TheInputText.vue";
import { useServicesStore } from "@/stores/ServicesStore.js";

export default {
  name: "SettingsServicesAdd",
  props: ["editID"],
  components: { TheInputText, TheButton },
  data() {
    return {
      isOpen: false,
      name: "",
    };
  },
  methods: {
    clearForm() {
      this.isOpen = !this.isOpen;
      this.name = "";
      this.$emit("clearForm", null);
    },
    addService() {
      useServicesStore()
        .postServices({
          name: this.name,
        })
        .then(this.clearForm());
    },
    editService() {
      useServicesStore()
        .putServices(
          {
            name: this.name,
          },
          this.$props.editID
        )
        .then(this.clearForm());
    },
  },
  watch: {
    editID(newVal) {
      if (newVal) {
        let services = useServicesStore().services.find(
          (el) => el.id == newVal
        );
        this.isOpen = true;
        this.name = services.name;
      }
    },
  },
};
</script>

<style lang="scss">
.settings-services__add {
  width: calc(100vw - 10px);
  height: 50px;
  border: 2px solid $col-basic;
  margin-bottom: 5px;
  padding: 0 5px;
  transition: 0.3s ease-in-out;
  overflow: hidden;
  position: relative;
  &.settings-services__add--open {
    height: 145px;
  }
}
.services-add__btn {
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 1.9em;
  transition: 0.3s ease-in-out;
  position: absolute;
  right: 50%;
  transform: translateX(50%);
  z-index: 3;
  &.services-add__btn--open {
    width: 40px;
    height: 40px;
    right: 0;
    font-size: 1.6em;
    transform: rotateZ(45deg);
    color: $col-basic;
  }
}
</style>
