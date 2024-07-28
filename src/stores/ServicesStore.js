import { defineStore } from "pinia";
import { supabase } from "@/lib/supabaseClient";
import { useUserStore } from "@/stores/UserStore.js";

export const useServicesStore = defineStore("ServicesStore", {
  state() {
    return {
      services: [],
    };
  },
  actions: {
    async getServices() {
      let servicesLocalPost = getLocalParse("ServicesPostArray");
      let servicesLocalDelete = getLocalParse("ServicesDeleteArray");
      if (useUserStore().status) {
        if (servicesLocalPost) {
          await supabase
            .from("SERVICE")
            .insert(servicesLocalPost)
            .then(() => {
              window.localStorage.removeItem("ServicesPostArray");
              useUserStore().addPush(
                "Ритуалки синхронизированны",
                "basic",
                1500
              );
              this.getServices();
            });
        }
        if (servicesLocalDelete) {
          await supabase
            .from("SERVICE")
            .delete()
            .in("name", servicesLocalDelete)
            .then(() => {
              window.localStorage.removeItem("ServicesDeleteArray");
              useUserStore().addPush(
                "Ритуалки синхронизированны",
                "basic",
                1500
              );
              this.getServices();
            });
        }
        await supabase
          .from("SERVICE")
          .select("*")
          .order("id", { ascending: true })
          .then((req) => {
            this.services = req.data;
            setLocalStringify("ServicesBigData", req.data);
          });
      } else {
        let servicesLocal = getLocalParse("ServicesBigData");
        if (servicesLocalPost) {
          servicesLocalPost.forEach((el) => {
            servicesLocal.push(el);
          });
        }
        if (servicesLocalDelete) {
          servicesLocalDelete.forEach((el) => {
            let index = servicesLocal.findIndex((n) => n.name === el);
            console.log(index);
            if (index !== -1) {
              servicesLocal.splice(index, 1);
            }
          });
        }
        this.services = servicesLocal;
      }
    },
    async postServices(payload) {
      if (useUserStore().status) {
        await supabase
          .from("SERVICE")
          .insert(payload)
          .then((req) => {
            if (!req.error) {
              useUserStore().addPush("Ритуалка добавлена", "basic", 1500);
            } else {
              useUserStore().addPush(
                "Не удалось добавить ритуалку",
                "red",
                3500
              );
            }
          });
      } else {
        if (window.localStorage.getItem("ServicesPostArray")) {
          let servicesArray = getLocalParse("ServicesPostArray");
          servicesArray.push(payload);
          setLocalStringify("ServicesPostArray", servicesArray);
        } else {
          setLocalStringify("ServicesPostArray", [payload]);
        }
      }
      window.navigator.vibrate([100, 50, 100]);
      this.getServices();
    },
    async putServices(payload, id) {
      await supabase
        .from("SERVICE")
        .update(payload)
        .eq("id", id)
        .then((req) => {
          if (!req.error) {
            useUserStore().addPush("Ритуалка изменена", "basic", 1500);
          } else {
            useUserStore().addPush("Не удалось изменить ритуалку", "red", 3500);
          }
        });

      window.navigator.vibrate(200);
      this.getServices();
    },
    async deleteServices(payload) {
      if (useUserStore().status) {
        await supabase
          .from("SERVICE")
          .delete()
          .eq("id", payload.id)
          .then((req) => {
            if (!req.error) {
              useUserStore().addPush("Ритуалка удалена", "basic", 1500);
            } else {
              useUserStore().addPush(
                "Не удалось удалить ритуалку",
                "red",
                3500
              );
            }
          });
      } else {
        if (window.localStorage.getItem("ServicesDeleteArray")) {
          let servicesArray = getLocalParse("ServicesDeleteArray");
          servicesArray.push(payload.name);
          setLocalStringify("ServicesDeleteArray", servicesArray);
        } else {
          setLocalStringify("ServicesDeleteArray", [payload.name]);
        }
        useUserStore().addPush("Ритуалка удалена offline", "basic", 1500);
      }
      window.navigator.vibrate([500, 100, 50]);
      this.getServices();
    },
  },
});
function getLocalParse(storage) {
  return JSON.parse(window.localStorage.getItem(storage));
}
function setLocalStringify(storage, data) {
  window.localStorage.setItem(storage, JSON.stringify(data));
}
