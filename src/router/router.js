/* eslint-disable no-extra-boolean-cast */
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { supabase } from "@/lib/supabaseClient";

import { useUserStore } from "@/stores/UserStore.js";

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: routes,
});

router.beforeEach(async (to) => {
  // Для Settings
  if (to.name === "FuneralsSettings") {
    return { name: "SettingsTempls" };
  }
  const LSUser = JSON.parse(
    window.localStorage.getItem("sb-ulvoydkclxdhnohfdnwk-auth-token")
  );

  if (!useUserStore().user) {
    if (useUserStore().status) {
      let isAuthenticated = await supabase.auth.getUser();
      if (!!isAuthenticated.data.user) {
        useUserStore().getUser(isAuthenticated.data);
      } else {
        if (!!LSUser) {
          useUserStore().getUser({ user: LSUser.user });
        } else {
          if (to.name !== "Login") return { name: "Login" };
        }
      }
    } else {
      if (!!LSUser) {
        useUserStore().getUser({ user: LSUser.user });
      } else {
        if (to.name !== "Login") return { name: "Login" };
      }
    }
  }
  
});


