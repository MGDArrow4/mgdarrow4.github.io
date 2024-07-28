import { defineStore } from "pinia";
import { supabase } from "@/lib/supabaseClient";

export const useUserStore = defineStore("UserStore", {
  state() {
    return {
      user: undefined,
      status: null,
      maildates: [],
      push: [],
    };
  },
  actions: {
    getUser(payload) {
      this.user = payload;
    },
    setStatus(payload) {
      this.status = payload;
      // Изменение стилей:
      let styles = document.documentElement.style;
      if (this.status === true) {
        console.log("Приложение находится в online режиме");
        styles.setProperty("--col-bg", "#00191D");
        styles.setProperty("--col-main", "#002227");
        styles.setProperty("--col-main-h", "#00373F");
        styles.setProperty("--col-focus", "#208B9A");
        styles.setProperty("--col-basic", "#FF7A00");
      }
      if (this.status === false) {
        console.log("Приложение находится в offline режиме");
        styles.setProperty("--col-bg", "#111111");
        styles.setProperty("--col-main", "#001027");
        styles.setProperty("--col-main-h", "#00283f");
        styles.setProperty("--col-focus", "#02a9ce");
        styles.setProperty("--col-basic", "#2272FF");
      }
    },
    async getEmailDates() {
      await supabase
        .from("MAIL")
        .select("*")
        .then((req) => {
          this.maildates = req.data;
        });
    },
    async postEmailDates(payload) {
      await supabase
        .from("MAIL")
        .insert([{ date: payload }])
        .then(() => {
          this.getEmailDates();
        });
    },
    addPush(payload, color, time) {
      let id = Date.now().toLocaleString();
      let message = {
        label: payload,
        id,
        color,
        time,
      };
      this.push.unshift(message);
      setTimeout(() => {
        this.push.splice(this.push.length - 1, 1);
      }, time);
    },
  },
});
