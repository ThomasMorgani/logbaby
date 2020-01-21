<template>
  <q-card class="logsList">
    <q-card-section class="row justify-end">
     <q-btn flat round color="primary" icon="mdi-filter"></q-btn>
     <q-btn flat round color="disabled" icon="mdi-playlist-edit"></q-btn>
    </q-card-section>
    <q-card-section  class="q-pt-none">
      <q-table
        :data="logsDisplayed"
        :columns="columns"
        row-key="id"
        flat
        virtual-scroll
        :pagination.sync="pagination"
        :rows-per-page-options="[0]"
        class="logsTable"
      >
        <template v-slot:body="props">
          <q-tr :props="props" :class="`bg-${categoriesById[props.row.category].color}`">
            <q-td key="category" :props="props" class="text-h5 text-bold">{{categoriesById[props.row.category].text}}</q-td>
            <q-td key="startDate" :props="props">{{dateFormat(props.row.startDate)}}</q-td>
            <q-td key="endDate" :props="props">{{dateFormat(props.row.endDate)}}</q-td>
            <q-td key="edit" :props="props"><q-icon size="md" name="mdi-playlist-edit" /></q-td>
          </q-tr>
         </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import { date } from 'quasar'
const { isValid, formatDate } = date
export default {
  name: 'logsList',
  props: {
    categories: {
      type: Array,
      required: true
    },
    logs: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data: () => ({
    pagination: {
      rowsPerPage: 0
    }
  }),
  computed: {
    categoriesById () {
      let categories = {}
      this.categories.forEach(cat => { categories[cat.id] = cat })
      return categories
    },
    columns () {
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
          align: 'center',
          field: row => row.startDate,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'endDate',
          required: true,
          label: 'End',
          align: 'center',
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
    logsDisplayed () {
      return this.logs
    }
  },
  methods: {
    dateFormat (date) {
      console.log(date)
      if (isValid(date)) {
        let now = new Date()
        let formatNow = formatDate(now, 'YYYY-MM-DD')
        // console.log(date)
        if (date.substring(0, 10) === formatNow.substring(0, 10)) {
          return `Today${date.substring(10, 19)}`
        } else if (Number(date.substring(8, 10)) === Number(formatNow.substring(8, 10) - 1)) {
          return `Yesterday${date.substring(10, 19)}`
        } else {
          return date
        }
      }
    }
  }
}
</script>

<style scoped>
.logsList {
  height: 100%;
  width: 100%;
}

</style>
