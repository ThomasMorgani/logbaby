<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="~/assets/undraw_baby.svg" />
          </q-avatar>LOGBABY
        </q-toolbar-title>

        <q-btn dense flat round icon="fas fa-bars" @click="right = !right" />
      </q-toolbar>

      <q-tabs align="left" inline-label>
        <q-route-tab to="/" label="DASHBOARD" icon="fas fa-tachometer-alt"/>
        <q-route-tab to="/timer" label="TIMER" icon="fas fa-stopwatch"/>
        <q-route-tab to="/logs" label="LOGS" icon="fas fa-clipboard-list"/>
        <q-route-tab to="/reports" label="REPORTS" icon="fas fa-chart-line"/>
      </q-tabs>
    </q-header>

    <q-drawer v-model="right" side="right" elevated class="column items-start">
     <q-card >

       <img height="150" src="https://cdn.quasar.dev/img/mountains.jpg">
              <q-avatar  size="100px" font-size="52px" color="white" class="navDrawerAvatar">
          <img class="q-pa-sm" src="~/assets/undraw_baby.svg" />
       </q-avatar>
       <q-card-section>
         <div class="text-h6">Avatar needs to be rounded..</div>
         <div class="text-subtitle2">smaller image, baby name, age (mths, days)above</div>
       </q-card-section>
       <q-card-section>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit
       </q-card-section>
     </q-card>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      right: false
    }
  }
}
</script>
<style lang="stylus" scoped>
.navDrawerAvatar{
  position: relative;
  bottom: 40px;
  left: 35%;
}
</style>
