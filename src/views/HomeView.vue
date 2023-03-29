<script setup>
import { onMounted, ref, computed } from 'vue'
import store from '@/store/index.js'
import { useRouter } from 'vue-router'
import { capitalize } from '@/utils/format'

import { CONSTANTS } from '@/plugins/constants.js'

const POKEMON_TYPES = CONSTANTS.TYPE

import CustomButton from '@/components/CustomButton.vue';
import MultiSelect from '@/components/MultiSelect.vue';
import DocumentFill from '@/components/icons/DocumentFill.vue'
import IconClip from '@/components/icons/IconClip.vue'

const router = useRouter()

const searchValue = ref('')

onMounted(async () => {
  getPokemonList()
})

async function getPokemonList () {
  await store.dispatch('getPokemonPaginatedList', {
    limit: 20,
    offset: 20
  })
  getBucleItemsDetail()
}

function getBucleItemsDetail () {
  for (let n of store.getters.getPokemonList.results) {
    getPokemonItem(n.name)
  }
}

async function getPokemonItem (value) {
  await store.dispatch('getPokemonFullDataList', {
    id: value
  })
}

function idNameSearch () {
  if (searchValue.value) {
    router.push(
      `/pokemon/${searchValue.value}`
    )
  }
}

async function typeSearch () {
  await store.dispatch('getPokemonListByType', {
    type: filterOptions.value.types
  })
  let x = 0
  const MAX_ITERATIONS = 10
  for (let n of store.getters.getPokemonList) {
    x++
    if(x < MAX_ITERATIONS) {
      getPokemonItem(n.pokemon.name)
    }
  }
}

function viewItemDetail (value) {
  router.push(
    `/pokemon/${value}`
  )
}

const gettingPokemonList = computed(() => {
  return store.getters.getPokemonFullDataList
})

const filterOptions = ref(
  {
    type: null
  }
)

function updateInput (event, fieldName) {
  // console.log('PARENT: (', fieldName, ')', event)
  filterOptions.value[fieldName] = event
}
</script>

<template>
  <div class="main-view">
    <div class="filter-area">
      <input
        v-model="searchValue"
        type="search"
        placeholder="Busca por id o nombre"
        @keyup.enter="idNameSearch"
      >
      <CustomButton
        label-text="Buscar"
        @click="idNameSearch"
      />
      <MultiSelect
        :label-text="'Busca por tipo'"
        id-for-anchor="types"
        :searchable="false"
        :multiselect="false"
        :options="POKEMON_TYPES"
        @item-selection="updateInput"
      />
      <CustomButton
        label-text="Buscar por tipo"
        @click="typeSearch"
      />
    </div>
    <table class="custom-table">
      <thead class="custom-table__header">
        <tr class="custom-table__header-row">
          <th class="custom-table__header-cell u-width-20"></th>
          <th class="custom-table__header-cell u-width-20"></th>
          <th class="custom-table__header-cell header-cell--sortable">#</th>
          <th class="custom-table__header-cell">name</th>
          <th class="custom-table__header-cell u-text-right">type</th>
        </tr>
      </thead>
      <tbody class="custom-table__body">
        <tr
          v-for="(item, index) in gettingPokemonList"
          :key="index"
        >
          <td class="u-cursor-pointer">
            <DocumentFill
              @click="viewItemDetail(item.id)"
            />
          </td>
          <td class="u-cursor-pointer">
            <Popper
              hover
              arrow
              open-delay="100"
              close-delay="0"
              :class="'popper-light'"
            >
              <IconClip/>
              <template #content>
                <img
                  :src="item.sprites?.other.home.front_default"
                  :alt="item.name"
                  width="150"
                >
              </template>
            </Popper>
          </td>
          <td>{{ item.id }}</td>
          <td>{{ capitalize(item.name) }}</td>
          <td>
            <ul class="pokemon-type-list">
              <li
                v-for="(type, indexX) in item.types"
                :key="indexX"
                :class="['pokemon-type-list__item', `type-${type.type.name}`]"
              >
                {{type.type.name}}
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <pre>::{{ gettingPokemonList }}</pre> -->
    <!-- <pre>{{ store.getters.getPokemonList }}</pre> -->
  </div>
</template>

<style scoped lang="scss">

@import '../assets/sass/settings/color-tokens';
@import '../assets/sass/settings/fonts';

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

.main-view {
  flex-basis: 1px;
  flex-grow: 1;
  height: fit-content;
  max-width: 800px;
}

.custom-table {
  position: relative;
  height: min-content;
  width: 100% !important;
  margin-bottom: 0;
  border-collapse: collapse;
  border-width: 0px !important;
  &__header-row {
    position: sticky;
    top: 0;
    z-index: 33;
  }
  &__header-cell {
    padding: 6px 10px;
    border: none;
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    color: $white;
    background: none;
    background-color: $color-primary;
    white-space: nowrap;
    cursor: default;
    &:hover {
      background-color: $color-primary-light-05;
    }
    &.header-cell--sortable {
      cursor: pointer;
    }
  }
  &__body tr {
    &:hover td {
      background-color: $grey-05;
    }
    td {
      height: 32px;
      padding: 0 10px;
      vertical-align: middle;
      font-size: $font-size-sm;
      font-weight: $font-weight-base;
    }
  }
}

.filter-area {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

</style>
