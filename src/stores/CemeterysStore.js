import { defineStore } from "pinia";
import { supabase } from "@/lib/supabaseClient";
import { useUserStore } from "@/stores/UserStore.js";

export const useCemeterysStore = defineStore("CemeterysStore", {
  state() {
    return {
      cemeterys: [],
    };
  },
  actions: {
    async getCemeterys() {
      let cemeterysLocalPost = getLocalParse("CemeterysPostArray");
      let cemeterysLocalDelete = getLocalParse("CemeterysDeleteArray");
      if (useUserStore().status) {
        if (cemeterysLocalPost) {
          await supabase
            .from("CEMETERY")
            .insert(cemeterysLocalPost)
            .then(() => {
              window.localStorage.removeItem("CemeterysPostArray");
              useUserStore().addPush(
                "Кладбища синхронизированны",
                "basic",
                1500
              );
              this.getCemeterys();
            });
        }
        if (cemeterysLocalDelete) {
          await supabase
            .from("CEMETERY")
            .delete()
            .in("name", cemeterysLocalDelete)
            .then(() => {
              window.localStorage.removeItem("CemeterysDeleteArray");
              useUserStore().addPush(
                "Кладбища синхронизированны",
                "basic",
                1500
              );
              this.getCemeterys();
            });
        }

        await supabase
          .from("CEMETERY")
          .select("*")
          .order("id", { ascending: true })
          .then((req) => {
            this.cemeterys = req.data;
            setLocalStringify("CemeterysBigData", req.data);
          });
      } else {
        let cemeterysLocal = getLocalParse("CemeterysBigData");

        if (cemeterysLocalPost) {
          cemeterysLocalPost.forEach((el) => {
            cemeterysLocal.push(el);
          });
        }
        if (cemeterysLocalDelete) {
          cemeterysLocalDelete.forEach((el) => {
            let index = cemeterysLocal.findIndex((n) => n.name === el);
            if (index !== -1) {
              cemeterysLocal.splice(index, 1);
            }
          });
        }

        this.cemeterys = cemeterysLocal;
      }
    },
    async postCemeterys(payload) {
      if (useUserStore().status) {
        await supabase
          .from("CEMETERY")
          .insert(payload)
          .then((req) => {
            if (!req.error) {
              useUserStore().addPush("Кладбище добавлено", "basic", 1500);
            } else {
              useUserStore().addPush(
                "Не удалось добавить кладбище",
                "red",
                3500
              );
            }
          });
      } else {
        if (window.localStorage.getItem("CemeterysPostArray")) {
          let cemeterysArray = getLocalParse("CemeterysPostArray");
          cemeterysArray.push(payload);
          setLocalStringify("CemeterysPostArray", cemeterysArray);
        } else {
          setLocalStringify("CemeterysPostArray", [payload]);
        }
      }
      window.navigator.vibrate([100, 50, 100]);
      this.getCemeterys();
    },
    async putCemeterys(payload, id) {
      await supabase
        .from("CEMETERY")
        .update(payload)
        .eq("id", id)
        .then((req) => {
          if (!req.error) {
            useUserStore().addPush("Кладбище изменено", "basic", 1500);
          } else {
            useUserStore().addPush("Не удалось изменить кладбище", "red", 3500);
          }
        });
      this.getCemeterys();
      window.navigator.vibrate(200);
    },
    async deleteCemeterys(payload) {
      if (useUserStore().status) {
        await supabase
          .from("CEMETERY")
          .delete()
          .eq("id", payload.id)
          .then((req) => {
            if (!req.error) {
              useUserStore().addPush("Кладбище удалено", "basic", 1500);
            } else {
              useUserStore().addPush(
                "Не удалось удалить кладбище",
                "red",
                3500
              );
            }
          });
      } else {
        if (window.localStorage.getItem("CemeterysDeleteArray")) {
          let cemeterysArray = getLocalParse("CemeterysDeleteArray");
          cemeterysArray.push(payload.name);
          setLocalStringify("CemeterysDeleteArray", cemeterysArray);
        } else {
          setLocalStringify("CemeterysDeleteArray", [payload.name]);
        }
        useUserStore().addPush("Кладбище удалено offline", "basic", 1500);
      }
      window.navigator.vibrate([500, 100, 50]);
      this.getCemeterys();
    },
  },
});

function getLocalParse(storage) {
  return JSON.parse(window.localStorage.getItem(storage));
}
function setLocalStringify(storage, data) {
  window.localStorage.setItem(storage, JSON.stringify(data));
}
