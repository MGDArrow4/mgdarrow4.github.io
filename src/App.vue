<template>
  <router-view v-slot="{ Component }">
    <transition name="slider">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import { useUserStore } from "@/stores/UserStore.js";
import { mapState } from "pinia";

export default {
  name: "App",
  computed: {
    ...mapState(useUserStore, ["status"]),
  },
  mounted() {
    // window.addEventListener("online", () => useUserStore().setStatus(true));
    // window.addEventListener("offline", () => {
    //   useUserStore().setStatus(false);
    //   useUserStore().addPush("Приложение перешло в offline", "basic", 1500);
    // });
    // window.addEventListener("load", () => {
    //   if (navigator.onLine) {
    //     useUserStore().setStatus(true);
    //   } else {
    //     useUserStore().setStatus(false);
    //   }
    // });
    if (navigator.connection.effectiveType === "4g" && navigator.onLine) {
      useUserStore().setStatus(true);
    } else {
      useUserStore().setStatus(false);
      if (navigator.onLine) {
        useUserStore().addPush(
          `Приложение перешло в offline (${navigator.connection.effectiveType})`,
          "basic",
          1500
        );
      } else {
        useUserStore().addPush("Приложение перешло в offline", "basic", 1500);
      }
    }

    navigator.connection.addEventListener("change", (c) => {
      if (c.target.effectiveType === "4g" && navigator.onLine) {
        useUserStore().addPush("Приложение перешло в online", "basic", 1500);
        useUserStore().setStatus(true);
      } else {
        useUserStore().setStatus(false);
        if (navigator.onLine) {
          useUserStore().addPush(
            `Приложение перешло в offline (${c.target.effectiveType})`,
            "basic",
            1500
          );
        } else {
          useUserStore().addPush("Приложение перешло в offline", "basic", 1500);
        }
      }
    });
  },
};
</script>
