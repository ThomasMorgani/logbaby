<template>
  <q-card class="logDetailsCard">
    <q-card-section v-if="!logSelected">
      <p>Select a log to view details.</p>
    </q-card-section>
    <q-card-section v-else>
      <q-list>
        <q-item :class="`bg-${details.color}`">
          <q-item-section avatar>
            <q-avatar size="xl" color="secondary" >

            <q-icon size="lg" :color="details.color" :name="details.icon" />
            </q-avatar>
          </q-item-section>
          <q-item-section side :class="`col-shrink text-h5 text-bold text-secondary`">{{details.category}}</q-item-section>
        </q-item>
        <q-item dense v-for="detail in detailsDisplayed" :key="detail">
          <q-item-section :class="`text-subtitle1 text-uppercase text-bold text-primary`">{{detail}}:</q-item-section>
          <q-item-section  class="text-weight-medium">{{details[detail]}}</q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState } from 'vuex'
import modules from '../../modules.js'
import { date } from 'quasar'
const { getDateDiff } = date
export default {
  computed: {
    ...mapState({
      logCategories: state => state.mainStore.logCategories,
      logSelected: state => state.mainStore.logSelected,
      theme: state => state.theme
    }),
    details () {
      let details = {}
      const cat = this.logCategories[this.logCategories.findIndex(el => el.id === this.logSelected.category)]
      console.log(getDateDiff(this.logSelected.startDate, this.logSelected.endDate))
      console.log(modules.dateDifferenceDisplayed(this.logSelected.startDate, this.logSelected.endDate))
      if (cat) {
        details = {
          category: cat.text || 'UNK',
          color: cat.color || 'primary',
          icon: cat.icon || 'mdi-baby',
          start: modules.dateFormatDisplayed(this.logSelected.startDate) || '-',
          end: modules.dateFormatDisplayed(this.logSelected.endDate) || '-',
          length: modules.dateDifferenceDisplayed(this.logSelected.startDate, this.logSelected.endDate) || '-',
          units: '-',
          note: '-',
          modified: '-'
        }
      }
      return details
    },
    detailsDisplayed () {
      return ['start', 'end', 'length', 'units', 'note', 'modified']
    }
  },
  created () {
  }
}
</script>

<style>
</style>
