<template>
  <q-card class="logEditcard">
    <q-card-section>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <menuListAvatar
          :items="logCategories"
          :selectedItem="selectedCategory || selectedCategoryDefault"
          @selected="selectedCategory = $event"
        ></menuListAvatar>
        <q-input v-model="startDate" label="Start" />
        <q-input v-model="endDate" label="End" />
        <q-input v-model="units" label="Units" />
        <q-input v-model="note" label="Note" />
        <div class="row justify-between no-wrap q-mt-xl">
          <q-btn label="Delete" type="submit" color="red" icon="mdi-trash-can" />
          <q-btn
            label="Save"
            type="submit"
            color="primary"
            class="align-end"
            icon="mdi-content-save"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState } from 'vuex'
import { date } from 'quasar'
import menuListAvatar from 'components/main/menuListAvatar'
const { formatDate } = date
export default {
  name: 'editLogCard',
  components: {
    menuListAvatar
  },
  data: () => ({
    endDate: null,
    note: null,
    saveLoading: false,
    selectedCategory: null,
    selectedCategoryDefault: {
      icon: 'mdi-checkbox-multiple-blank',
      text: 'SELECT CATEGORY',
      color: 'primary',
      id: 1999
    },
    startDate: null,
    units: null
  }),
  computed: {
    ...mapState({
      logCategories: state => state.mainStore.logCategories,
      logSelected: state => state.mainStore.logSelected
    }),
    datesValid () {
      let start = new Date(this.startDate)
      let end = new Date(this.endDate)
      return start <= end
    },
    logData () {
      return {
        category: this.selectedCategory.id || null,
        startDate: this.startDate || null,
        endDate: this.endDate || null
      }
    },
    saveDisabled () {
      if (this.selectedCategory.id === 1999) {
        return 'Select A category'
      }
      if (!this.datesValid) {
        return 'Dates Invalid'
      }
      return false
    }
  },
  methods: {
    onReset () {
      if (this.logSelected) {
        console.log('set to original log values: ', this.logSelected)
      } else {
        let timeStamp = Date.now()
        this.selectedCategory = this.selectedCategoryDefault
        this.startDate = formatDate(timeStamp, 'YYYY-MM-DD hh:mm A')
        this.endDate = formatDate(timeStamp, 'YYYY-MM-DD hh:mm A')
      }
    },
    onSubmit () {
      console.log('save')
    },
    setValues (logData) {
      const cat = this.logCategories[this.logCategories.findIndex(el => el.id === logData.category)]
      this.selectedCategory = cat || this.selectedCategoryDefault
      this.id = logData.id || null
      // startDate: "2020-01-28 06:20 AM"
      // endDate: "2020-01-28 06:20 AM"
    }
  },
  watch: {
    logSelected () {
      if (this.logSelected) {
        this.setValues(this.logSelected)
      }
    }
  },
  created () {
    this.onReset()
  }
}
</script>

<style>
</style>
