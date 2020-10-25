<template>
  <header class="header">
    <router-link to="/" class="header-text"> Near Earth Asteroids </router-link>
    <nav>
      <ul class="nav-links">
        <template v-if="isAuthenticated">
          <li class="logged-in-user">{{ getCurrentUser.email ?? "" }}</li>
          <li class="nav-btn">
            <button @click="logout" type="button" class="link btn" to="/">
              Logout
            </button>
          </li>
        </template>
        <template v-else>
          <li class="nav-link">
            <router-link class="link" to="/login">Login</router-link>
          </li>
          <li class="nav-link">
            <router-link class="link" to="/register">Register</router-link>
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "Header",
  methods: {
    ...mapActions(["authStateChange", "signOutUser"]),
    ...mapMutations(["clearCacheOnLogout"]),
    logout() {
      this.signOutUser(this.$router);
      this.clearCacheOnLogout();
    },
  },
  computed: mapGetters(["isAuthenticated", "getCurrentUser"]),
  mounted() {
    this.authStateChange();
  },
};
</script>

<style scoped>
.header-text {
  font-style: italic;
  font-weight: 600;
  text-decoration: none;
  color: inherit;
}
.header {
  position: fixed;
  min-height: 10vh;
  z-index: 9999;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  background-color: #1b1b43;
  color: #fff;
}
.nav-links {
  display: flex;
  align-items: center;
  list-style: none;
}
.nav-link {
  margin-left: 2rem;
  background-color: #f03b7a;
  cursor: pointer;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  transition: all 0.2s;
}

.logged-in-user {
  color: #f03b7a;
}

.nav-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px #0b0c2b;
}

.nav-btn {
  margin-left: 2rem;
  background-color: #f03b7a;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.2s;
}

.link {
  text-decoration: none;
  color: inherit;
  padding: 0.5rem 1.5rem;
}

.btn {
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.btn:focus {
  outline: none;
}
</style>