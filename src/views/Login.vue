<template>
  <div class="container-login">
    <div class="login">
      <h1 class="title-h1">Sing in</h1>
      <AppValidationErrors
        v-if="validationErrors"
        :validation-errors="validationErrors"
      />
      <form @submit.prevent="onSubmit" class="form">
        <fieldset class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Логин"
            name="username"
            v-model="username"
          />
        </fieldset>
        <fieldset class="form-group">
          <input
            type="password"
            class="form-control"
            name="password"
            placeholder="Пароль"
            v-model="password"
          />
        </fieldset>
        <md-button type="submit" class="md-raised md-primary">Вход</md-button>
      </form>
    </div>
  </div>
</template>

<script>
import AppValidationErrors from "@/components/ValidationErrors";
import { actionTypes } from "@/store/modules/auth";
import { mapState } from "vuex";

export default {
  name: "AppLogin",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  components: {
    AppValidationErrors,
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.auth.isSubmitting,
      validationErrors: (state) => state.auth.validationErrors,
    }),
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.login, {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "home" });
        })
        .catch((er) => {
          console.log("Ошибка", er);
        });
    },
  },
};
</script>
