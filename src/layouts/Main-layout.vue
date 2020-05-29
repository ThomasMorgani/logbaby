<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-avatar>
          <img src="~/assets/baby.png" />
        </q-avatar>
        <q-toolbar-title>
          LOGBABY
        </q-toolbar-title>

        <q-btn dense flat round icon="fas fa-bars" @click="drawer = !drawer" />
      </q-toolbar>

      <q-tabs align="left" inline-label>
        <q-route-tab to="/" label="DASHBOARD" icon="fas fa-tachometer-alt" />
        <q-route-tab to="/timer" label="TIMER" icon="fas fa-stopwatch" />
        <q-route-tab to="/logs" label="LOGS" icon="fas fa-clipboard-list" />
        <q-route-tab to="/reports" label="REPORTS" icon="fas fa-chart-line" />
      </q-tabs>
    </q-header>

    <q-drawer v-model="drawer" side="right" elevated class="column items-start">
      <sideDrawer></sideDrawer>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import sideDrawer from 'components/main/sideDrawer'
export default {
  components: {
    sideDrawer
  },
  data() {
    return {
      drawer: false
    }
  }
}
</script>
<style lang="stylus" scoped>
.navDrawerAvatar {
  position: relative;
  bottom: 40px;
  left: 35%;
}
</style>
