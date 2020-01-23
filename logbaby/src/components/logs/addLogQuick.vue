<template>
  <q-card class="addLogCard">
    <div class="q-pa-md row justify-center">
      <q-card-section class="q-mb-lg q-pa-sm text-h5 text-white bg-primary col-12">QUICK LOG</q-card-section>
      <q-list bordered class="q-mb-lg text-h6 text-primary col-12">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar circle :color="selectedCategory.color">
              <q-icon :name="selectedCategory.icon" color="white" />
            </q-avatar>
          </q-item-section>
          <q-item-section :class="`text-${selectedCategory.color}`">{{selectedCategory.text}}</q-item-section>
          <q-item-section side>
            <q-icon name="mdi-arrow-up-drop-circle" color="primary" />
          </q-item-section>
        </q-item>
        <menuListAvatar :items="logCategories" @selected="selectedCategorySet"></menuListAvatar>
      </q-list>
      <q-input
        v-model="startDate"
        color="primary"
        label="Start"
        @change="setEndDate"
        class="col-6 q-pr-md"
      >
        <template v-slot:prepend>
          <q-icon name="fas fa-calendar" color="primary" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="startDate" mask="YYYY-MM-DD HH:mm" @input="setEndDate" />
            </q-popup-proxy>
          </q-icon>
        </template>

        <template v-slot:append>
          <q-icon name="fas fa-clock" color="primary" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="startDate" mask="YYYY-MM-DD hh:mm A" @input="setEndDate" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input v-model="endDate" color="primary" label="End" class="col-6 q-pl-md">
        <template v-slot:prepend>
          <q-icon name="fas fa-calendar" color="primary" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="endDate" mask="YYYY-MM-DD HH:mm" />
            </q-popup-proxy>
          </q-icon>
        </template>

        <template v-slot:append>
          <q-icon name="fas fa-clock" color="primary" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="endDate" mask="YYYY-MM-DD hh:mm A" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <div class="col-10 q-mt-lg">
        <q-btn
          color="primary"
          rounded
          :disabled="saveDisabled"
          :loading="saveLoading"
          icon="mdi-content-save"
          label="SUBMIT"
          @click="submitLog"
          class="text-bold full-width"
        >
          <template v-slot:loading>
            <q-spinner-facebook class="on-left" />SUBMITTING...
          </template>
        </q-btn>
      </div>
      <q-tooltip v-if="saveDisabled" content-class="bg-accent">{{saveDisabled}}</q-tooltip>
    </div>
    <q-dialog v-model="modalCategories" class="dialogCategories">
      <categoryList :items="logCategories"></categoryList>
    </q-dialog>
  </q-card>
</template>

<script>
import { date } from 'quasar'
import categoryList from 'components/main/modalSelectorTiles'
import menuListAvatar from 'components/main/menuListAvatar'
const { formatDate } = date
export default {
  components: {
    categoryList,
    menuListAvatar
  },
  props: {
    logCategories: {
      type: Array,
      required: false
    }
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
    submitLog () {
      console.log('submit log')
      this.saveLoading = true
      // TODO: set up api, move to store, promise
      this.$emit('saveLog', this.logData)
      setTimeout(() => {
        this.saveLoading = false
        this.reset()
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
