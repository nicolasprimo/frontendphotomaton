<template>
  <div class="hello">
    <b-button variant="danger" @click="$emit('logout')">Logout</b-button>
    <h1>Photos :</h1>
    <Carousel :photos="photos" />
  </div>
</template>

<script>
import axios from "axios";
import Carousel from "./Carousel";
export default {
  components: {
    Carousel
  },
  beforeMount() {
    this.getDatas();
  },
  data() {
    return {
      photos: []
    };
  },
  props: {
    jwt: String
  },
  methods: {
    getDatas() {
      axios
        .get("http://128.199.44.66:1337/photomatons", {
          headers: {
            Authorization: `Bearer ${this.jwt}`
          }
        })
        .then(response => {
          // Handle success.
          this.photos = response.data;
        })
        .catch(error => {
          // Handle error.
          console.log("An error occurred:", error);
        });
    }
  }
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
