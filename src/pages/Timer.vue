<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <sideDrawer></sideDrawer>
    <div class="column col-6 content-around justify-start col-grow">
      <!-- TODO, TIMERS (stopwatch, timer, alarm) HISTORY -->
      <logsList class="logList"></logsList>
    </div>
  </div>
</template>

<script>
import logsList from 'components/logs/logsList'
import sideDrawer from 'components/timers/sideDrawer'
export default {
  name: 'page-Timers',
  components: {
    logsList,
    sideDrawer
  },
  data: () => ({
    logs: []
  }),
  created() {
    this.$store.dispatch('initializeLogs')
  }
}
</script>

<style>
/* .newLogColumn{
  height: 80vh;
}
 */
.logListColumn {
  height: 80vh;
}
.logList {
  width: 100%;
}
</style>
