<template>
  <div>
    <div id="timer">{{maxSecs}}</div>
    <div class="flash"></div>
    <div class="vision"></div>
    <div class="pm-container">
      <div id="my_camera"></div>
    </div>
    <i id="capture" class="fas fa-record-vinyl" @click="count(4)"></i>
    <i id="cancel" class="fas fa-record-vinyl" @click="cancelSnapshot"></i>
    <div id="results"></div>
  </div>
</template>

<script>
import "../assets/css/style.css";
import "../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "../../webcamjs/webcam";
import axios from "axios";

export default {
  data() {
    return {
      img: "",
      name: "",
      maxSecs: null,
      decompte: null
    };
  },
  props: {},
  watch: {
    maxSecs(val) {
      if (this.maxSecs == 0) {
        clearInterval(this.decompte);
        this.maxSecs = null;
        this.takeSnapshot();
      }
    }
  },
  methods: {
    count(secs) {
      this.cancelSnapshot();
      if (this.maxSecs === null) {
        this.maxSecs = secs;
        this.decompte = setInterval(() => {
          this.maxSecs--;
        }, 1000);
      }
    },
    takeSnapshot() {
      // setTimeout(() => {
      // take snapshot and get image data
      self = this;
      Webcam.snap(function(data_uri) {
        self.img = data_uri;
        // display results in page
        document.getElementById("results").innerHTML =
          "<h2></h2>" + '<img src="' + data_uri + '"/>';
        document.getElementById("my_camera").classList.remove("visibility-on");
        document.getElementById("my_camera").classList.add("visibility-off");
        self.sendPicture();
      });
      // }, 3000);
    },

    cancelSnapshot() {
      // take snapshot and get image data
      Webcam.snap(function(data_uri) {
        // display results in page
        document.getElementById("results").innerHTML = "";
        document.getElementById("my_camera").classList.remove("visibility-off");
        document.getElementById("my_camera").classList.add("visibility-on");
      });
    },

    sendPicture() {
      axios.post("http://localhost:1337/photomatons", {
        photo: this.img
      });
    }
  },
  mounted() {
    axios.get("http://localhost:1337/photomatons").then(res => {
      this.dataImg = res.data;
    });

    Webcam.set({
      width: 854,
      height: 648,
      image_format: "jpeg",
      jpeg_quality: 100,
      constraints: {
        width: {
          exact: 854
        },
        height: {
          exact: 648
        }
      }
    });
    Webcam.attach("#my_camera");
  }
};
</script>