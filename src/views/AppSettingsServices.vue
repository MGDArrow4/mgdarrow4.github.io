<template>
  <div class=".app-settings__services" ref="scrollUP">
    <settings-services-add :editID="editID" @clearForm="(e) => (editID = e)" />
    <settings-services-point
      v-for="service in getServices"
      :key="service.name"
      :service="service"
      @getEdit="(e) => (editID = e)"
    />
  </div>
</template>

<script>
import SettingsServicesPoint from "@/components/AppSettings/SettingsServicesPoint.vue";
import SettingsServicesAdd from "@/components/AppSettings/SettingsServicesAdd.vue";
import { useServicesStore } from "@/stores/ServicesStore.js";

export default {
  components: { SettingsServicesPoint, SettingsServicesAdd },
  name: "AppSettingsServices",
  data() {
    return {
      editID: null,
    };
  },
  watch: {
    editID(newVal) {
      if (newVal) {
        this.$refs.scrollUP.parentElement.scrollTop = 0;
      }
    },
  },
  computed: {
    getServices() {
      return useServicesStore().services;
    },
  },
};
</script>