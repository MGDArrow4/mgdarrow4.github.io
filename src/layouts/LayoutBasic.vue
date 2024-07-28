<template>
  <div>
    <app-push />
    <div class="get-update" v-if="getOnline && this.status">
      <div class="get-update__back"></div>
      <div class="get-update__block">
        <span>
          Подключение к интернету возобновлено!
          <br />
          Необходимо синхронизировать данные!
        </span>
        <the-button
          :text="'Обновить'"
          @click="
            getOnline = false;
            updateData();
          "
        />
      </div>
    </div>
    <div class="appBlockDate">
      <app-date></app-date>
    </div>
    <div class="appBlockMain">
      <router-view v-slot="{ Component }">
        <transition name="slide">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <div class="appBlockNav">
      <app-nav-bar></app-nav-bar>
    </div>
  </div>
</template>

<script>
import AppNavBar from "@/components/AppNavBar.vue";
import AppDate from "@/components/AppDate.vue";
import TheButton from "@/components/ui/TheButton.vue";
import AppPush from "@/components/AppPush.vue";
import { useCemeterysStore } from "@/stores/CemeterysStore.js";
import { useServicesStore } from "@/stores/ServicesStore.js";
import { useTemplsStore } from "@/stores/TemplsStore.js";
import { useFuneralsStore } from "@/stores/FuneralsStore.js";
import { useUserStore } from "@/stores/UserStore.js";
import { useDateStore } from "@/stores/DateStore.js";
import { mapState } from "pinia";

export default {
  components: { AppNavBar, AppDate, TheButton, AppPush },
  name: "LayoutBasic",
  data() {
    return {
      getOnline: false,
    };
  },
  computed: {
    ...mapState(useUserStore, ["status", "maildates"]),
  },
  methods: {
    async updateData() {
      await useCemeterysStore().getCemeterys();
      await useServicesStore().getServices();
      await useFuneralsStore().getFunerals();
      await useTemplsStore().getTempls();
    },
  },
  async mounted() {
    this.updateData();
    // window.addEventListener("online", () => (this.getOnline = true));

    navigator.connection.addEventListener("change", (c) => {
      c.target.effectiveType === "4g" &&
        navigator.onLine &&
        (this.getOnline = true);
    });

    // Проверка на ежимесячный отчет
    let dateForEmail = useDateStore().getDateForEmail;
    if (this.status) {
      await useUserStore().getEmailDates();

      if (!this.maildates.find((el) => el.date === dateForEmail)) {
        useUserStore().addPush("Отправка ежемесячного отчета", "basic", 1500);
        await useUserStore().postEmailDates(dateForEmail);

        useDateStore().setDateByCalendarCell({
          year: useDateStore().getCorrectDate.year,
          month: useDateStore().getCorrectDate.month - 1,
          day: useDateStore().getCorrectDate.day,
        });
        await this.updateData();
        // console.log("Отправка на почту");
        this.$router.push("/mail");
      }
    }
  },
};
</script>

<style lang="scss">
.get-update__back {
  position: absolute;
  z-index: 99998;
  width: 100vw;
  height: 100dvh;
  background: $col-bg-dark;
  opacity: 0.6;
}
.get-update__block {
  position: absolute;
  z-index: 99999;
  width: 90vw;
  height: max-content;
  padding: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: $col-bg-hover;
  text-align: center;
  font-size: 1.2em;
}

.appBlockDate {
  width: 100%;
  height: calc(8dvh - 10px);
}
.appBlockMain {
  width: calc(100% - 10px);
  height: calc(100dvh - (8dvh - 10px) * 2 - 20px);
  margin: 5px;
  overflow: hidden;
  position: relative;
}
.appBlockNav {
  width: 100%;
  height: calc(8dvh - 10px);
}
</style>