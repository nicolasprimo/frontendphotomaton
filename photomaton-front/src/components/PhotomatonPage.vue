<template>
  <div>
    <h1>JE SUIS SUR PHOTOMATON</h1>
    <div class="pm-container">
      <div id="my_camera"></div>
    </div>

    <i id="capture" class="fas fa-record-vinyl" @click="take_snapshot"></i>
    <i id="cancel" class="fas fa-record-vinyl" @click="cancel_snapshot"></i>
    <div id="results"></div>
  </div>
</template>

<script>
import "../assets/css/style.css";
import "../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "../../webcamjs/webcam";

export default {
  data() {
    return {};
  },
  props: {},
  methods: {
    take_snapshot() {
      // take snapshot and get image data
      Webcam.snap(function(data_uri) {
        // display results in page
        document.getElementById("results").innerHTML =
          "<h2>Voici votre photo</h2>" + '<img src="' + data_uri + '"/>';
        document.getElementById("my_camera").classList.remove("visibility-on");
        document.getElementById("my_camera").classList.add("visibility-off");
      });
    },

    cancel_snapshot() {
      // take snapshot and get image data
      Webcam.snap(function(data_uri) {
        // display results in page
        document.getElementById("results").innerHTML = "";
        document.getElementById("my_camera").classList.remove("visibility-off");
        document.getElementById("my_camera").classList.add("visibility-on");
      });
    }
  },
  mounted() {
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