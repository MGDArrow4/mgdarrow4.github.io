<template>
  <div class="app__edit">
    <h1>Редактирование</h1>
    <add-services v-if="!service" @getService="(e) => (service = e.name)" />
    <add-time v-else-if="!time" @getTime="(e) => (time = e)"></add-time>
    <div class="edit-funeral" v-else>
      <div class="add__time-service">
        <div class="add__time-block" @click="time = ''">{{ time }}</div>
        <div class="add__service-block" @click="service = ''">
          {{ service }}
        </div>
        <add-payment
          class="add__payment-block"
          :payment="payment"
          @pay="payment = !payment"
        />
      </div>
      <add-templ
        @location="(e) => getLocation(e)"
        :inputPrors="
          funeral.locationTempl ||
          funeral.locationCemetery ||
          funeral.locationAddress
        "
      />
      <the-input-text
        :label="'Фамилия'"
        :type="'text'"
        v-model.trim="surname"
      />
      <the-input-text
        :label="'Комментарий'"
        :type="'text'"
        v-model.trim="comment"
      />
      <the-button :text="'Редактировать'" @click="editFuneral()" />
    </div>
  </div>
</template>

<script>
import TheInputText from "@/components/ui/TheInputText.vue";
import TheButton from "@/components/ui/TheButton.vue";
import AddServices from "@/components/AppAdd/AddServices.vue";
import AddTime from "@/components/AppAdd/AddTime.vue";
import AddTempl from "@/components/AppAdd/AddTempl.vue";
import AddPayment from "@/components/AppAdd/AddPayment.vue";

import { useUserStore } from "@/stores/UserStore.js";
import { useDateStore } from "@/stores/DateStore.js";
import { useFuneralsStore } from "@/stores/FuneralsStore.js";

export default {
  name: "AppFunEdit",
  components: {
    AddServices,
    AddTime,
    AddTempl,
    TheInputText,
    AddPayment,
    TheButton,
  },
  data() {
    return {
      funeral: null,
      service: "",
      time: "",
      locationTempl: "",
      locationCemetery: "",
      locationAddress: "",
      surname: "",
      comment: "",
      payment: true,
    };
  },
  methods: {
    getLocation(e) {
      this.locationTempl = e.type === "templ" ? e.location : "";
      this.locationCemetery = e.type === "cemetery" ? e.location : "";
      this.locationAddress = e.type === "address" ? e.location : "";
    },
    async editFuneral() {
      let idUserName = useUserStore().user.user.email;
      let date = useDateStore().getDateForSupabase;
      let templ =
        this.locationTempl &&
        this.locationTempl !== "Свято-Пантелеимоновский храм (ГБ №2)"
          ? this.locationTempl
          : false;
      let phoneLocation =
        this.locationTempl === "Свято-Пантелеимоновский храм (ГБ №2)"
          ? false
          : null;
      let phoneTempl = false;
      if (this.locationTempl || this.locationCemetery || this.locationAddress) {
        useFuneralsStore()
          .putFunerals(
            {
              service: this.service.name,
              date,
              time: this.time,
              locationTempl: this.locationTempl,
              locationCemetery: this.locationCemetery,
              locationAddress: this.locationAddress,
              surname: this.surname,
              comment: this.comment,
              payment: this.payment,
              templ,
              phoneLocation,
              phoneTempl,
              idUserName,
            },
            this.$route.params.id
          )
          .then(this.$router.replace({ path: "/read" }));
      }
    },
  },
  mounted() {
    let data = useFuneralsStore().getFuneralsForEdit(this.$route.params.id);
    this.funeral = data;
    this.service = data.service;
    this.time = data.time;
    this.locationTempl = data.locationTempl;
    this.locationCemetery = data.locationCemetery;
    this.locationAddress = data.locationAddress;
    this.surname = data.surname;
    this.comment = data.comment;
    this.payment = data.payment;
  },
};
</script>

<style lang="scss">
.app__add {
  width: 100%;
  height: calc(100dvh - 16dvh + 5px);
  overflow: auto;
}
.add__time-service {
  width: 100%;
  height: calc(7dvh - 10px);
  line-height: calc(7dvh - 10px);
  margin-bottom: 5px;
  font-size: 1.3em;
  text-align: center;
  display: flex;
  flex-wrap: nowrap;
  & .add__time-block {
    width: calc(16dvh + 10px);
    margin-right: 5px;
    background: $col-basic;
    font-weight: 400;
    text-transform: uppercase;
  }
  & .add__service-block {
    flex-grow: 1;
    height: 100%;
    background: $col-bg-hover;
    width: 100%;
    text-transform: uppercase;
  }
  & .add__payment-block {
    width: calc(16dvh + 10px);
    margin-left: 5px;
    font-size: 1.2em;
    transition: all 0.2s ease-in-out;
  }
}
</style>