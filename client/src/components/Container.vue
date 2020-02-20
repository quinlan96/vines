<template>
  <div class="content">
    <div class="vine-search">
      <router-link to="/playlist"><font-awesome-icon icon="play" /></router-link>
      <input placeholder="Search..." />
      <font-awesome-icon icon="random" />
    </div>
    <div class="vine-container">
      <Vine v-for="vine in vines" :vine="vine" v-bind:key="vine.id" />
    </div>
  </div>
</template>

<script>
import Vine from './Vine'

export default {
  name: 'Container',
  data() {
    return {
      vines: [],
      playing: ''
    }
  },
  methods: {
    getVines() {
      fetch(process.env.VUE_APP_API_BASE, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(resp => resp.json())
        .then(json => this.vines = json);
    },
    updatePlaying() {

    }
  },
  mounted() {
    this.getVines();
  },
  components: {
    Vine
  }
}
</script>

<style scoped>
.content {
  max-width: 1280px;
  margin: 0 auto;
}

.vine-container {
  display: flex;
  flex-wrap: wrap;
}

.vine-search {
  display: flex;
  padding: 2rem 0;
}

.vine-search input {
  flex-grow: 1;
  font-size: 1.5rem;
  padding: .5rem;
  margin: 0 1rem;
  border: none;
  border-radius: .5rem;
}

.vine-search svg {
  vertical-align: middle;
  color: #fff;
  font-size: 2rem;
  height: 3rem;
}

.title {
  color: #fff;
  text-align: center;
  display: block;
  margin: 0;
  padding: 1rem;
}
</style>
