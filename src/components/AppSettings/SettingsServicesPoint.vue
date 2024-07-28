<template>
  <the-swiper @swipe="(e) => (swipe = e)">
    <div class="settings-services__point">
      {{ service?.name }}
    </div>
  </the-swiper>
</template>
  
  <script>
import TheSwiper from "@/components/ui/TheSwiper.vue";

import { useServicesStore } from "@/stores/ServicesStore.js";

export default {
  components: { TheSwiper },
  name: "SettingsServicesPoint",
  props: ["service"],
  data() {
    return {
      swipe: null,
    };
  },
  watch: {
    swipe(newVal) {
      if (newVal == "delete") {
        useServicesStore().deleteServices(this.$props.service);
      }
      if (newVal == "edit") {
        this.$emit("getEdit", this.$props.service.id);
      }
      this.swipe = null;
    },
  },
};
</script>
  
  <style lang="scss">
.settings-services__point {
  width: 100%;
  background: $col-bg-dark-hover;
  margin-bottom: 5px;
  padding: 15px 10px;
}
</style>