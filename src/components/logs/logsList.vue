<template>
  <q-card class="logsList">
    <!-- <q-card-section class="row justify-between">
      <q-card flat class="filterCard col-9">
        <q-card-section class="q-pa-none">
          <q-select
            outlined
            v-model="filterCategories"
            multiple
            clearable
            clear-icon="mdi-close-circle-outline"
            :options="categories"
            label="Categories"
            stack-label
            color="primary"
            dense
            option-value="id"
            option-label="text"
            placeholder="SELECT"
            use-chips
            class
          >
            <template v-slot:selected v-if="filterCategories">
              <q-chip
                v-for="(selection, key) in filterCategories"
                :key="key+'selected'"
                dense
                :color="selection.color"
                text-color="white"
                class="q-my-none q-ml-xs q-mr-none"
                removable
                @remove="test(selection.id)"
              >
                <q-avatar color="white" :text-color="selection.color" :icon="selection.icon" />
                {{ selection.text }}
              </q-chip>
            </template>
          </q-select>
        </q-card-section>
        <q-card-section>HI</q-card-section>
      </q-card>

      <div class="row align-start justify-end col-3">
        <q-btn flat round color="primary" icon="mdi-filter"></q-btn>
        <q-btn flat round color="primary" icon="mdi-information"></q-btn>
        <q-btn flat round color="disabled" icon="mdi-playlist-edit"></q-btn>
      </div>
    </q-card-section>-->
    <q-card-section class="">
      <p v-if="!logsDisplayed">No Logs. ADD LOG MESSAGE...</p>
      <q-table
        v-else
        flat
        virtual-scroll
        hide-bottom
        label="Categories"
        stack-labels
        :data="logsDisplayed"
        :columns="columns"
        row-key="id"
        :pagination.sync="pagination"
        no-data-label="No Logs found. Add One!"
        table-style="max-height: 70vh"
        ref="logTable"
        class="logsTable"
      >
        <template v-slot:no-data="{ icon, message }">
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <span>{{ message }}</span>
            <q-icon size="2em" name="filter mdi-plus" />
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr
            :props="props"
            :class="
              `bg-${categoriesById[props.row.category].color} ${
                selected && selected.id === props.row.id ? 'selectedRow' : ''
              }`
            "
            @click="rowClick(props.row)"
          >
            <q-td
              key="category"
              :props="props"
              class="text-h5 text-bold"
              :style="
                selected && selected.id === props.row.id ? selectedRowStyle : ''
              "
            >
              <!-- <q-icon name="mdi-chevron-right" left size="sm" color="secondary" v-if="selected && selected.id === props.row.id"/> -->
              {{ categoriesById[props.row.category].text }}
            </q-td>
            <q-td
              key="startDate"
              :props="props"
              :style="
                selected && selected.id === props.row.id ? selectedRowStyle : ''
              "
              >{{ dateFormat(props.row.startDate) }}</q-td
            >
            <q-td
              key="endDate"
              :props="props"
              :style="
                selected && selected.id === props.row.id ? selectedRowStyle : ''
              "
              >{{ dateFormat(props.row.endDate) }}</q-td
            >
            <q-td
              key="edit"
              :props="props"
              :style="
                selected && selected.id === props.row.id ? selectedRowStyle : ''
              "
            >
              <q-icon size="xs" name="mdi-playlist-edit" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState } from 'vuex'
import modules from '../../modules.js'
import { colors } from 'quasar'
const { getBrand } = colors
export default {
  name: 'logsList',
  data: () => ({
    filterCategories: null,
    pagination: {
      rowsPerPage: 0,
      sortBy: 'startDate',
      descending: true
    }
  }),
  computed: {
    ...mapState({
      categories: state => state.mainStore.logCategories,
      logs: state => state.mainStore.logs,
      selected: state => state.mainStore.logSelected
    }),
    categoriesById() {
      let categories = {}
      this.categories.forEach(cat => {
        categories[cat.id] = cat
      })
      return categories
    },
    columns() {
      return [
        {
          name: 'category',
          required: true,
          label: 'Category',
          align: 'left',
          field: row => this.categoriesById[row.category].text,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'startDate',
          required: true,
          label: 'Start',
          align: 'left',
          field: row => row.startDate,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'endDate',
          required: true,
          label: 'End',
          align: 'left ',
          field: row => row.endDate,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'edit',
          required: true,
          label: '',
          align: 'right',
          sortable: false
        }
      ]
    },
    logsDisplayed() {
      return this.logs
    },
    selectedRowStyle() {
      return {
        'border-top-width': '8px',
        'border-bottom-width': '8px',
        'border-color': getBrand('accent'),
        'border-style': 'solid'
      }
    }
  },
  methods: {
    test(e) {
      console.log(e)
      console.log(this.filterCategories.findIndex(el => el.id === e))
      console.log(this.filterCategories)
      if (this.filterCategories.length - 1 < 1) {
        this.filterCategories = null
      } else {
        this.$delete(
          this.filterCategories,
          this.filterCategories.findIndex(el => el.id === e)
        )
      }
    },
    dateFormat(date) {
      return modules.dateFormatDisplayed(date)
    },
    rowClick(row) {
      console.log(row)
      this.$store.dispatch('logSelect', row)
    }
  },
  mounted() {
    setTimeout(() => {
      console.log(this.$refs)
    }, 2000)
  },
  watch: {
    logs() {
      // console.log(this.$refs.logTable)
      this.$refs.logTable.$refs.virtScroll.scrollTo(0)
    }
  }
}
</script>

<style scoped>
/* .logsList {
  height: 100%;
  width: 100%;
} */
/* .logsTable {
  height: 60vh;
} */
</style>
<style lang="sass" scoped>
.q-dark

.logsTable
  /* max height is important */
  .q-table__middle
    /*max-height: 60vh*/

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
