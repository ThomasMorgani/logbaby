<template>
  <div>
    <q-list bordered class="q-mb-lg text-h6 text-primary col-12">
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar circle :color="selectedItem.color">
            <q-icon :name="selectedItem.icon" color="white" />
          </q-avatar>
        </q-item-section>
        <q-item-section :class="`text-${selectedItem.color}`">{{selectedItem.text}}</q-item-section>
        <q-item-section side>
          <q-icon v-if="selectedItem.id === 1999" name="mdi-cursor-pointer" color="primary" />
        </q-item-section>
      </q-item>
      <q-menu transition-show="scale" fit auto-close transition-hide="scale">
        <q-list class="text-h6" style="min-width: 100px">
          <q-item
            v-for="(item, key) in itemsDisplayed"
            :key="key+'menuListAv'"
            clickable
            v-ripple
            @click="selectCategory(item)"
          >
            <q-item-section avatar>
              <q-avatar circle :color="item.color">
                <q-icon :name="item.icon" :color="'white'" />
              </q-avatar>
            </q-item-section>
            <q-item-section :class="`text-${item.color}`">{{item.text}}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-list>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: false,
      default: () => []
    },
    selectedItem: {
      type: Object,
      required: false,
      default: () => ({
        icon: 'mdi-checkbox-multiple-blank',
        text: 'SELECT CATEGORY',
        color: 'primary',
        id: 1999
      })
    }
  },
  computed: {
    itemsDisplayed () {
      let items = [...this.items]
      items.sort((a, b) => {
        if (a.text > b.text) {
          return 1
        } else if (a.text < b.text) {
          return -1
        } else {
          return 0
        }
      })
      console.log(items)
      return items
      // return this.items
    }
  },
  methods: {
    selectCategory (item) {
      console.log(item)
      this.$emit('selected', item)
    }
  }
}
</script>

<style>
</style>
