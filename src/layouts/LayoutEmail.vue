<template>
  <div class="email-export" ref="email" style="font-size: 14px">
    <h1 style="width: 100%; margin: 5px auto; font-size: 1.8em">
      Отчет за {{ this.getDateForStatistic }}
    </h1>
    <table
      style="
        width: 100%;
        margin: 5px auto;
        border: 2px solid black;
        border-collapse: collapse;
      "
    >
      <caption
        style="
          background: #c5e0b3;
          font-size: 1.5em;
          font-weight: bold;
          text-align: center;
        "
      >
        Николаевский округ
      </caption>

      <tr style="font-size: 1.2em; border-bottom: 1px solid black">
        <th style="width: 70%">Храм</th>
        <th style="width: 30%">Всего</th>
      </tr>
      <tr
        style="
          font-size: 1.1em;
          font-weight: 300;
          border-bottom: 1px solid black;
        "
        v-for="(templ, i) in getTemplsDeaneryNic"
        :key="templ.id"
      >
        <td :style="{ background: getOdd(i) }">{{ templ.name }}</td>
        <td
          style="
            background: #fef2cb;
            text-align: center;
            border-left: 1px solid black;
          "
        >
          {{ getFuneralsTempl(templ.name) }}
        </td>
      </tr>
    </table>
    <table
      style="
        width: 100%;
        margin: 5px auto;
        border: 2px solid black;
        border-collapse: collapse;
      "
    >
      <caption
        style="
          background: #c5e0b3;
          font-size: 1.5em;
          font-weight: bold;
          text-align: center;
        "
      >
        Богоявленский округ
      </caption>

      <tr style="font-size: 1.2em; border-bottom: 1px solid black">
        <th style="width: 70%">Храм</th>
        <th style="width: 30%">Всего</th>
      </tr>
      <tr
        style="
          font-size: 1.1em;
          font-weight: 300;
          border-bottom: 1px solid black;
        "
        v-for="(templ, i) in getTemplsDeaneryTheo"
        :key="templ.id"
      >
        <td :style="{ background: getOdd(i) }">{{ templ.name }}</td>
        <td
          style="
            background: #fef2cb;
            text-align: center;
            border-left: 1px solid black;
          "
        >
          {{ getFuneralsTempl(templ.name) }}
        </td>
      </tr>
    </table>
    <table
      style="
        width: 100%;
        margin: 5px auto;
        border: 2px solid black;
        border-collapse: collapse;
      "
    >
      <caption
        style="
          background: #c5e0b3;
          font-size: 1.5em;
          font-weight: bold;
          text-align: center;
        "
      >
        Ритуальные услуги
      </caption>

      <tr style="font-size: 1.2em; border-bottom: 1px solid black">
        <th style="width: 70%">Ритуальная</th>
        <th style="width: 30%">Всего</th>
      </tr>
      <tr
        style="
          font-size: 1.1em;
          font-weight: 300;
          border-bottom: 1px solid black;
        "
        v-for="(service, i) in this.services"
        :key="service.id"
      >
        <td :style="{ background: getOdd(i) }">{{ service.name }}</td>
        <td
          style="
            background: #fef2cb;
            text-align: center;
            border-left: 1px solid black;
          "
        >
          {{ getServicesAll(service.name) }}
        </td>
      </tr>
    </table>
    <table
      style="
        width: 100%;
        margin: 5px auto;
        border: 2px solid black;
        border-collapse: collapse;
      "
    >
      <caption
        style="
          background: #c5e0b3;
          font-size: 1.5em;
          font-weight: bold;
          text-align: center;
        "
      >
        Местоположение
      </caption>
      <tr
        style="
          font-size: 1.1em;
          font-weight: 300;
          border-bottom: 1px solid black;
        "
      >
        <td style="background: #e3e3e3; width: 70%">В храмах</td>
        <td
          style="
            background: #fef2cb;
            text-align: center;
            border-left: 1px solid black;
          "
        >
          {{ getLocationTempls }}
        </td>
      </tr>
      <tr
        style="
          font-size: 1.1em;
          font-weight: 300;
          border-bottom: 1px solid black;
        "
      >
        <td style="background: white; width: 70%">На ГБ №2</td>
        <td
          style="
            background: #fef2cb;
            text-align: center;
            border-left: 1px solid black;
          "
        >
          {{ getLocation2b }}
        </td>
      </tr>
      <tr
        style="
          font-size: 1.1em;
          font-weight: 300;
          border-bottom: 1px solid black;
        "
      >
        <td style="background: #e3e3e3; width: 70%">На кладбищах</td>
        <td
          style="
            background: #fef2cb;
            text-align: center;
            border-left: 1px solid black;
          "
        >
          {{ getLocationCemeterys }}
        </td>
      </tr>
      <tr
        style="
          font-size: 1.1em;
          font-weight: 300;
          border-bottom: 1px solid black;
        "
      >
        <td style="background: white; width: 70%">По адресам</td>
        <td
          style="
            background: #fef2cb;
            text-align: center;
            border-left: 1px solid black;
          "
        >
          {{ getLocationAddress }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { useDateStore } from "@/stores/DateStore";
import { useTemplsStore } from "@/stores/TemplsStore";
import { useFuneralsStore } from "@/stores/FuneralsStore";
import { useServicesStore } from "@/stores/ServicesStore";
import { useUserStore } from "@/stores/UserStore";
import { mapState } from "pinia";
import emailjs from "@emailjs/browser";

export default {
  name: "LayoutEmail",
  computed: {
    ...mapState(useDateStore, ["getDateForStatistic"]),
    ...mapState(useTemplsStore, ["templs"]),
    ...mapState(useFuneralsStore, ["getFuneralsForStatistic"]),
    ...mapState(useServicesStore, ["services"]),
    getTemplsDeaneryNic() {
      let allTempls = this.templs;
      return allTempls.filter((el) => el.deanery == "Николаевский");
    },
    getTemplsDeaneryTheo() {
      let allTempls = this.templs;
      return allTempls.filter((el) => el.deanery == "Богоявленский");
    },
    getLocationTempls() {
      let funerals = this.getFuneralsForStatistic;
      let LocationTempls = funerals.filter(
        (el) =>
          !!el.locationTempl &&
          el.locationTempl !== "Свято-Пантелеимоновский храм (ГБ №2)"
      );
      return LocationTempls.length;
    },
    getLocation2b() {
      let funerals = this.getFuneralsForStatistic;
      let Location2b = funerals.filter(
        (el) => el.locationTempl === "Свято-Пантелеимоновский храм (ГБ №2)"
      );
      return Location2b.length;
    },
    getLocationCemeterys() {
      let funerals = this.getFuneralsForStatistic;
      let locationCemeterys = funerals.filter((el) => !!el.locationCemetery);
      return locationCemeterys.length;
    },
    getLocationAddress() {
      let funerals = this.getFuneralsForStatistic;
      let locationAddress = funerals.filter((el) => !!el.locationAddress);
      return locationAddress.length;
    },
  },
  methods: {
    getOdd(i) {
      return i % 2 === 0 ? "#e3e3e3" : "white";
    },
    getFuneralsTempl(templ) {
      let funerals = this.getFuneralsForStatistic;
      let funInTempl = funerals.filter(
        (el) => el.templ === templ && !!el.payment
      );
      return funInTempl.length;
    },
    getServicesAll(service) {
      let funerals = this.getFuneralsForStatistic;
      let servicesInMonth = funerals.filter((el) => el.service == service);
      return servicesInMonth.length;
    },
  },
  mounted() {
    let exportHtml = this.$refs.email;
    exportHtml = new XMLSerializer().serializeToString(exportHtml);
    emailjs.init("lUGqqOU7dq46rXtKd");
    var templateParams = {
      my_html: exportHtml,
    };

    emailjs.send("service_cholb4v", "template_h4fywni", templateParams);
    emailjs.send("service_cholb4v", "template_j0dt59d", templateParams);
    this.$router.push("/statistic");
    useDateStore().setDateToday();
    useUserStore().addPush("Отчёт отправлен", "basic", 1500);
  },
};
</script>

<style >
.email-export {
  display: none;
}
</style>