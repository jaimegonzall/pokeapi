<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import store from '@/store/index.js'

import { capitalize } from '@/utils/format'

import SpinnerCircle from '../components/SpinnerCircle.vue'

const route = useRoute()

onMounted(async () => {
  getPokemonItem(route.params.idOrName)
  console.log(route);
})

async function getPokemonItem (value) {
  await store.dispatch('getPokemonSearchById', {
    id: value
  })
}

const gettingPokemon = computed(() => {
  return store.getters.getPokemonItem
})
const gettingPokemonLoading = computed(() => {
  return store.getters.getPokemonItemLoading
})

</script>

<template>
<main>
  <div
    v-if="gettingPokemonLoading"
    class="detail-view"
  >
    <SpinnerCircle />
  </div>
  <div
    v-else
    class="detail-view"
  >
    <h1>Detail View</h1>
    <h1>{{ capitalize(`${gettingPokemon.name}`) }}</h1>
    <h6>Medidas:</h6>
    <p>Altura: {{ gettingPokemon.height }}</p>
    <p>Peso: {{ gettingPokemon.weight }}</p>
    <h6>Tipos:</h6>
    <ul v-for="(type, index) in gettingPokemon.types" :key="index">
      <li>{{type.type.name}}</li>
    </ul>
    <h6>Capacidades:</h6>
    <ul v-for="(stat, index) in gettingPokemon.stats" :key="index">
      <li>{{stat.stat.name}}: {{stat.base_stat}}</li>
    </ul>
    <!-- <pre>{{ gettingPokemon }}</pre> -->
  </div>
</main>
</template>

<style scoped lang="scss">

.detail-view {
    flex-basis: 1px;
    flex-grow: 1;
}

</style>
