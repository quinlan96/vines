<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "assets/scss/_variables";
@import "~bootstrap/scss/bootstrap";

html, #app {
	margin: 0;
	padding: 0;
}

body {
  background-color: $gray-800;
  color: $light;
  margin: 0;
  padding: 0;
}
</style>
