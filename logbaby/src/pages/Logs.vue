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
      <logsList :categories="logCategories" :logs="logs" class="logList"></logsList>
      <div class="newLogColumn col-5 column content-around justify-start">
        <addLogQuick :logCategories="logCategories" @saveLog="logAdd"></addLogQuick>
        <q-card class="addNewLog q-pa-md q-mt-sm row justify-center">
          <p class="col-12">TODO: COMP w.steps</p>
          <q-btn rounded color="primary" icon="mdi-plus" label="ADD LOG" class="col-10 text-bold" />
        </q-card>
        <q-card class="addNewLog q-pa-md q-mt-sm row justify-center">
          <p class="col-12">TODO: COMP w.add last log</p>
          <q-btn
            rounded
            color="primary"
            icon="mdi-plus"
            label="ADD RECENT"
            class="col-10 text-bold"
          />
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import addLogQuick from 'components/logs/addLogQuick'
import logsList from 'components/logs/logsList'
import sideDrawer from 'components/logs/sideDrawer'
export default {
  name: 'page-Logs',
  components: {
    addLogQuick,
    logsList,
    sideDrawer
  },
  data: () => ({
    logCategories: [
      {
        icon: 'mdi-sleep',
        text: 'Sleep',
        color: 'red',
        id: 1
      },
      {
        icon: 'mdi-baby-bottle',
        text: 'Bottle Feed',
        color: 'blue',
        id: 2
      },
      {
        icon: 'mdi-mother-nurse',
        text: 'Breast Feed',
        color: 'orange',
        id: 3
      },
      {
        icon: 'mdi-water',
        text: 'Potty Liquid',
        color: 'green',
        id: 4
      },
      {
        icon: 'mdi-emoticon-poop',
        text: 'Potty Solid',
        color: 'brown',
        id: 5
      }
    ],
    logs: []
  }),
  methods: {
    logAdd (log) {
      console.log(log)
      // tempid
      let id = this.logs.length > 0 ? this.logs[this.logs.length - 1].id + 1 : 1
      this.logs.push({ ...log, id: id })
      this.logsSet()
    },
    logsGet () {
      // for testing local storage
      // TODO: move to store?
      let logs = localStorage.getItem('logs')
      return JSON.parse(logs)
    },
    logsSet () {
      localStorage.setItem('logs', JSON.stringify(this.logs))
    }

  },
  created () {
    this.logs = this.logsGet() || []
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
