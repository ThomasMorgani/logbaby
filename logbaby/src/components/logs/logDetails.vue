<template>
  <q-card class="logDetailsCard">
    <q-card-section v-if="!logSelected">
      <p>Select a log to view details.</p>
    </q-card-section>
    <q-card-section v-else>
      <q-list>
        <q-item>
          <q-item-section avatar>
            <q-icon size="lg" :color="details.color" :name="details.icon" />
          </q-item-section>
          <q-item-section :class="`text-h5 text-bold text-${details.color}`">{{details.category}}</q-item-section>
        </q-item>
        <q-item dense v-for="detail in detailsDisplayed" :key="detail">
          <q-item-section :class="`text-uppercase text-bold `">{{detail}}:</q-item-section>
          <q-item-section>{{details[detail]}}</q-item-section>
        </q-item>
      </q-list>
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
      if (cat) {
        details = {
          category: cat.text || 'UNK',
          color: cat.color || 'primary',
          icon: cat.icon || 'mdi-baby',
          start: this.logSelected.startDate || '',
          end: this.logSelected.endDate || '',
          length: '2hrs, 3min',
          amount: '12abc',
          note: 'Example notes',
          modified: ''
        }
      }
      return details
    },
    detailsDisplayed () {
      return ['start', 'end', 'length', 'units', 'note', 'modified']
    }
  }
}
</script>

<style>
</style>
