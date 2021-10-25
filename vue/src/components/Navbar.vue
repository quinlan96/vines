<template>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
          <div class="container">
        <b-navbar-brand to="/">
            <font-awesome-icon :icon="['fab', 'vine']" size="2x" />
            </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/creators">Sandwich artists</b-nav-item>
            <b-nav-item to="/upload">Upload</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
        </div>
      </b-navbar>
    </div>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>

<style lang="scss" scoped>
</style>
