<template>
  <div class="app__add">
    <h1>{{ getDate }}</h1>
    <add-services v-if="!service" @getService="(e) => (service = e)" />
    <add-time v-else-if="!time" @getTime="(e) => (time = e)"></add-time>
    <div class="add-funeral" v-else>
      <div class="add__time-service">
        <div class="add__time-block" @click="time = ''">{{ time }}</div>
        <div class="add__service-block" @click="service = ''">
          {{ service.name }}
        </div>
        <add-payment
          class="add__payment-block"
          :payment="payment"
          @pay="payment = !payment"
        />
      </div>

      <add-templ @location="(e) => getLocation(e)" />
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
      <add-info :templ="locationTempl" :time="time" />
      <the-button :text="'Добавить'" @click="addFuneral()" />
    </div>
  </div>
</template>

<script>
import AddServices from "@/components/AppAdd/AddServices.vue";
import AddTime from "@/components/AppAdd/AddTime.vue";
import TheButton from "@/components/ui/TheButton.vue";
import AddTempl from "@/components/AppAdd/AddTempl.vue";
import TheInputText from "@/components/ui/TheInputText.vue";
import AddPayment from "@/components/AppAdd/AddPayment.vue";
import AddInfo from "@/components/AppAdd/AddInfo.vue";
import { useUserStore } from "@/stores/UserStore.js";
import { useDateStore } from "@/stores/DateStore.js";
import { useFuneralsStore } from "@/stores/FuneralsStore.js";

export default {
  components: {
    AddServices,
    TheButton,
    AddTime,
    AddTempl,
    TheInputText,
    AddPayment,
    AddInfo,
  },
  name: "AppFunAdd",
  data() {
    return {
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
  computed: {
    getDate() {
      return `Добавить на${useDateStore().getDateDay}`;
    },
  },
  methods: {
    addFuneral() {
      let idUserName = useUserStore().user.user.email;
      if (idUserName) {
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
        if (
          this.locationTempl ||
          this.locationCemetery ||
          this.locationAddress
        ) {
          useFuneralsStore()
            .postFunerals({
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
            })
            .then(this.clearForm());
        }
      } else {
        this.$router.replace({ path: "/login" });
      }
    },
    getLocation(e) {
      this.locationTempl = e.type === "templ" ? e.location : "";
      this.locationCemetery = e.type === "cemetery" ? e.location : "";
      this.locationAddress = e.type === "address" ? e.location : "";
    },
    clearForm() {
      this.time = "";
      this.locationTempl = "";
      this.locationCemetery = "";
      this.locationAddress = "";
      this.surname = "";
      this.comment = "";
      this.payment = true;
    },
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