<template>
  <div>
    <div id="timer e">{{maxSecs}}</div>
    <div class="flash"></div>
    <div class="vision"></div>
    <div class="pm-container">
      <div id="my_camera"></div>
    </div>
    <i
      id="capture"
      v-if="photoTaken"
      style="color: #7cb342"
      class="fas fa-check-circle"
      @click="sendPicture"
    ></i>
    <i id="capture" v-else class="fas fa-record-vinyl" @click="count(4)"></i>
    <i
      id="cancel"
      v-if="photoTaken"
      style="color: #b34c4c"
      class="fas fa-times-circle"
      @click="cancelSnapshot"
    ></i>
    <i id="cancel" v-else class="fas fa-record-vinyl" @click="cancelSnapshot"></i>
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
      decompte: null,
      saveImg: false,
      photoTaken: false
    };
  },
  props: {},
  watch: {
    maxSecs(val) {
      if (this.maxSecs == 0) {
        clearInterval(this.decompte);
        this.photoTaken = true;
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
      self = this;
      Webcam.snap(function(data_uri) {
        self.img = data_uri;
        // display results in page
        document.getElementById("results").innerHTML =
          "<h2></h2>" + '<img src="' + data_uri + '"/>';
        document.getElementById("my_camera").classList.remove("visibility-on");
        document.getElementById("my_camera").classList.add("visibility-off");
        // self.sendPicture();
      });
    },

    cancelSnapshot() {
      this.photoTaken = false;
      // take snapshot and get image data
      Webcam.snap(function(data_uri) {
        // display results in page
        document.getElementById("results").innerHTML = "";
        document.getElementById("my_camera").classList.remove("visibility-off");
        document.getElementById("my_camera").classList.add("visibility-on");
      });
    },

    sendPicture() {
      axios.post("http://128.199.44.66:1337/photomatons", {
        photo: this.img
      });
      this.cancelSnapshot();
    }
  },
  mounted() {
    document.addEventListener("keypress", e => {
      if (e.key === "s") {
        this.cancelSnapshot();
      }
      if (e.key === "5") {
        this.count(4);
      }
    });
    axios.get("http://128.199.44.66:1337/photomatons").then(res => {
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