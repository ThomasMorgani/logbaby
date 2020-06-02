<template>
  <q-card>
    <q-card-section class="q-pa-md row justify-center">
      <span class="time">00:00:00<span class="milliseconds">00</span></span>
    </q-card-section>
    <q-card-section class="q-pa-md row justify-between items-end">
      <div>
        <q-btn
          flat
          round
          size="xs"
          color="orange"
          :icon="`mdi-${alarm ? 'bell' : 'bell-off'}`"
          @click="alarmToggle"
        />
        <q-tooltip
          anchor="top middle"
          self="bottom middle"
          :offset="[-15, -15]"
          content-class="bg-accent"
          >PLAY ALARM</q-tooltip
        >
      </div>
      <div>
        <q-btn flat round size="xl" color="primary" icon="mdi-play" />
        <q-tooltip
          anchor="top middle"
          self="bottom middle"
          :offset="[-15, -15]"
          content-class="bg-accent"
          >START TIMER</q-tooltip
        >
      </div>
      <div>
        <q-btn flat round size="xs" color="teal" icon="mdi-content-save" />
        <q-tooltip
          anchor="top middle"
          self="bottom middle"
          :offset="[-15, -15]"
          content-class="bg-accent"
          >SAVE LOG</q-tooltip
        >
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'timer',
  data: () => ({
    alarm: false
  }),
  methods: {
    alarmToggle() {
      this.alarm = !this.alarm
    }
  }
}
</script>

<style scoped>
.time {
  font-size: 3.5em;
}
.time .milliseconds {
  font-size: 0.5em;
  margin-left: 0.25em;
}
>>> .q-btn .q-icon,
.q-btn .q-spinner {
  font-size: 2.715em;
}
</style>
