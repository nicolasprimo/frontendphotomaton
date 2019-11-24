<template>
  <div>
    <b-form inline>
      <label class="sr-only" for="inline-form-input-name">Name</label>
      <b-input-group prepend="Name" class="mb-2 mr-sm-2 mb-sm-0">
        <b-input id="inline-form-input-username" placeholder v-model="identifier"></b-input>
      </b-input-group>

      <label class="sr-only" for="inline-form-input-username">Username</label>
      <b-input-group prepend="Password" class="mb-2 mr-sm-2 mb-sm-0">
        <b-input id="inline-form-input-username" placeholder v-model="password"></b-input>
      </b-input-group>

      <b-button variant="primary" @click="login">Login</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";

// Request API.
export default {
  data() {
    return {
      identifier: "",
      password: ""
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:1337/auth/local", {
          identifier: this.identifier,
          password: this.password
        })
        .then(response => {
          // Handle success.
          console.log("User profile", response.data.user);
          console.log("User token", response.data.jwt);
          this.$emit("connected", response.data.jwt);
        })
        .catch(error => {
          // Handle error.
          console.log("An error occurred:", error);
        });
    }
  },
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
