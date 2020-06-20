<template>
  <q-drawer
    v-model="isActive"
    show-if-above
    :mini="!isActive || isMini"
    :width="width"
    :breakpoint="500"
    elevated=""
  >
    <template v-slot:mini>
      <q-scroll-area class="fit mini-slot cursor-pointer">
        <div class="q-py-lg">
          <div class="column items-center">
            <q-btn
              v-for="icon in tabItems"
              :key="'nav' + icon.name"
              :icon="icon.icon"
              :color="icon.color"
              flat
              size="md"
              class="q-mb-md"
              @click="drawerClick(icon.name)"
            ></q-btn>
          </div>
        </div>
      </q-scroll-area>
    </template>
    <q-tabs v-model="activeTab" align="justify" :breakpoint="0" inline-label>
      <q-tab
        v-for="tab in tabItems"
        :key="'tab' + tab.name"
        :name="tab.name"
        :icon="tab.icon"
        :label="tab.name === activeTab ? tab.name : ''"
        :class="` text-${tab.color}`"
      />
    </q-tabs>
    <div
      class="q-mini-drawer-hide absolute"
      style="top: 25px; right: -17px; z-index: 4;"
    >
      <q-btn
        dense
        round
        unelevated
        color="accent"
        icon="mdi-chevron-left"
        @click="isMini = true"
      />
    </div>
    <div class="q-row q-mx-sm align-center q-mt-md">
      <!-- <h6 class="q-ma-none" :class="`text-${tabItems.color || 'primary'}`">
        {{ this.activeTab.toUpperCase() }}
      </h6> -->

      <q-tab-panels v-model="activeTab" animated>
        <q-tab-panel name="stopwatch">
          <stopwatch @saveLog="onSaveLog"></stopwatch>
        </q-tab-panel>
        <q-tab-panel name="timer">
          <timer :key="activeTab"></timer>
        </q-tab-panel>
        <q-tab-panel name="alarm">
          <q-card class="q-pa-md row justify-center">
            <q-btn color="primary" flat size="lg" class="text-bold col-9">
              <div class="row items-center no-wrap">
                <q-icon left name="mdi-alarm-plus" />
                <div class="text-center">ADD NEW</div>
              </div>
            </q-btn>
          </q-card>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <q-dialog v-model="modalActive" persistent>
      <q-card>
        <q-card-section>
          <component
            :is="modalComp"
            v-bind="modalData"
            ref="dialogComponent"
            @logAdded="onLogAdded"
          ></component>
        </q-card-section>

        <q-card-actions align="left">
          <q-btn flat label="CANCEL" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-drawer>
</template>

<script>
import addLog from 'components/logs/addLogQuick.vue'
import stopwatch from 'components/timers/stopwatch'
import timer from 'components/timers/timer'
export default {
  name: 'sideDrawerTimers',
  components: {
    addLog,
    stopwatch,
    timer
  },
  data: () => ({
    activeTab: 'stopwatch',
    isActive: true,
    isMini: false,
    modal: false,
    modalActive: false,
    modalComp: '',
    modalData: {},
    tabItems: [
      {
        color: 'teal',
        component: 'addLogQuick',
        icon: 'mdi-timer',
        name: 'stopwatch'
      },
      {
        color: 'purple',
        component: 'addLogQuick',
        icon: 'mdi-timer-sand',
        name: 'timer'
      },
      {
        color: 'orange',
        component: 'addLogQuick',
        icon: 'mdi-alarm-multiple',
        name: 'alarm'
      }
    ],
    transEnter: '',
    transLeave: ''
  }),
  computed: {
    atest() {
      return this.$refs.dialogComponent || null
    },
    darkMode() {
      return this.$store.state.mainStore.darkMode
    },
    width() {
      console.log(this.$q.screen.name)
      const sizes = {
        xs: 250, // adjust layout, tabs above logs
        sm: 250, // adjust layout, tabs above logs
        md: 450,
        lg: 500,
        xl: 500
      }
      return sizes[this.$q.screen.name] || 400
    }
  },
  methods: {
    drawerClick(e) {
      console.log(e)
      if (e) {
        this.activeTab = e
      }
      if (this.isMini) {
        this.isMini = false
      }
    },
    onLogAdded(e) {
      if (e) {
        this.modalActive = false
        this.$store.dispatch('notify', {
          message: 'Log Saved',
          type: 'positive'
        })
      }
      //emit success
    },
    onSaveLog({ startTime, endTime }) {
      this.modalActive = true
      this.modalComp = 'addLog'
      this.modalData = {
        isMinimal: true,
        optionsIn: { startTime, endTime }
      }
      console.log(startTime)
      console.log(endTime)
    }
  }
}
</script>

<style></style>
