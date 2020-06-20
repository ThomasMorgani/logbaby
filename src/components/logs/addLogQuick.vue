<template>
  <q-card class="addLogCard q-px-md q-py-lg row justify-start items-end">
    <!-- <q-card-section class="q-mb-lg q-pa-sm text-h5 text-white bg-primary col-12">QUICK LOG</q-card-section> -->
    <menuListAvatar
      :items="logCategories"
      :selectedItem="selectedCategory"
      @selected="selectedCategorySet"
      class="col-12"
    ></menuListAvatar>
    <div class="col-5 ">
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
              <q-date v-model="startDate" mask="MM-DD-YYYY" @input="setEndDate">
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
      </q-input>
    </div>
    <div class="col-5 column align-between">
      <q-input v-model="startTime" color="primary" class="q-pl-md" dense>
        <template v-slot:prepend>
          <q-icon
            name="fas fa-clock"
            size="xs"
            color="primary"
            class="cursor-pointer"
          >
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="startTime" mask="hh:mm A" @input="setEndDate">
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
    </div>
    <div class="col-2">
      <q-btn
        flat
        size="small"
        color="primary"
        icon="mdi-calendar-export"
        @click="setNow('start')"
        class="self-start q-mt-none q-ml-md"
      />
    </div>
    <div class="col-5  q-mt-md">
      <q-input
        v-model="endDate"
        color="primary"
        label="End"
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
              v-model="modalEndDate"
            >
              <q-date v-model="endDate" mask="MM-DD-YYYY">
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
      </q-input>
    </div>
    <div class="col-5 column align-between">
      <q-input v-model="endTime" color="primary" class="q-pl-md" dense>
        <template v-slot:prepend>
          <q-icon
            name="fas fa-clock"
            size="xs"
            color="primary"
            class="cursor-pointer"
          >
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="endTime" mask="hh:mm A">
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
      <!-- <q-popup-proxy transition-show="scale" transition-hide="scale">
        <q-time v-model="endTime" mask="hh:mm A">
          <template v-slot:default>
            <q-btn flat color="primary" class="float-right" v-close-popup
              >OK</q-btn
            >
          </template>
        </q-time>
      </q-popup-proxy> -->
    </div>
    <div class="col-1 align-right">
      <q-btn
        flat
        size="small"
        color="primary"
        icon="mdi-calendar-export"
        @click="setNow('end')"
        class="self-start q-mt-none q-ml-md"
      />
    </div>
    <!-- <div class="col-8 align-center" v-if="!isMinimal"> -->
    <div class="col-12 align-center">
      <q-btn
        :color="saveDisabled ? 'grey' : 'primary'"
        flat
        :disabled="saveDisabled"
        :loading="saveLoading"
        :icon="isMinimal ? 'mdi-content-save' : 'mdi-plus-circle-outline'"
        size="md"
        :label="isMinimal ? 'ADD LOG' : 'ADD QUICK'"
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
    endTime: null,
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
    startDate: null,
    startTime: null
  }),
  computed: {
    ...mapState({
      logCategories: state => state.mainStore.logCategories
    }),
    datesValid() {
      // console.log(modules.qDateToTimestamp(this.startDate))
      // let start = new Date(modules.qDateToTimestamp(this.startDate))
      const end = date.extractDate(
        this.endDate + ' ' + this.endTime,
        'MM-DD-YYYY hh:mm A'
      )
      const start = date.extractDate(
        this.startDate + ' ' + this.startTime,
        'MM-DD-YYYY hh:mm A'
      )
      return start <= end
    },
    dtMaskEndDate() {
      const now = new Date()
      const tsYear = this.endDate.substring(6, 10)
      const nowYear = now.getFullYear()
      const mask = tsYear == nowYear ? 'MM-DD hh:mm A' : 'MM-DD-YYYY hh:mm A'
      return mask
    },
    dtMaskStartDate() {
      const now = new Date()
      const tsYear = this.endDate.substring(6, 10)
      const nowYear = now.getFullYear()
      const mask = tsYear == nowYear ? 'MM-DD hh:mm A' : 'MM-DD-YYYY hh:mm A'
      return mask
    },
    logData() {
      const start =
        this.startDate && this.startTime
          ? `${this.startDate} ${this.startTime}`
          : null
      const end =
        this.endDate && this.endTime ? `${this.endDate} ${this.endTime}` : null
      return {
        category: this.selectedCategory.id || null,
        startDate: start || null,
        endDate: end || null
      }
    },
    saveDisabled() {
      if (this.selectedCategory.id === 1999) {
        return 'Select A category'
      }
      if (!this.datesValid) {
        return 'Start time must come before end'
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
      const now = new Date()
      if (target === 'start' || target === 'end') {
        this[`${target}Date`] = formatDate(now, 'MM-DD-YYYY')
        this[`${target}Time`] = formatDate(now, 'hh:mm A')
      } else {
        return
      }
    },
    submitLog() {
      console.log('submit log')
      console.log(this.logData)
      this.saveLoading = true
      // TODO: set up api, move to store, promise
      setTimeout(() => {
        this.$store
          .dispatch('logAdd', this.logData)
          .then(resp => {
            console.log(resp)
            this.saveLoading = false
            // this.reset()
            if (resp.status === 'success') {
              this.selectedCategory = this.selectedCategoryDefault
              this.$emit('logAdded', resp.data)
            }
          })
          .catch(err => console.log(err))
      }, 1500)
    },
    reset() {
      const now = Date.now()
      this.selectedCategory = this.selectedCategoryDefault
      this.startDate = formatDate(now, 'MM-DD-YYYY')
      this.startTime = formatDate(now, 'hh:mm A')
      this.endDate = formatDate(now, 'MM-DD-YYYY')
      this.endTime = formatDate(now, 'hh:mm A')
    }
  },
  created() {
    // if (this.isMinimal) {

    // }
    this.reset()
    if (this.optionsIn) {
      Object.keys(this.optionsIn).forEach(opt =>
        this[opt] !== undefined ? (this[opt] = this.optionsIn[opt]) : null
      )
    }
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
