<template>
  <div id="wrapper">
    <main>
      <input type="text" v-model="filePath" />
      <div @click="open">geek.exe</div>
    </main>
  </div>
</template>

<script>
import SystemInformation from "./LandingPage/SystemInformation";
const { execFile } = require("child_process");

export default {
  name: "landing-page",
  data() {
    return {
      filePath: "C:\\software\\geek.exe",
    };
  },
  components: { SystemInformation },
  methods: {
    open() {
      const child = execFile(this.filePath, (error, stdout, stderr) => {
        console.error("error:", error);
        if (error) {
          throw error;
        }
        console.log("stdout:", stdout);
        console.log("stderr:", stderr);
      });
      console.log("child:", child);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}
</style>
