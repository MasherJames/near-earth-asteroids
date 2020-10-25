<template>
  <Notification
    v-if="authStatus.message"
    :message="authStatus.message"
    :type="authStatus.type"
  />
  <section class="register-wrapper">
    <div class="register-content">
      <h3 class="register-content__heading">Register Here</h3>
      <form @submit.prevent="register" class="register-content__form">
        <div class="input-wrapper">
          <input
            id="email"
            class="input"
            type="text"
            v-model="email"
            placeholder="Email Address"
          />
          <label for="email">{{ emailError }}</label>
        </div>
        <div class="input-wrapper">
          <input
            id="password"
            class="input"
            type="password"
            v-model="password"
            placeholder="Password"
          />
          <label for="password">{{ passwordError }}</label>
        </div>
        <div
          v-if="authLoading.isLoading && authLoading.type === 'register'"
          class="loading-wrapper"
        >
          <LoadingButton />
        </div>
        <input
          v-else
          class="register-btn"
          type="submit"
          value="Register"
          :disabled="!email || !password"
        />
      </form>

      <ul class="register-content__links">
        <li><router-link to="/login" class="link">Login</router-link></li>
        <li class="link">Need Help</li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import LoadingButton from "@/components/LoadingButton";
import Notification from "@/components/Notification";
import { validEmail, validPassword } from "../utils";

export default {
  name: "Register",
  components: {
    LoadingButton,
    Notification,
  },
  data() {
    return {
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
    };
  },
  methods: {
    ...mapActions(["registerUser"]),
    register() {
      const isEmailValid = validEmail(this.email);
      const isPasswordValid = validPassword(this.password);

      if (!isEmailValid) {
        this.emailError = "Please enter a valid email";
      } else {
        this.emailError = "";
      }

      if (!isPasswordValid) {
        this.passwordError =
          "Password should have atleast an uppercase, lowercase, number and at least 6 characters";
      } else {
        this.passwordError = "";
      }

      if (!isEmailValid || !isPasswordValid) return;

      const payload = {
        email: this.email,
        password: this.password,
        router: this.$router,
      };
      this.registerUser(payload);
    },
  },
  computed: mapGetters(["authLoading", "authStatus"]),
};
</script>

<style scoped>
.register-wrapper {
  min-height: 90vh;
  background-image: linear-gradient(
      to right bottom,
      rgba(22, 25, 70, 0.8),
      rgba(20, 22, 62, 0.8)
    ),
    url("../assets/register-bg.jpg");
  background-size: cover;
  background-position: top;
  padding: 8rem;
}

.register-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 40vw;
  margin: 0 auto;
}

.register-content__form {
  display: flex;
  flex-direction: column;
}

.input-wrapper {
  margin-bottom: 1rem;
  padding: 2px 0.8rem 2px 0;
}

label {
  color: #f03b7a;
}

.input {
  background: rgba(255, 255, 255, 0.15) !important;
  border-radius: 5px;
  padding: 0.8rem 0 0.8rem 1rem;
  font-size: 1rem;
  font-weight: 300;
  color: #ddd;
  letter-spacing: 1px;
  border: none;
  background: transparent;
  width: 100%;
  outline: none;
}

.register-btn {
  background-color: #f03b7a;
  border-radius: 5px;
  border: none;
  color: #fff;
  padding: 0.7rem 1rem;
  text-transform: uppercase;
  font-size: 1rem;
  width: 100%;
  margin-top: 0.8rem;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.2s;
}
.register-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px #0b0c2b;
}

.register-btn:focus {
  outline: none;
}

.register-btn:disabled {
  pointer-events: none;
  background-color: rgba(240, 59, 122, 0.7);
}

.loading-wrapper {
  padding: 0.7rem 1rem;
  background-color: #f03b7a;
  border-radius: 5px;
}

.register-content__heading {
  text-align: center;
  color: #fff;
  margin-bottom: 1rem;
  letter-spacing: 2px;
}

.register-content__links {
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin: 1rem 0;
  text-transform: uppercase;
}
.link {
  text-decoration: none;
  font-size: 0.8rem;
  letter-spacing: 2px;
  color: #fff;
  cursor: pointer;
}
</style>