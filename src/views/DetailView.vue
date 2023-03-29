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
<div>
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
    <div class="detail-view__data">
      <div class="detail-view__data-header">
        <h2>
          <span class="detail-view__data-header__id">#{{ gettingPokemon.id }}</span> {{ capitalize(`${gettingPokemon.name}`) }}
        </h2>
        <ul class="pokemon-type-list">
          <li
            v-for="(type, index) in gettingPokemon.types"
            :key="index"
            :class="['pokemon-type-list__item', `type-${type.type.name}`]"
          >
            {{type.type.name}}
          </li>
        </ul>
      </div>
      <div class="detail-view__body">
        <p>Altura: {{ gettingPokemon.height }}</p>
        <p>Peso: {{ gettingPokemon.weight }}</p>
        <ul class="pokemon-stat-list">
          <li
            v-for="(stat, index) in gettingPokemon.stats" :key="index"
            class="pokemon-stat-list__item"
          >
            <div class="pokemon-stat-list__area">{{stat.stat.name}}</div>
            <div class="pokemon-stat-list__area">{{stat.base_stat}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="detail-view__image">
      <img
        :src="gettingPokemon.sprites?.other.home.front_default"
        alt="gettingPokemon.name"
      >
    </div>
    <!-- <pre>{{gettingPokemon}}</pre> -->
  </div>
  </div>
</template>

<style scoped lang="scss">

@import '../assets/sass/settings/color-tokens';
@import '../assets/sass/settings/fonts';

.detail-view {
  flex-basis: 1px;
  flex-grow: 1;
  height: fit-content;
  max-width: 800px;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
  display: grid;
  grid-template-columns: 50% 50%;
  &__data {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &__id {
        color: $grey-30;
        font-size: $font-size-base;
      }
    }
  }
  &__image {
    text-align: center;
    padding: 16px;
    & img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}

.pokemon-type-list {
  list-style: none;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin: 0;
  padding: 0;
  &__item {
    display: inline-block;
    padding: 0px 8px;
    border-radius: 4px;
  }
}

.pokemon-stat-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 0;
  list-style: none;
  &__item {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 4px;
    border-radius: 4px;
  }
  &__area {
    padding: 4px 8px;
    background-color: $grey-10;
    &:nth-child(2) {
      text-align: right;
    }
  }
}

</style>
