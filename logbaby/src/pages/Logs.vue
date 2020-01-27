<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <!-- <div class="newLogColumn col-5 column content-around justify-start">
      <addLogQuick :logCategories="logCategories" @saveLog="logAdd"></addLogQuick>
      <q-card class="addNewLog q-pa-md q-mt-sm row justify-center">
        <p class="col-12">TODO: COMP w.steps</p>
        <q-btn rounded color="primary" icon="mdi-plus" label="ADD LOG" class="col-10 text-bold" />
      </q-card>
      <q-card class="addNewLog q-pa-md q-mt-sm row justify-center">
        <p class="col-12">TODO: COMP w.add last log</p>
        <q-btn rounded color="primary" icon="mdi-plus" label="ADD RECENT" class="col-10 text-bold" />
      </q-card>
    </div>-->
    <sideDrawer></sideDrawer>
    <div class="column col-6 content-around justify-start col-grow">
      <logsList   class="logList"></logsList>
    </div>
  </div>
</template>

<script>
import logsList from 'components/logs/logsList'
import sideDrawer from 'components/logs/sideDrawer'
export default {
  name: 'page-Logs',
  components: {
    logsList,
    sideDrawer
  },
  data: () => ({

    logs: []
  }),
  methods: {
    logsGet () {
      // for testing local storage
      // TODO: move to store?
      let logs = localStorage.getItem('logs')
      return JSON.parse(logs)
    }
  },
  created () {
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
