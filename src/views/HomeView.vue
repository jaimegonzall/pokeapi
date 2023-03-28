<script setup>
import { onMounted, ref } from 'vue'
import store from '@/store/index.js'
// import TheWelcome from '../components/TheWelcome.vue'

import { capitalize } from '@/utils/format'

const firstLoad = ref(true)

onMounted(async () => {
  getPokemonList()
  getPokemonItem()
})

async function getPokemonList () {
  await store.dispatch('getPokemonPaginatedList', {
    limit: 20,
    offset: 20,
  })
  firstLoad.value = false
}

async function getPokemonItem () {
  await store.dispatch('getPokemonSearchById', {
    id: 133
  })
  firstLoad.value = false
}

</script>

<template>
  <main>
    <h1>Página principal</h1>
    <h4>{{ capitalize(`${store.getters.getPokemonItem.name}`) }}</h4>
    <pre>{{ store.getters.getPokemonItem }}</pre>
    <pre>{{ store.getters.getPokemonList }}</pre>
  </main>
</template>
