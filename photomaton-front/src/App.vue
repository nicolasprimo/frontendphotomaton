<template>
  <div id="app" class="container">
    <HomePage :jwt="JWT" v-if="JWT" @logout="logout" />
    <LoginPage v-else @connected="store" />
    <PhotomatonPage />
  </div>
</template>

<script>
import HomePage from "./components/HomePage.vue";
import LoginPage from "./components/LoginPage.vue";
import PhotomatonPage from "./components/PhotomatonPage.vue";

export default {
  name: "app",
  components: {
    HomePage,
    LoginPage,
    PhotomatonPage
  },
  methods: {
    store(jwt) {
      this.JWT = jwt;
      window.localStorage.setItem("token", jwt);
    },
    logout() {
      this.JWT = "";
      window.localStorage.removeItem("token");
    }
  },
  data() {
    return {
      JWT: ""
    };
  },
  beforeMount() {
    this.JWT = window.localStorage.getItem("token");
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
