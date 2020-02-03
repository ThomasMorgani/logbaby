<template>
  <q-card class="addLogCard q-px-md q-py-lg row">
    <!-- <q-card-section class="q-mb-lg q-pa-sm text-h5 text-white bg-primary col-12">QUICK LOG</q-card-section> -->
    <menuListAvatar
      :items="logCategories"
      :selectedItem="selectedCategory"
      @selected="selectedCategorySet"
      class="col-12"
    ></menuListAvatar>
    <div class="col-6 column">
      <q-input
        v-model="startDate"
        color="primary"
        label="Start"
        @change="setEndDate"
        class="q-pr-md"
        dense
      >
        <template v-slot:prepend>
          <q-icon name="fas fa-calendar" size="xs" color="primary" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="startDate" mask="YYYY-MM-DD HH:mm A" @input="setEndDate" />
            </q-popup-proxy>
          </q-icon>
        </template>
        <template v-slot:append>
          <q-icon name="fas fa-clock" size="xs" color="primary" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="startDate" mask="YYYY-MM-DD hh:mm A" @input="setEndDate" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-btn
        flat
        size="small"
        color="primary"
        label="SET TO NOW"
        @click="setNow('startDate')"
        class="self-start q-mt-none"
      />
    </div>
    <div class="col-6 column align-between">
      <q-input v-model="endDate" color="primary" label="End" class="q-pl-md" dense>
        <template v-slot:prepend>
          <q-icon name="fas fa-calendar" size="xs" color="primary" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="endDate" mask="YYYY-MM-DD HH:mm A" />
            </q-popup-proxy>
          </q-icon>
        </template>

        <template v-slot:append>
          <q-icon name="fas fa-clock" size="xs" color="primary" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="endDate" mask="YYYY-MM-DD hh:mm A" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-btn
        flat
        size="small"
        color="primary"
        label="SET TO NOW"
        @click="setNow('endDate')"
        class="self-start q-mt-none q-pl-md"
      />
    </div>
    <div class="col-12">
      <q-btn
        color="primary"
        rounded
        :disabled="saveDisabled"
        :loading="saveLoading"
        icon="mdi-plus-circle-outline"
        label="ADD QUICK"
        @click="submitLog"
        class="text-bold full-width q-mt-lg"
      >
        <template v-slot:loading>
          <q-spinner-facebook class="on-left" />SUBMITTING...
        </template>
      </q-btn>
      <q-tooltip
        anchor="top middle"
        self="bottom middle"
        :offset="[-15, -15]"
        v-if="saveDisabled"
        content-class="bg-accent"
      >{{saveDisabled}}</q-tooltip>
    </div>

    <q-dialog v-model="modalCategories" class="dialogCategories">
      <categoryList :items="logCategories"></categoryList>
    </q-dialog>
  </q-card>
</template>

<script>
import { mapState } from 'vuex'
import { date } from 'quasar'
import categoryList from 'components/main/modalSelectorTiles'
import menuListAvatar from 'components/main/menuListAvatar'
const { formatDate } = date
export default {
  components: {
    categoryList,
    menuListAvatar
  },
  data: () => ({
    endDate: null,
    modalCategories: false,
    saveLoading: false,
    selectedCategory: null,
    selectedCategoryDefault: {
      icon: 'mdi-checkbox-multiple-blank',
      text: 'SELECT CATEGORY',
      color: 'primary',
      id: 1999
    },
    startDate: null
  }),
  computed: {
    ...mapState({
      logCategories: state => state.mainStore.logCategories
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
    selectCategory () {
      this.modalCategories = true
    },
    selectedCategorySet (item) {
      this.selectedCategory = item
    },
    setEndDate () {
      if (!this.endDate) {
        this.endDate = this.startDate
      }
    },
    setNow (target) {
      if (this[target]) {
        let timeStamp = Date.now()
        this[target] = formatDate(timeStamp, 'YYYY-MM-DD hh:mm A')
      }
    },
    submitLog () {
      console.log('submit log')
      this.saveLoading = true
      // TODO: set up api, move to store, promise
      setTimeout(() => {
        this.$store.dispatch('logAdd', this.logData).then(() => {
          this.saveLoading = false
          // this.reset()
          this.selectedCategory = this.selectedCategoryDefault
        }).catch(err => console.log(err))
      }, 1500)
    },
    reset () {
      let timeStamp = Date.now()
      this.selectedCategory = this.selectedCategoryDefault
      this.startDate = formatDate(timeStamp, 'YYYY-MM-DD hh:mm A')
      this.endDate = formatDate(timeStamp, 'YYYY-MM-DD hh:mm A')
    }
  },
  created () {
    this.reset()
  }
}
</script>

<style lang="scss" scoped>
.addLogCard {
  max-width: 600px;
}
.dialogCategories {
  width: 50vw;
}
</style>
