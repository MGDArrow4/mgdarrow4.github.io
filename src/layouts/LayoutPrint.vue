<template>
  <div class="print__blank" ref="printPDF">
    <div class="blank__table">
      <print-head :month="getDateForStatistic" />
      <print-body :templs="getTemplsDeaneryNic" :days="getDayInMonth"
        >Николаевский округ</print-body
      >
      <print-body :templs="getTemplsDeaneryTheo" :days="getDayInMonth"
        >Богоявленский округ</print-body
      >
      <print-bottom :days="getDayInMonth" />
    </div>
    <div class="blanks">
      <print-services :services="this.services" />
      <print-location
        :templs="getLocationTempls"
        :hospital="getLocation2b"
        :cemeterys="getLocationCemeterys"
        :addresses="getLocationAddress"
      />
      <print-legend />
    </div>
  </div>
</template>

<script>
import { useDateStore } from "@/stores/DateStore";
import { useTemplsStore } from "@/stores/TemplsStore";
import { useFuneralsStore } from "@/stores/FuneralsStore";
import { useServicesStore } from "@/stores/ServicesStore";
import { mapState } from "pinia";

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import PrintLegend from "@/components/AppPrint/PrintLegend.vue";
import PrintLocation from "@/components/AppPrint/PrintLocation.vue";
import PrintServices from "@/components/AppPrint/PrintServices.vue";
import PrintBottom from "@/components/AppPrint/PrintBottom.vue";
import PrintHead from "@/components/AppPrint/PrintHead.vue";
import PrintBody from "@/components/AppPrint/PrintBody.vue";

export default {
  components: {
    PrintLegend,
    PrintLocation,
    PrintServices,
    PrintBottom,
    PrintHead,
    PrintBody,
  },
  name: "LayoutPrint",
  computed: {
    ...mapState(useDateStore, ["getDateForStatistic", "getCorrectDate"]),
    ...mapState(useTemplsStore, ["templs"]),
    ...mapState(useFuneralsStore, ["getFuneralsForStatistic"]),
    ...mapState(useServicesStore, ["services"]),
    getDayInMonth() {
      let year = this.getCorrectDate.year;
      let month = this.getCorrectDate.month;
      return (
        (new Date(year, month + 1, 1) - new Date(year, month, 1)) / 86400000
      );
    },
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
  mounted() {
    let printPDF = this.$refs.printPDF;
    const doc = new jsPDF({
      orientation: "landscape",
      format: "a4",
      putOnlyUsedFonts: true,
    });

    html2canvas(printPDF, {
      width: "1122",
      height: "793",
      scale: 2,
      imageTimeout: 0,
    }).then((canvas) => {
      const img = canvas.toDataURL("image/png", 1);
      doc.addImage(img, "PNG", 0, 0, "295", "209");
      doc.save(`${this.getDateForStatistic}.pdf`);
      this.$router.push("/statistic");
    });
  },
};
</script>

<style lang="scss">
.print__blank {
  width: 297mm;
  height: 210mm;
  background: $print-bg;
  color: $print-border;
  // padding: 12.7mm;
  padding: 10mm;
  font-size: 0.9em;
  & .blank__table {
    width: 100%;
    border: 2px solid $print-border;
  }
  & .blanks {
    margin-top: 3mm;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
  }
}

.print-correct {
  position: relative;
  top: -6px;
}
</style>