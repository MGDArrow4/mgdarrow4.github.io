import { defineStore } from "pinia";
import { DaysWeak, MonthsShort, MonthsFull } from "@/assets/daysName";
import { useFuneralsStore } from "@/stores/FuneralsStore.js";

export const useDateStore = defineStore("DateStore", {
  state() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate() + 1,
      oldDate: undefined,
    };
  },
  getters: {
    getCorrectDate() {
      let dateNow = new Date(this.year, this.month, this.day);
      if (this.oldDate) {
        if (
          this.oldDate.getFullYear() != dateNow.getFullYear() ||
          this.oldDate.getMonth() != dateNow.getMonth()
        ) {
          useFuneralsStore().getFunerals();
        }
      }

      this.oldDate = dateNow;
      return {
        year: dateNow.getFullYear(),
        month: dateNow.getMonth(),
        day: dateNow.getDate(),
        week: dateNow.getDay(),
      };
    },
    getUnCorrectDate() {
      return { year: this.year, month: this.month, day: this.day };
    },
    getTimeCode() {
      let dateNow = new Date(this.year, this.month, this.day).getTime();
      let date = new Date();
      let dateToday = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      ).getTime();

      let dateTomorrow = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      ).getTime();

      let dateAfterTomorrow = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 2
      ).getTime();

      return {
        now: dateNow,
        today: dateToday,
        tomorrow: dateTomorrow,
        aftertomorrow: dateAfterTomorrow,
      };
    },
    getDateShort() {
      let date = this.getCorrectDate;
      return `${DaysWeak[date.week]} ${date.day} ${MonthsShort[date.month]} ${
        date.year
      }`;
    },
    getDateForSupabase() {
      let date = this.getCorrectDate;
      return `${date.year}-${addZero(date.month + 1)}-${addZero(date.day)}`;
    },
    getDateDay() {
      let codes = this.getTimeCode;
      let date = this.getCorrectDate;

      return codes.now === codes.today
        ? " СЕГОДНЯ"
        : codes.now === codes.tomorrow
        ? " ЗАВТРА"
        : codes.now === codes.aftertomorrow
        ? " ПОСЛЕЗАВТРА"
        : `: ${addZero(date.day)}/${addZero(date.month + 1)}/${date.year}`;
    },
    getDateForStatistic() {
      let date = this.getCorrectDate;
      return `${MonthsFull[date.month]} ${date.year}`;
    },
    getDateForEmail() {
      let date = this.getUnCorrectDate;
      date.month = date.month - 1;
      date.day = date.day - 2;
      let newDate = new Date(date.year, date.month, date.day);
      date = {
        year: newDate.getFullYear(),
        month: newDate.getMonth(),
        day: newDate.getDate(),
      };
      return `${MonthsFull[date.month]} ${date.year}`;
    },
    getFirstDayMonth() {
      let date = this.getCorrectDate;
      return `${date.year}-${addZero(date.month + 1)}-01`;
    },
    getLastDayMonth() {
      let date = this.getCorrectDate;
      return `${date.year}-${addZero(date.month + 1)}-31`;
    },
    getFirstDayThreeMonths() {
      let date = new Date(this.year, this.month - 1, this.day);
      return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-01`;
    },
    getLastDayThreeMonths() {
      let date = new Date(this.year, this.month + 1, this.day);
      return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-31`;
    },
  },
  actions: {
    setDateToday() {
      let toDay = new Date();
      this.year = toDay.getFullYear();
      this.month = toDay.getMonth();
      this.day = toDay.getDate();
    },
    setDateIncrement(increment) {
      this.day += increment;
    },
    setDateByCalendarCell(payload) {
      this.year = payload.year;
      this.month = payload.month;
      this.day = payload.day;
    },
  },
});

function addZero(num) {
  return num < 10 ? `0${num}` : num;
}
