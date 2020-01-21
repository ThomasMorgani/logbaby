<template>
  <q-card hover class="q-pa-md row wrap justify-around  mainCard">
    <template v-for="(item, key) in items" class="col-3 q-pa-sm">
    <q-card  bordered class="column" :key="key+'item'">
      <q-card-section class="column align-center justify-center">
        <div :class="`text-h6 text-bold self-center no-wrap text-${item.color}`">{{item.text}}</div>
        <q-avatar size="100px" font-size="52px" :color="item.color" text-color="white" :icon="item.icon" class="self-center" />
      </q-card-section>
    </q-card>
    </template>
  </q-card>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    itemsDisplayed () {
      // formatting done here
      return this.items
    }
  }
}
</script>

<style scoped>
 .mainCard {
   width: 800px !important;
   max-width: 80vw !important;
 }

 .categoryCard {
   width: 900px;
 }
</style>
