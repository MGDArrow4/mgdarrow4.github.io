<template>
  <div class=".app-settings__cemeterys" ref="scrollUP">
    <settings-cemeterys-add :editID="editID" @clearForm="(e) => (editID = e)" />
    <settings-cemeterys-point
      v-for="cemetery in getCemeterys"
      :key="cemetery.name"
      :cemetery="cemetery"
      @getEdit="(e) => (editID = e)"
    />
  </div>
</template>

<script>
import SettingsCemeterysPoint from "@/components/AppSettings/SettingsCemeterysPoint.vue";
import SettingsCemeterysAdd from "@/components/AppSettings/SettingsCemeterysAdd.vue";

import { useCemeterysStore } from "@/stores/CemeterysStore.js";

export default {
  components: { SettingsCemeterysAdd, SettingsCemeterysPoint },
  name: "AppSettingsCemeterys",
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
    getCemeterys() {
      return useCemeterysStore().cemeterys;
    },
  },
};
</script>
