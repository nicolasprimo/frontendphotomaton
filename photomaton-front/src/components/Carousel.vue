<template>
  <div>
    <h1>{{date}}</h1>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        v-for="photo in dataImg"
        :key="photo.id"
        caption
        text
        :img-src="photo.photo"
      ></b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
    </b-carousel>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
      dataImg: [],
      date: new Date().toLocaleDateString()
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  },
  mounted() {
    axios.get("http://localhost:1337/photomatons").then(res => {
      this.dataImg = res.data;
    });
  }
};
</script>