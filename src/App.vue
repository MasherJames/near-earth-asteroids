<template>
  <Header />
  <router-view></router-view>
  <Footer />
</template>


<script>
import { mapActions } from "vuex";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    Footer,
    Header,
  },
  methods: mapActions(["authStateChange"]),
  mounted() {
    // Fetch current user at the root and get the data from anywhere
    this.authStateChange();
  },
};
</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
* {
  padding: 0;
  margin: 0;
  box-sizing: inherit;
}

body {
  font-family: "Montserrat", sans-serif;
  box-sizing: border-box;
}
</style>
