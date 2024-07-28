<template>
  <div class=".app-settings__templs" ref="scrollUP">
    <settings-templs-add :editID="editID" @clearForm="(e) => (editID = e)" />
    <settings-templs-point
      v-for="templ in getTempls"
      :key="templ.name"
      :templ="templ"
      @getEdit="(e) => (editID = e)"
    />
  </div>
</template>

<script>
import SettingsTemplsAdd from "@/components/AppSettings/SettingsTemplsAdd.vue";
import SettingsTemplsPoint from "@/components/AppSettings/SettingsTemplsPoint.vue";
import { useTemplsStore } from "@/stores/TemplsStore.js";

export default {
  components: { SettingsTemplsAdd, SettingsTemplsPoint },
  name: "AppSettingsTempls",
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
    getTempls() {
      return useTemplsStore().templs;
    },
  },
};
</script>