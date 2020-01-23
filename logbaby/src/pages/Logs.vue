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
    <q-drawer
      v-model="leftDrawer"
      show-if-above
      :mini="!leftDrawer || leftDrawerIsMini"
      @click.capture="drawerClick"
      :width="350"
      :breakpoint="500"
      bordered
      content-class="bg-grey-3"
    >
      <template v-slot:mini>
        <q-scroll-area class="fit mini-slot cursor-pointer">
          <div class="q-py-lg">
            <div class="column items-center">
              <q-icon name="mdi-plus" color="blue" size="md" class="q-mb-md" />
              <q-icon name="mdi-filter" color="orange" size="md" class="q-mb-md" />
              <q-icon name="mdi-information" color="purple" size="md" class="q-mb-md" />
              <q-icon name="mdi-playlist-edit" color="teal" size="md" class="q-mb-md" />
            </div>
          </div>
        </q-scroll-area>
      </template>
      <q-tabs
        v-model="leftDrawerTab"
        dense
        align="justify"
        class="bg-whit text-primary"
        :breakpoint="0"
      >
        <q-tab name="add" icon="mdi-plus" />
        <q-tab name="filter" icon="mdi-filter" />
        <q-tab name="info" icon="mdi-information" />
        <q-tab name="edit" icon="mdi-playlist-edit" />
      </q-tabs>
      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
        <q-btn
          dense
          round
          unelevated
          color="accent"
          icon="mdi-chevron-left"
          @click="leftDrawerIsMini = true"
        />
      </div>
    </q-drawer>
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
export default {
  name: 'page-Logs',
  components: {
    addLogQuick,
    logsList
  },
  data: () => ({
    leftDrawer: true,
    leftDrawerIsMini: false,
    leftDrawerTab: null,
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
    drawerClick (e) {
      // if in "mini" state and user
      // click on drawer, we switch it to "normal" mode
      if (this.leftDrawerIsMini) {
        this.leftDrawerIsMini = false

        // notice we have registered an event with capture flag;
        // we need to stop further propagation as this click is
        // intended for switching drawer to "normal" mode only
        e.stopPropagation()
      }
    },
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
