<template>
  <div>
    <table>
      <tr v-for="n in 27" :key="n">
        <td v-for="n in 18" :key="n">
          <cell-renderer v-if="n === 1" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import CellRenderer from '../components/CellRenderer.vue';

export default {
  components: { CellRenderer },
  async asyncData({ store, app }) {
    if (store.getters['items'].length) {
      return
    }
    await store.dispatch('fetchItems')
    const { greeting } = await app.$axios.$get('/api/')
    return { greeting }
  }
}
</script>

<style>
</style>
