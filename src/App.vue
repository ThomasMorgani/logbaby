<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'LogBaby',
  created() {
    this.$store.dispatch('themeSet').then(() => {
      this.$q.dark.set(this.$store.state.mainStore.darkMode)
    })
  }
}
</script>
<style>
.notificationClass {
  margin-right: 25px;
  margin-top: 105px;
}

.q-card--dark {
  background: #242423;
}
</style>
