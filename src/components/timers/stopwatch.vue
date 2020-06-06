<template>
  <q-card>
    <q-card-section class="q-pa-md row justify-center">
      <span class="time"
        >{{ timeDisplayed
        }}<span class="milliseconds">
          {{ this.time.milliseconds.toString().padStart(2, '0') }}
        </span>
      </span>
    </q-card-section>
    <q-card-section class="q-pa-md row justify-between items-end">
      <div>
        <q-btn flat round size="xs" color="orange" icon="mdi-history" />
        <q-tooltip
          anchor="top middle"
          self="bottom middle"
          :offset="[-15, -15]"
          content-class="bg-accent"
          >RESET TIME</q-tooltip
        >
      </div>
      <div>
        <q-btn
          flat
          round
          size="xl"
          color="primary"
          :icon="`mdi-${timer ? 'pause' : 'play'}`"
          @click="timer ? pauseTime() : startTime()"
        />
      </div>
      <div>
        <q-btn
          flat
          round
          size="xs"
          color="teal"
          icon="mdi-content-save"
          @click="saveLog"
        />
        <q-tooltip
          anchor="top middle"
          self="bottom middle"
          :offset="[-15, -15]"
          content-class="bg-accent"
          >SAVE LOG</q-tooltip
        >
      </div>
    </q-card-section>
    <q-card-section v-if="addLogShow">
      <addLog></addLog>
    </q-card-section>
  </q-card>
</template>

<script>
import addLog from 'components/logs/addLogQuick.vue'
export default {
  name: 'stopwatch',
  components: {
    addLog
  },
  data: () => ({
    addLogShow: false,
    firstStartDateTime: null,
    time: {
      startDateTime: null,
      pauseDateTime: null,
      timeTotal: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0
    },
    timeBase: {
      startDateTime: null,
      pauseDateTime: null,
      time: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0
    },
    timer: null
  }),
  computed: {
    timeDisplayed() {
      return `
      ${this.time.hours
        .toString()
        .padStart(2, '0')}:${this.time.minutes
        .toString()
        .padStart(2, '0')}:${this.time.seconds.toString().padStart(2, '0')}`
    }
  },
  methods: {
    pauseTime() {
      this.time.pauseDateTime = new Date()
      this.time.timeTotal +=
        this.time.pauseDateTime.getTime() - this.time.startDateTime.getTime()
      clearInterval(this.timer)
      this.timer = null
    },
    resetTime() {
      this.time = { ...this.baseTime }
      this.firstStartDateTime = null
    },
    saveLog() {
      this.addLogShow = !this.addLogShow
    },
    setTime() {
      const current = new Date().getTime()
      const timeDiff = current - this.time.startDateTime.getTime()
      const timeTotal = this.time.timeTotal + timeDiff

      const units = {
        hours: Math.floor(
          (timeTotal % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((timeTotal % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeTotal % (1000 * 60)) / 1000),
        milliseconds: Math.floor((timeTotal % 1000) / 100)
      }
      if (this.time.pauseDateTimess) {
        Object.keys(units).forEach(u => (this.time[u] += units[u]))
        // this.time.pauseDateTime = null
      } else {
        Object.keys(units).forEach(u => (this.time[u] = units[u]))
      }
    },
    startTime() {
      this.time.startDateTime = new Date()
      if (!this.firstStartDateTime) this.firstStartDateTime = new Date()
      // if (!this.time.pauseDateTime) {
      //   this.time.startDateTime = new Date()
      // }
      // this.setTime()
      this.timer = setInterval(this.setTime, 1)
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
}

>>> .q-btn .q-icon,
.q-btn .q-spinner {
  font-size: 2.715em;
}
</style>
