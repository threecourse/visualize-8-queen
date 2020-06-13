<template>
  <div>
    <nav class="navbar is-light">
      <div class="container">
        <div class="navbar-brand">
          <div class="navbar-item title is-3">
            Visualize 8-queen
          </div>
        </div>
      </div>
    </nav>

    <div class="container">
      <div class="columns my-0">
        <div class="column pt-5 column-controller">
          <Controller />
        </div>
        <div class="column is-9 pt-5 column-main">
          <Main />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Main from '../components/Main.vue'
import Controller from '../components/Controller.vue'

export default {
  components: { Main, Controller }
}
</script>

<style>
.column-controller {
  width: 360px;
}

.column-main {
  width: 800px;
  padding-left: 40px;
}
</style>
