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
    <q-tabs
      v-model="activeTab"
      align="justify"
      :breakpoint="0"
      @input="onTabChange"
    >
      <q-tab
        v-for="tab in tabItems"
        :key="'tab' + tab.name"
        :name="tab.name"
        :icon="tab.icon"
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
        @click="minimize"
      />
    </div>
    <div class="q-row q-mx-sm align-center q-mt-md">
      <q-tab-panels v-model="activeTab" animated>
        <q-tab-panel name="add">
          <q-card class="q-pa-md row justify-center">
            <q-btn color="primary" flat size="lg" class="text-bold col-9">
              <div class="row items-center no-wrap">
                <q-icon left name="mdi-playlist-plus" />
                <div class="text-center">ADD NEW</div>
              </div>
            </q-btn>
          </q-card>
          <addLogQuick class="q-mt-md"></addLogQuick>
          <q-card class="q-pa-md q-mt-md row justify-center">
            <q-btn
              disabled
              color="primary"
              rounded
              size="md"
              class=" col-8 text-bold"
            >
              <div class="row items-center no-wrap">
                <q-icon left name="mdi-clock-outline" />
                <div class="text-center">ADD RECENT</div>
              </div>
            </q-btn>
          </q-card>
        </q-tab-panel>
        <q-tab-panel name="info">
          <logDetails></logDetails>
        </q-tab-panel>
        <q-tab-panel name="edit">
          <logEdit :key="'le' + activeTab"></logEdit>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-drawer>
</template>

<script>
import addLogQuick from 'components/logs/addLogQuick'
import logDetails from 'components/logs/logDetails'
import logEdit from 'components/logs/logEdit'

export default {
  name: 'sideDrawerLogs',
  components: {
    addLogQuick,
    logDetails,
    logEdit
  },
  data: () => ({
    activeTab: 'add',
    isActive: false,
    isMini: true,
    tabItems: [
      {
        color: 'teal',
        component: 'addLogQuick',
        icon: 'mdi-plus',
        name: 'add'
      },
      {
        color: 'purple',
        component: 'addLogQuick',
        icon: 'mdi-filter',
        name: 'filter'
      },
      {
        color: 'orange',
        component: 'addLogQuick',
        icon: 'mdi-information',
        name: 'info'
      },
      {
        color: 'blue',
        component: 'addLogQuick',
        icon: 'mdi-playlist-edit',
        name: 'edit'
      }
    ]
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
        this.setLocal('activeTab', e)
      }
      this.isMini = false
    },
    minimize() {
      this.isMini = true
      localStorage.removeItem('activeTab')
    },
    onTabChange(tab) {
      this.setLocal('activeTab', tab)
    },
    setLocal(key, val) {
      localStorage.setItem(key, val)
    }
  },
  mounted() {
    const activeTab = localStorage.getItem('activeTab')
    console.log(activeTab)

    if (activeTab) {
      this.activeTab = activeTab
      this.isMini = false
    }
  }
}
</script>

<style></style>
