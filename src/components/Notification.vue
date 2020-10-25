<template>
  <div class="notification-wrapper">
    <div class="alert" :class="classObject">
      <div class="text">{{ message }}</div>
      <button @click="hideNotification" type="button" class="close-btn">
        X
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Notification",
  props: {
    message: {
      type: String,
      required: true,
      default: () => {
        return "Something went wrong";
      },
    },
    type: {
      type: String,
      required: true,
      default: () => {
        return "error";
      },
    },
  },
  data() {
    return {
      autoHideNotification: false,
    };
  },
  methods: {
    ...mapMutations(["setAuthStatus", "setAsteroidsStatus"]),
    hideNotification() {
      this.setAuthStatus({ message: "", type: null });
      this.setAsteroidsStatus({ message: "", type: null });
    },
  },
  computed: {
    classObject() {
      return {
        success: this.type === "success",
        failure: this.type === "error",
      };
    },
  },
  watch: {
    autoHideNotification() {
      this.hideNotification();
    },
  },
  mounted() {
    // hide success notification after 2 seconds
    if (this.type === "success") {
      setTimeout(() => {
        this.autoHideNotification = true;
      }, 2000);
    }
  },
};
</script>

<style scoped>
.notification-wrapper {
  top: 9.5rem;
  right: 1rem;
  position: fixed;
  z-index: 1;
  width: 20vw;
}

.alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20rem;
  height: auto !important;
  height: 3rem;
  padding: 0.5rem 2rem;
  font-size: 0.875rem;
  transition: all 0.2s linear 0s;
}

.success {
  background-color: #c7cbd0;
  color: #2e3237;
}

.failure {
  background-color: #ea9999;
  color: #fff;
}

.close-btn {
  border: none;
  padding: 0 1rem;
  background-color: transparent;
  cursor: pointer;
  color: #f03b7a;
}

.close-btn:focus {
  outline: none;
}
</style>