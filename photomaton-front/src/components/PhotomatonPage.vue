<template>
  <div>
    <div class="pm-container">
      <div id="my_camera"></div>
    </div>
    <i id="capture" class="fas fa-record-vinyl" onClick="take_snapshot()"></i>
    <i id="cancel" class="fas fa-record-vinyl" onClick="cancel_snapshot()"></i>
    <div id="results"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {},
  methods: {}
};
</script>