<template>
  <q-card class="addLogCard q-px-md q-py-lg row justify-center">
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
          <q-icon
            name="fas fa-calendar"
            size="xs"
            color="primary"
            class="cursor-pointer"
          >
            <q-popup-proxy
              transition-show="scale"
              transition-hide="scale"
              v-model="modalStartDate"
            >
              <q-date
                v-model="startDate"
                mask="MM-DD-YYYY hh:mm A"
                @input="setEndDate"
              >
                <template v-slot:default>
                  <q-btn
                    flat
                    small
                    color="primary"
                    class="float-right"
                    v-close-popup
                    >OK</q-btn
                  >
                </template>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
        <template v-slot:append>
          <q-icon
            name="fas fa-clock"
            size="xs"
            color="primary"
            class="cursor-pointer"
          >
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time
                v-model="startDate"
                mask="MM-DD-YYYY hh:mm A"
                @input="setEndDate"
              >
                <template v-slot:default>
                  <q-btn flat color="primary" class="float-right" v-close-popup
                    >OK</q-btn
                  >
                </template>
              </q-time>
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
      <q-input
        v-model="endDate"
        color="primary"
        label="End"
        class="q-pl-md"
        dense
      >
        <template v-slot:prepend>
          <q-icon
            name="fas fa-calendar"
            size="xs"
            color="primary"
            class="cursor-pointer"
          >
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="endDate" mask="MM-DD-YYYY hh:mm A">
                <template v-slot:default>
                  <q-btn
                    flat
                    small
                    color="primary"
                    class="float-right"
                    v-close-popup
                    >OK</q-btn
                  >
                </template>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>

        <template v-slot:append>
          <q-icon
            name="fas fa-clock"
            size="xs"
            color="primary"
            class="cursor-pointer"
          >
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="endDate" mask="MM-DD-YYYY hh:mm A">
                <template v-slot:default>
                  <q-btn
                    flat
                    small
                    color="primary"
                    class="float-right"
                    v-close-popup
                    >OK</q-btn
                  >
                </template>
              </q-time>
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
        class="self-start q-mt-none q-ml-md"
      />
    </div>
    <div class="col-8 align-center">
      <q-btn
        :color="saveDisabled ? 'grey' : 'primary'"
        flat
        :disabled="saveDisabled"
        :loading="saveLoading"
        icon="mdi-plus-circle-outline"
        size="md"
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
        >{{ saveDisabled }}</q-tooltip
      >
    </div>

    <q-dialog v-model="modalCategories" class="dialogCategories">
      <categoryList :items="logCategories"></categoryList>
    </q-dialog>
  </q-card>
</template>

<script>
import { mapState } from 'vuex'
import { date } from 'quasar'
// import modules from '../../modules.js'
import categoryList from 'components/main/modalSelectorTiles'
import menuListAvatar from 'components/main/menuListAvatar'
const { formatDate } = date
export default {
  components: {
    categoryList,
    menuListAvatar
  },
  props: {
    isMinimal: {
      type: Boolean,
      default: () => false
    },
    optionsIn: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    endDate: null,
    modalCategories: false,
    modalStartTime: false,
    modalEndDate: false,
    modalEndTime: false,
    modalStartDate: false,
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
    datesValid() {
      // console.log(modules.qDateToTimestamp(this.startDate))
      // let start = new Date(modules.qDateToTimestamp(this.startDate))
      const end = date.extractDate(this.endDate, 'MM-DD-YYYY hh:mm A')
      const start = date.extractDate(this.startDate, 'MM-DD-YYYY hh:mm A')
      return start <= end
    },
    logData() {
      return {
        category: this.selectedCategory.id || null,
        startDate: this.startDate || null,
        endDate: this.endDate || null
      }
    },
    saveDisabled() {
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
    selectCategory() {
      this.modalCategories = true
    },
    selectedCategorySet(item) {
      this.selectedCategory = item
    },
    setEndDate() {
      if (!this.endDate) {
        this.endDate = this.startDate
      }
    },
    setNow(target) {
      if (this[target]) {
        let timeStamp = Date.now()
        this[target] = formatDate(timeStamp, 'MM-DD-YYYY hh:mm A')
      }
    },
    submitLog() {
      console.log('submit log')
      this.saveLoading = true
      // TODO: set up api, move to store, promise
      setTimeout(() => {
        this.$store
          .dispatch('logAdd', this.logData)
          .then(() => {
            this.saveLoading = false
            // this.reset()
            this.selectedCategory = this.selectedCategoryDefault
          })
          .catch(err => console.log(err))
      }, 1500)
    },
    reset() {
      let timeStamp = Date.now()
      this.selectedCategory = this.selectedCategoryDefault
      this.startDate = formatDate(timeStamp, 'MM-DD-YYYY hh:mm A')
      this.endDate = formatDate(timeStamp, 'MM-DD-YYYY hh:mm A')
    }
  },
  created() {
    // if (this.isMinimal) {

    // }
    if (this.optionsIn) {
      Object.keys(this.optionsIn).forEach(opt =>
        this[opt] !== undefined ? (this[opt] = this.optionsIn[opt]) : null
      )
    }
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
