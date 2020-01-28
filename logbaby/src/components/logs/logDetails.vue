<template>
  <q-card class="logDetailsCard">
    <q-card-section v-if="!logSelected">
      <p>Select a log to view details.</p>
    </q-card-section>
    <q-card-section v-else>
      <p v-for="detail in Object.keys(details)" :key="detail">{{detail}}:{{details[detail]}}</p>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      logCategories: state => state.mainStore.logCategories,
      logSelected: state => state.mainStore.logSelected
    }),
    details () {
      let details = {}
      const cat = this.logCategories[this.logCategories.findIndex(el => el.id === this.logSelected.category)]
      details = {
        category: cat.text || 'UNK',
        color: cat.color || 'primary',
        icon: cat.icon || 'mdi-baby',
        start: this.logSelected.startDate || '',
        end: this.logSelected.endDate || ''
      }
      return details
    }
  }
}
</script>

<style>
</style>
