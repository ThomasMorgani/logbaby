<template>
  <q-drawer
    v-model="isActive"
    show-if-above
    :mini="!isActive || isMini"
    :width="350"
    :breakpoint="500"
    bordered
    content-class="bg-grey-3"
  >
    <template v-slot:mini>
      <q-scroll-area class="fit mini-slot cursor-pointer">
        <div class="q-py-lg">
          <div class="column items-center">
            <q-btn
              v-for="icon in tabItems"
              :key="'nav'+icon.name"
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
    <q-tabs v-model="activeTab" dense align="justify" :breakpoint="0">
      <q-tab
        v-for="tab in tabItems"
        :key="'tab'+tab.name"
        :name="tab.name"
        :icon="tab.icon"
        :class="`bg-white text-${tab.color}`"
      />
    </q-tabs>
    <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
      <q-btn dense round unelevated color="accent" icon="mdi-chevron-left" @click="isMini = true" />
    </div>
    <div v-for="tabItem in tabItems" :key="tabItem.name+'row'" class="q-row">
      <template v-if="activeTab=== 'add'">
        <addLogQuick></addLogQuick>
      </template>
    </div>
  </q-drawer>
</template>

<script>
import addLogQuick from 'components/logs/addLogQuick'

export default {
  name: 'sideDrawerLogs',
  components: {
    addLogQuick
  },
  data: () => ({
    isActive: false,
    isMini: true,
    activeTab: null,
    tabItems: [
      {
        color: 'blue',
        component: 'addLogQuick',
        icon: 'mdi-plus',
        name: 'add'
      },
      {
        color: 'orange',
        component: 'addLogQuick',
        icon: 'mdi-filter',
        name: 'filter'
      },
      {
        color: 'purple',
        component: 'addLogQuick',
        icon: 'mdi-information',
        name: 'info'
      },
      {
        color: 'teal',
        component: 'addLogQuick',
        icon: 'mdi-playlist-edit',
        name: 'edit'
      }
    ]
  }),
  methods: {
    drawerClick (e) {
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

<style>
</style>
