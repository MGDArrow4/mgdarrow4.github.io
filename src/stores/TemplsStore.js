import { defineStore } from "pinia";
import { supabase } from "@/lib/supabaseClient";
import { useUserStore } from "@/stores/UserStore.js";

export const useTemplsStore = defineStore("TemplsStore", {
  state() {
    return {
      templs: [],
    };
  },
  actions: {
    async getTempls() {
      let templsLocalPost = getLocalParse("TemplsPostArray");
      let templsLocalDelete = getLocalParse("TemplsDeleteArray");
      if (useUserStore().status) {
        if (templsLocalPost) {
          await supabase
            .from("TEMPL")
            .insert(templsLocalPost)
            .then(() => {
              window.localStorage.removeItem("TemplsPostArray");
              useUserStore().addPush("Храмы синхронизированны", "basic", 1500);
              this.getTempls();
            });
        }
        if (templsLocalDelete) {
          await supabase
            .from("TEMPL")
            .delete()
            .in("name", templsLocalDelete)
            .then(() => {
              window.localStorage.removeItem("TemplsDeleteArray");
              useUserStore().addPush("Храмы синхронизированны", "basic", 1500);
              this.getTempls();
            });
        }
        await supabase
          .from("TEMPL")
          .select("*")
          .order("id", { ascending: true })
          .then((req) => {
            this.templs = req.data;
            setLocalStringify("TemplsBigData", req.data);
          });
      } else {
        let templsLocal = getLocalParse("TemplsBigData");
        if (templsLocalPost) {
          templsLocalPost.forEach((el) => {
            templsLocal.push(el);
          });
        }
        if (templsLocalDelete) {
          templsLocalDelete.forEach((el) => {
            let index = templsLocal.findIndex((n) => n.name === el);
            if (index !== -1) {
              templsLocal.splice(index, 1);
            }
          });
        }
        this.templs = templsLocal;
      }
    },
    async postTempls(payload) {
      if (useUserStore().status) {
        await supabase
          .from("TEMPL")
          .insert(payload)
          .then((req) => {
            if (!req.error) {
              useUserStore().addPush("Храм добавлен", "basic", 1500);
            } else {
              useUserStore().addPush("Не удалось добавить храм", "red", 3500);
            }
          });
      } else {
        if (window.localStorage.getItem("TemplsPostArray")) {
          let templsArray = getLocalParse("TemplsPostArray");
          templsArray.push(payload);
          setLocalStringify("TemplsPostArray", templsArray);
        } else {
          setLocalStringify("TemplsPostArray", [payload]);
        }
      }
      window.navigator.vibrate([100, 50, 100]);
      this.getTempls();
    },
    async putTempls(payload, id) {
      await supabase
        .from("TEMPL")
        .update(payload)
        .eq("id", id)
        .then((req) => {
          if (!req.error) {
            useUserStore().addPush("Храм изменён", "basic", 1500);
          } else {
            useUserStore().addPush("Не удалось удалить храм", "red", 3500);
          }
        });
      window.navigator.vibrate(200);
      this.getTempls();
    },
    async deleteTempls(payload) {
      if (useUserStore().status) {
        await supabase
          .from("TEMPL")
          .delete()
          .eq("id", payload.id)
          .then((req) => {
            if (!req.error) {
              useUserStore().addPush("Храм удалён", "basic", 1500);
            } else {
              useUserStore().addPush("Не удалось удалить храм", "red", 3500);
            }
          });
      } else {
        if (window.localStorage.getItem("TemplsDeleteArray")) {
          let templsArray = getLocalParse("TemplsDeleteArray");
          templsArray.push(payload.name);
          setLocalStringify("TemplsDeleteArray", templsArray);
        } else {
          setLocalStringify("TemplsDeleteArray", [payload.name]);
        }
        useUserStore().addPush("Храм удалён offline", "basic", 1500);
      }
      window.navigator.vibrate([500, 100, 50]);
      this.getTempls();
    },
  },
});
function getLocalParse(storage) {
  return JSON.parse(window.localStorage.getItem(storage));
}
function setLocalStringify(storage, data) {
  window.localStorage.setItem(storage, JSON.stringify(data));
}
