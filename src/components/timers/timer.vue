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
          :color="alarm ? 'orange' : 'disabled'"
          :icon="`mdi-${alarm ? 'bell' : 'bell-off'}`"
          @click="alarmToggle"
        />
        <q-tooltip
          anchor="top middle"
          self="bottom middle"
          :offset="[-15, -15]"
          content-class="bg-accent"
          >{{ `Alarm is ${alarm ? 'ON' : 'OFF'}` }}</q-tooltip
        >
      </div>
      <div>
        <q-btn flat round size="xl" color="primary" icon="mdi-play" />
        <q-tooltip
          anchor="top middle"
          self="bottom middle"
          :offset="[-15, -15]"
          content-class="bg-accent"
          >{{ pauseDisabled ? 'SET TIME' : 'START TIMER' }}</q-tooltip
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
    alarm: false,
    time: {
      dt: new Date(),
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0
    },
    firstStartDateTime: null
  }),
  methods: {
    alarmToggle() {
      this.alarm = !this.alarm
    }
  },
  computed: {
    pauseDisabled() {
      let isDisabled = false
      Object.keys(this.time).forEach(i => {
        if (i !== 'dt' && i !== 0) isDisabled = true
      })
      return isDisabled
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
