import { defineStore } from "pinia";
import { supabase } from "@/lib/supabaseClient";
import { useDateStore } from "@/stores/DateStore.js";
import { useUserStore } from "@/stores/UserStore.js";

export const useFuneralsStore = defineStore("FuneralsStore", {
  state() {
    return {
      funerals: [],
    };
  },
  getters: {
    getFuneralsForRead() {
      let dateNow = useDateStore().getDateForSupabase;
      return this.funerals.filter((funeral) => funeral.date == dateNow);
    },
    getFuneralsForEdit(state) {
      return (funeralsId) =>
        state.funerals.find((funeral) => funeral.id == funeralsId);
    },
    getFuneralsForAllocation() {
      return this.getFuneralsForRead.filter(
        (funeral) => funeral.templ === "false" || funeral.templ === false
      );
    },
    getFuneralsForAllocationAll() {
      return this.funerals.filter(
        (funeral) => funeral.templ === "false" || funeral.templ === false
      );
    },
    getFuneralsForPhone() {
      return this.getFuneralsForRead.filter(
        (funeral) =>
          funeral.phoneLocation === "false" ||
          funeral.phoneLocation === false ||
          funeral.phoneTempl === false
      );
    },
    getFuneralsForPhoneAll() {
      return this.funerals.filter(
        (funeral) =>
          funeral.phoneLocation === "false" ||
          funeral.phoneLocation === false ||
          funeral.phoneTempl === false
      );
    },
    getFuneralsForStatistic() {
      return this.funerals.filter(
        (funeral) =>
          funeral.templ !== "false" &&
          funeral.date >= useDateStore().getFirstDayMonth &&
          funeral.date <= useDateStore().getLastDayMonth
      );
    },
  },
  actions: {
    async getFunerals() {
      let funeralsLocalPost = getLocalParse("FuneralsPostArray");
      let funeralsLocalPut = getLocalParse("FuneralsPutArray");
      let funeralsLocalDelete = getLocalParse("FuneralsDeleteArray");
      if (useUserStore().status) {
        let prePost = !!funeralsLocalPost;
        if (funeralsLocalPost && funeralsLocalDelete) {
          let clearDelete = [];
          funeralsLocalDelete.forEach((el) => {
            let index = funeralsLocalPost.findIndex((n) => n.id === el);
            if (index !== -1) {
              funeralsLocalPost.splice(index, 1);
              clearDelete.push(el);
            }
          });
          funeralsLocalDelete = funeralsLocalDelete.filter(
            (el) => !clearDelete.includes(el)
          );
          if (!funeralsLocalDelete[0]) {
            window.localStorage.removeItem("FuneralsDeleteArray");
            funeralsLocalDelete = false;
          }
          if (!funeralsLocalPost[0]) {
            window.localStorage.removeItem("FuneralsPostArray");
            funeralsLocalPost = false;
          }
        }
        if (!funeralsLocalPost && prePost && funeralsLocalPut) {
          window.localStorage.removeItem("FuneralsPutArray");
          funeralsLocalPut = false;
        }
        if (funeralsLocalPost && funeralsLocalPut) {
          let clearPut = [];
          funeralsLocalPut.forEach((putEl) => {
            funeralsLocalPost.forEach((localEl) => {
              if (+putEl.id === +localEl.id) {
                clearPut.push(putEl);
                let arrayPutKeys = Object.keys(putEl.put);
                arrayPutKeys.forEach((putKey) => {
                  localEl[putKey] = putEl.put[putKey];
                });
              }
            });
          });
          funeralsLocalPut = funeralsLocalPut.filter(
            (el) => !clearPut.includes(el)
          );
          if (!funeralsLocalPut[0]) {
            window.localStorage.removeItem("FuneralsPutArray");
            funeralsLocalPut = false;
          }
        }
        if (funeralsLocalPost) {
          funeralsLocalPost.forEach((el) => {
            delete el.id;
          });
        }

        let isPost = !!funeralsLocalPost;
        let isDelete = !!funeralsLocalDelete;
        let isPut = !!funeralsLocalPut;
        let allPost = false;
        let allDelete = false;
        let allPut = false;

        if (funeralsLocalPost) {
          await supabase
            .from("FUNERAL")
            .insert(funeralsLocalPost)
            .then(() => {
              window.localStorage.removeItem("FuneralsPostArray");
              allPost = true;
              if (
                isAsyncAll(isPost, isDelete, isPut, allPost, allDelete, allPut)
              ) {
                this.getFunerals();
              }
            });
        }
        if (funeralsLocalDelete) {
          await supabase
            .from("FUNERAL")
            .delete()
            .in("id", funeralsLocalDelete)
            .then(() => {
              window.localStorage.removeItem("FuneralsDeleteArray");
              allDelete = true;
              if (
                isAsyncAll(isPost, isDelete, isPut, allPost, allDelete, allPut)
              ) {
                this.getFunerals();
              }
            });
        }
        if (funeralsLocalPut) {
          funeralsLocalPut.forEach(async (el, i) => {
            await supabase
              .from("FUNERAL")
              .update(el.put)
              .eq("id", el.id)
              .then(() => {
                if (funeralsLocalPut.length - 1 == i) {
                  window.localStorage.removeItem("FuneralsPutArray");
                  allPut = true;
                  if (
                    isAsyncAll(
                      isPost,
                      isDelete,
                      isPut,
                      allPost,
                      allDelete,
                      allPut
                    )
                  ) {
                    this.getFunerals();
                  }
                }
              });
          });
        }

        await supabase
          .from("FUNERAL")
          .select("*")
          .gte("date", useDateStore().getFirstDayThreeMonths)
          .lte("date", useDateStore().getLastDayThreeMonths)
          .order("locationTempl", { ascending: true })
          .order("locationCemetery", { ascending: true })
          .order("locationAddress", { ascending: true })
          .order("time", { ascending: true })
          .then((req) => {
            this.funerals = req.data;
            setLocalStringify("FuneralsBigData", req.data);
          });
      } else {
        let funeralsLocal = getLocalParse("FuneralsBigData");
        if (funeralsLocalPost) {
          funeralsLocalPost.forEach((el) => {
            funeralsLocal.push(el);
          });
        }
        if (funeralsLocalDelete) {
          funeralsLocalDelete.forEach((el) => {
            let index = funeralsLocal.findIndex((n) => n.id === el);
            if (index !== -1) {
              funeralsLocal.splice(index, 1);
            }
          });
        }
        if (funeralsLocalPut) {
          funeralsLocalPut.forEach((putEl) => {
            funeralsLocal.forEach((localEl) => {
              if (+putEl.id === +localEl.id) {
                let arrayPutKeys = Object.keys(putEl.put);
                arrayPutKeys.forEach((putKey) => {
                  localEl[putKey] = putEl.put[putKey];
                });
              }
            });
          });
        }

        this.funerals = funeralsLocal;
      }
    },
    async postFunerals(payload) {
      if (useUserStore().status) {
        await supabase
          .from("FUNERAL")
          .insert(payload)
          .then((req) => {
            if (!req.error) {
              useUserStore().addPush("Отпевание добавлено", "basic", 1500);
            } else {
              useUserStore().addPush(
                "Не удалось добавить отпевание",
                "red",
                3500
              );
            }
          });
      } else {
        payload.id = new Date().getTime();
        if (window.localStorage.getItem("FuneralsPostArray")) {
          let funeralsArray = getLocalParse("FuneralsPostArray");
          funeralsArray.push(payload);
          setLocalStringify("FuneralsPostArray", funeralsArray);
        } else {
          setLocalStringify("FuneralsPostArray", [payload]);
        }
        useUserStore().addPush("Отпевание добавлено offline", "basic", 1500);
      }
      window.navigator.vibrate([100, 50, 100]);
      this.getFunerals();
    },
    async putFunerals(payload, id) {
      if (useUserStore().status) {
        await supabase
          .from("FUNERAL")
          .update(payload)
          .eq("id", id)
          .then((req) => {
            if (!req.error) {
              useUserStore().addPush("Отпевание изменено", "basic", 1500);
            } else {
              useUserStore().addPush(
                "Не удалось изменить отпевание",
                "red",
                3500
              );
            }
          });
      } else {
        if (window.localStorage.getItem("FuneralsPutArray")) {
          let funeralsArray = getLocalParse("FuneralsPutArray");
          funeralsArray.push({ id, put: payload });
          setLocalStringify("FuneralsPutArray", funeralsArray);
        } else {
          setLocalStringify("FuneralsPutArray", [{ id, put: payload }]);
        }
        useUserStore().addPush("Отпевание изменено offline", "basic", 1500);
      }
      window.navigator.vibrate(200);
      this.getFunerals();
    },
    async deleteFunerals(payload) {
      if (useUserStore().status) {
        await supabase
          .from("FUNERAL")
          .delete()
          .eq("id", payload)
          .then((req) => {
            if (!req.error) {
              useUserStore().addPush("Отпевание удалено", "basic", 1500);
            } else {
              useUserStore().addPush(
                "Не удалось удалить отпевание",
                "red",
                3500
              );
            }
          });
      } else {
        if (window.localStorage.getItem("FuneralsDeleteArray")) {
          let funeralsArray = getLocalParse("FuneralsDeleteArray");
          funeralsArray.push(payload);
          setLocalStringify("FuneralsDeleteArray", funeralsArray);
        } else {
          setLocalStringify("FuneralsDeleteArray", [payload]);
        }
        useUserStore().addPush("Отпевание удалено offline", "basic", 1500);
      }
      window.navigator.vibrate([500, 100, 50]);
      this.getFunerals();
    },
  },
});

function getLocalParse(storage) {
  return JSON.parse(window.localStorage.getItem(storage));
}
function setLocalStringify(storage, data) {
  window.localStorage.setItem(storage, JSON.stringify(data));
}
// Это капец какой кастыль, но хз как организовать req всех awaitoВ и только потом перезагрузить данные
function isAsyncAll(isPost, isDelete, isPut, allPost, allDelete, allPut) {
  let readyUpdate = 0;
  readyUpdate = isPost ? readyUpdate + 1 : readyUpdate + 2;
  readyUpdate = allPost ? readyUpdate + 1 : readyUpdate;

  readyUpdate = isDelete ? readyUpdate + 1 : readyUpdate + 2;
  readyUpdate = allDelete ? readyUpdate + 1 : readyUpdate;

  readyUpdate = isPut ? readyUpdate + 1 : readyUpdate + 2;
  readyUpdate = allPut ? readyUpdate + 1 : readyUpdate;

  if (readyUpdate == 6) {
    useUserStore().addPush("Отпевания синхронизированны", "basic", 1500);
    return true;
  }
  return false;
}
