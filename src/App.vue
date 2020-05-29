<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'LogBaby',
  created() {
    this.$store.dispatch('themeSet')
  }
}
</script>
<style></style>
