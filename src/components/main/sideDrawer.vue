<template>
  <q-card height="100%">
    <img height="150" src="https://cdn.quasar.dev/img/mountains.jpg" />
    <q-avatar
      size="100px"
      font-size="52px"
      color="white"
      class="navDrawerAvatar"
    >
      <img class="q-pa-sm" src="~/assets/undraw_baby.svg" />
    </q-avatar>
    <q-card-section>
      <div class="text-h6">Avatar needs to be rounded..</div>
      <div class="text-subtitle2">
        smaller image, baby name, age (mths, days)above
      </div>
    </q-card-section>
    <q-card-section>
      <q-toggle
        v-model="darkMode"
        size="xl"
        checked-icon="mdi-weather-night"
        :icon-color="darkMode ? 'white' : 'yellow'"
        :class="darkMode ? 'white' : 'lightModeIcon'"
        unchecked-icon="mdi-brightness-5"
      />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  computed: {
    darkMode: {
      get() {
        return this.$store.state.mainStore.darkMode
      },
      set() {
        this.$store.dispatch('toggleStateItem', 'darkMode')
        console.log(this.$q)
        this.$q.dark.set(this.darkMode)
      }
    }
  }
}
</script>

<style scoped></style>
