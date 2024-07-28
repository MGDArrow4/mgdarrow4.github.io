<template>
  <div class="get-date">
    <div class="get-date__menu-date">
      <!-- Текущая дата -->
      <div
        class="menu-date__text"
        :class="{ 'js-menu-date__text--active': isShothToday }"
        @click="setDateToday()"
      >
        {{ getDate }}
      </div>
      <!-- День назад -->
      <div class="menu-date__back--btn" @click="setDateIncr(-1)">
        <font-awesome-icon :icon="['fas', 'caret-left']" />
      </div>
      <!-- День вперёд -->
      <div class="menu-date__next--btn" @click="setDateIncr(1)">
        <font-awesome-icon :icon="['fas', 'caret-left']" rotation="180" />
      </div>
      <!-- Отркрытие календаря -->
      <div
        class="menu-date__calendar--btn"
        :class="{ 'js-calendar--btn--act': openCalendar }"
        @click="openCalendar = !openCalendar"
      >
        <font-awesome-icon :icon="['fas', 'calendar-days']" />
      </div>
    </div>
    <div
      class="get-date__calendar"
      :class="{ 'js-calendar--open': openCalendar }"
    >
      <div class="calendar__menu">
        <div class="menu__back--btn" @click="--dateCalendarObj.month">
          <font-awesome-icon :icon="['fas', 'caret-left']" />
        </div>
        <div
          class="menu__text"
          :class="{ 'js-menu__text--active': isMonthNow }"
          @click="getMonthNow()"
        >
          {{ getShortMonth }}
        </div>
        <div class="menu__next--btn" @click="++dateCalendarObj.month">
          <font-awesome-icon :icon="['fas', 'caret-left']" rotation="180" />
        </div>
      </div>
      <div class="calendar__weakdays">
        <div class="weekdays__day" v-for="(daysW, i) in daysWeak" :key="i">
          {{ daysW }}
        </div>
      </div>
      <div class="calendar__days">
        <div
          class="day"
          :class="{
            'another-month':
              el.isMonthStyle == 'backMonth' || el.isMonthStyle == 'nextMonth',
            'today-cell': isCellToday(el),
            'active-cell': isCellActive(el.day) && el.isMonthStyle == 'isMonth',
          }"
          v-for="el in getDateCells"
          :key="el.id"
          @click="clickSetCell(el)"
        >
          {{ el.day }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DaysWeakRus, MonthsFull } from "@/assets/daysName";
import { useDateStore } from "@/stores/DateStore.js";

export default {
  name: "AppDate",
  data() {
    return {
      openCalendar: false,
      daysWeak: DaysWeakRus,
      monthsFull: MonthsFull,
      dateCalendarObj: undefined,
      calendarToday: undefined,
    };
  },
  computed: {
    getDate() {
      return useDateStore().getDateShort;
    },
    isShothToday() {
      let stateToday = useDateStore().getUnCorrectDate;
      return (
        new Date(stateToday.year, stateToday.month, stateToday.day).getTime() ==
        new Date(
          this.calendarToday.year,
          this.calendarToday.month,
          this.calendarToday.day
        ).getTime()
      );
    },
    isMonthNow() {
      return (
        this.dateCalendarObj.year === this.calendarToday.year &&
        this.dateCalendarObj.month === this.calendarToday.month
      );
    },
    getShortMonth() {
      let dateNow = new Date(
          this.dateCalendarObj.year,
          this.dateCalendarObj.month
        ),
        yearNow = dateNow.getFullYear(),
        monthNow = dateNow.getMonth();
      return `${this.monthsFull[monthNow]} ${yearNow}`;
    },
    getDateCells() {
      let dateNow = this.dateCalendarObj,
        dayInMonth =
          (new Date(dateNow.year, dateNow.month + 1, 1) -
            new Date(dateNow.year, dateNow.month, 1)) /
          86400000,
        dayInLastMonth =
          (new Date(dateNow.year, dateNow.month, 1) -
            new Date(dateNow.year, dateNow.month - 1, 1)) /
          86400000,
        weekDayFirst = new Date(dateNow.year, dateNow.month, 1).getDay();
      weekDayFirst = weekDayFirst === 0 ? 6 : --weekDayFirst;

      let cells = [];
      // Добавляем прошлый месяц
      for (let i = weekDayFirst; i > 0; i--) {
        cells.push({ day: dayInLastMonth - i + 1, isMonthStyle: "backMonth" });
      }
      // Добавляем текущий месяц
      for (let i = 1; i <= dayInMonth; i++) {
        cells.push({ day: i, isMonthStyle: "isMonth" });
      }
      // Добавляем следующий месяц
      for (let i = 1; i <= 42 - dayInMonth - weekDayFirst; i++) {
        cells.push({ day: i, isMonthStyle: "nextMonth" });
      }

      return cells;
    },
  },
  methods: {
    setDateIncr(incr) {
      useDateStore().setDateIncrement(incr);
      this.getMonthUpd();
    },
    setDateToday() {
      useDateStore().setDateToday();
      this.getMonthUpd();
    },
    getMonthNow() {
      this.dateCalendarObj.year = this.calendarToday.year;
      this.dateCalendarObj.month = this.calendarToday.month;
    },
    getMonthUpd() {
      let stateToday = useDateStore().getUnCorrectDate;

      this.dateCalendarObj.year = new Date(
        stateToday.year,
        stateToday.month,
        stateToday.day
      ).getFullYear();
      this.dateCalendarObj.month = new Date(
        stateToday.year,
        stateToday.month,
        stateToday.day
      ).getMonth();
    },
    isCellActive(day) {
      let stateToday = useDateStore().getUnCorrectDate;
      return (
        new Date(stateToday.year, stateToday.month, stateToday.day).getTime() ==
        new Date(
          this.dateCalendarObj.year,
          this.dateCalendarObj.month,
          day
        ).getTime()
      );
    },
    isCellToday(el) {
      // !TODO решить проблему с перелистыванием годов.
      return (
        (el.day == this.calendarToday.day &&
          this.dateCalendarObj.month == this.calendarToday.month &&
          this.dateCalendarObj.year == this.calendarToday.year &&
          el.isMonthStyle == "isMonth") ||
        (el.day == this.calendarToday.day &&
          this.dateCalendarObj.month - 1 == this.calendarToday.month &&
          this.dateCalendarObj.year == this.calendarToday.year &&
          el.isMonthStyle == "backMonth") ||
        (el.day == this.calendarToday.day &&
          this.dateCalendarObj.month + 1 == this.calendarToday.month &&
          this.dateCalendarObj.year == this.calendarToday.year &&
          el.isMonthStyle == "nextMonth")
      );
    },
    clickSetCell(el) {
      if (el.isMonthStyle == "backMonth") {
        this.dateCalendarObj.month =
          this.dateCalendarObj.month != 0 ? --this.dateCalendarObj.month : 11;

        this.dateCalendarObj.year =
          this.dateCalendarObj.month == 11
            ? --this.dateCalendarObj.year
            : this.dateCalendarObj.year;
      }
      if (el.isMonthStyle == "nextMonth") {
        this.dateCalendarObj.month =
          this.dateCalendarObj.month != 11 ? ++this.dateCalendarObj.month : 0;

        this.dateCalendarObj.year =
          this.dateCalendarObj.month == 0
            ? ++this.dateCalendarObj.year
            : this.dateCalendarObj.year;
      }

      let payload = {
        year: this.dateCalendarObj.year,
        month: this.dateCalendarObj.month,
        day: el.day,
      };
      useDateStore().setDateByCalendarCell(payload);
      this.openCalendar = false;
    },
  },
  created() {
    let toDay = new Date(),
      yearToday = toDay.getFullYear(),
      monthToday = toDay.getMonth(),
      dayToday = toDay.getDate();
    this.dateCalendarObj = { year: yearToday, month: monthToday };
    this.calendarToday = { year: yearToday, month: monthToday, day: dayToday };
  },
};
</script>

<style lang="scss" scoped>
.get-date__menu-date {
  width: calc(100% - 10px);
  height: calc(8dvh - 10px);
  margin: 5px;
  display: flex;
  flex-wrap: wrap;
  font-size: 1.7em;
  font-weight: 500;
  line-height: calc(8dvh - 15px);
  text-align: center;
  & div {
    margin-right: 5px;
    background: $col-bg-hover;
    width: calc(8dvh - 10px);
  }
  & .menu-date__text {
    width: calc(100% - 24dvh + 15px);
    &.js-menu-date__text--active {
      color: $col-basic;
    }
  }
  & .menu-date__calendar--btn {
    transition: 0.3s ease-in-out;
    margin: 0;
    &.js-calendar--btn--act {
      color: $col-basic;
    }
  }
}
.get-date__calendar {
  width: calc(100% - 10px);
  height: 0px;
  margin: 0 5px;
  position: absolute;
  top: calc(8dvh);
  background: $col-bg-hover;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
  z-index: 9990;
  &.js-calendar--open {
    height: calc((100vw - 10px) / 7 * 8 + 10px);
    border-bottom: 10px solid $col-bg-hover-max;
  }
  & .calendar__menu {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    height: calc((100vw - 10px) / 7);
    line-height: calc((100vw - 10px) / 7 - 5px);
    text-align: center;
    font-size: 1.6em;
    font-weight: 400;
    border-bottom: 5px solid $col-bg-dark;
    & div {
      width: calc(100% / 7);
    }
    & .menu__text {
      width: calc(100% / 7 * 5);
      border-left: 5px solid $col-bg-dark;
      border-right: 5px solid $col-bg-dark;
      &.js-menu__text--active {
        color: $col-basic;
      }
    }
  }
  & .calendar__weakdays {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    height: calc((100vw - 10px) / 7);
    line-height: calc((100vw - 10px) / 7 - 5px);
    text-align: center;
    font-size: 1.6em;
    font-weight: 300;
    border-bottom: 5px solid $col-bg-dark;
    & div {
      width: calc(100% / 7);
      &:last-child {
        color: $col-basic;
      }
    }
  }
  & .calendar__days {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    height: calc((100vw - 10px) / 7);
    line-height: calc((100vw - 10px) / 7 - 5px);
    text-align: center;
    font-size: 1.5em;
    font-weight: 300;
    & div {
      width: calc(100% / 7);
      height: calc((100vw - 10px) / 7);

      &:nth-child(7n) {
        color: $col-basic;
      }
      &.another-month {
        opacity: 0.4;
      }
      &.today-cell {
        background: $col-basic;
      }
      &.active-cell {
        border: 2px solid $col-basic;
      }
    }
  }
}
</style>