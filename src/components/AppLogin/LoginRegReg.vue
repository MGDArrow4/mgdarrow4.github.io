<template>
  <div class="log-reg__registration--inside">
    <h1>Регистрация</h1>

    <input-text
      :type="'text'"
      :label="'Имя'"
      v-model.trim="username"
      :dirty="v$.username.$dirty"
      :valid="v$.username.required.$response && v$.username.minLength.$response"
      :labelInvalid="!v$.username.required.$response"
    />

    <input-text
      :type="'email'"
      :label="'E-mail'"
      v-model.trim="email"
      :dirty="v$.email.$dirty"
      :valid="v$.email.required.$response && v$.email.email.$response"
      :labelInvalid="!v$.email.required.$response"
    />

    <input-text
      :type="'password'"
      :label="'Пароль'"
      v-model.trim="password"
      :dirty="v$.password.$dirty"
      :valid="v$.password.required.$response && v$.password.minLength.$response"
      :labelInvalid="!v$.password.required.$response"
    />

    <input-text
      :type="'password'"
      :label="'Повторный пароль'"
      v-model.trim="passwordConf"
      :dirty="v$.passwordConf.$dirty"
      :valid="
        v$.passwordConf.required.$response && v$.passwordConf.sameAs.$response
      "
      :labelInvalid="!v$.passwordConf.required.$response"
    />

    <the-button :text="'Зарегистрироваться'" @click="singUp()"></the-button>

    <login-reg-errors :errors="errors"></login-reg-errors>
  </div>
</template>

<script>
import InputText from "@/components/ui/TheInputText.vue";
import TheButton from "@/components/ui/TheButton.vue";
import LoginRegErrors from "@/components/AppLogin/LoginRegErrors.vue";

import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength, sameAs } from "@vuelidate/validators";
import { supabase } from "@/lib/supabaseClient.js";

export default {
  components: { InputText, TheButton, LoginRegErrors },
  name: "LoginRegReg",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      passwordConf: "",
      errors: [],
    };
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      username: { required, minLength: minLength(4) },
      email: { email, required },
      password: { required, minLength: minLength(8) },
      passwordConf: { required, sameAs: sameAs(this.password) },
    };
  },
  watch: {
    username() {
      this.v$.username.$touch();
    },
    email() {
      this.v$.email.$touch();
    },
    password() {
      this.v$.password.$touch();
    },
    passwordConf() {
      this.v$.passwordConf.$touch();
    },
  },
  methods: {
    async singUp() {
      const resultValid = await this.v$.$validate();
      if (resultValid) {
        // eslint-disable-next-line
        const { data, error } = await supabase.auth.signUp({
          email: this.email,
          password: this.password,
          options: {
            data: {
              username: this.username,
            },
          },
        });
        if (error) {
          this.errors = [];
          this.errors.push("TE-mail занят");
        } else {
          this.$router.push("/");
        }
      } else {
        this.errors = [];
        !this.v$.username.minLength.$response &&
          this.errors.push("Имя менее 4-х символов");
        !this.v$.email.email.$response &&
          this.errors.push("E-mail введён некорректно");
        !this.v$.password.minLength.$response &&
          this.errors.push("Пароль менее 8-ми символов");
        !this.v$.passwordConf.sameAs.$response &&
          this.errors.push("Пароли не совпадают");
      }
    },
  },
};
</script>