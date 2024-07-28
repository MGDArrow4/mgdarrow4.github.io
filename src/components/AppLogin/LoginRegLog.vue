<template>
  <div class="log-reg__login--inside">
    <form @submit.prevent="singIn()">
      <h1>Авторизация</h1>

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
        :valid="
          v$.password.required.$response && v$.password.minLength.$response
        "
        :labelInvalid="!v$.password.required.$response"
      />

      <the-button :text="'Войти'" @click="singIn()"></the-button>
    </form>

    <login-reg-errors :errors="errors"></login-reg-errors>
  </div>
</template>

<script>
import InputText from "@/components/ui/TheInputText.vue";
import TheButton from "@/components/ui/TheButton.vue";
import LoginRegErrors from "@/components/AppLogin/LoginRegErrors.vue";

import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength } from "@vuelidate/validators";
import { supabase } from "@/lib/supabaseClient.js";

export default {
  components: { InputText, TheButton, LoginRegErrors },
  name: "LoginRegLog",
  data() {
    return {
      email: "",
      password: "",
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
      email: { email, required },
      password: { required, minLength: minLength(8) },
    };
  },
  watch: {
    email() {
      this.v$.email.$touch();
    },
    password() {
      this.v$.password.$touch();
    },
  },
  methods: {
    async singIn() {
      const resultValid = await this.v$.$validate();
      if (resultValid) {
        // eslint-disable-next-line
        const { data, error } = await supabase.auth.signInWithPassword({
          email: this.email,
          password: this.password,
        });
        if (error) {
          this.errors = [];
          this.errors.push("Неправильные данные");
        } else {
          this.$router.push("/");
        }
      } else {
        this.errors = [];
        !this.v$.email.email.$response &&
          this.errors.push("E-mail введён некорректно");
        !this.v$.password.minLength.$response &&
          this.errors.push("Пароль менее 8-ми символов");
      }
    },
  },
};
</script>