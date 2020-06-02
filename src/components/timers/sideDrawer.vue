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
          <stopwatch :key="activeTab"></stopwatch>
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
  </q-drawer>
</template>

<script>
import stopwatch from 'components/timers/stopwatch'
import timer from 'components/timers/timer'
export default {
  name: 'sideDrawerLogs',
  components: {
    stopwatch,
    timer
  },
  data: () => ({
    isActive: true,
    isMini: false,
    activeTab: 'stopwatch',
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
    }
  }
}
</script>

<style></style>
