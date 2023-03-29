<script setup>
import { onMounted, ref, computed } from 'vue'
import store from '@/store/index.js'
import { useRouter } from 'vue-router'
import { capitalize } from '@/utils/format'

import CustomButton from '../components/CustomButton.vue';
import DocumentFill from '../components/icons/DocumentFill.vue'

const router = useRouter()

const searchValue = ref('')

onMounted(async () => {
  getPokemonList()
})

async function getPokemonList () {
  await store.dispatch('getPokemonPaginatedList', {
    limit: 20,
    offset: 20,
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
  console.log('idNameSearch:', searchValue.value);
  if (searchValue.value) {
    router.push(
      `/pokemon/${searchValue.value}`
    )
  }
}

function viewItemDetail (value) {
  console.log('selectRow:', value);
  router.push(
    `/pokemon/${value}`
  )
}

const gettingPokemonList = computed(() => {
  return store.getters.getPokemonFullDataList
})
</script>

<template>
  <div class="main-view">
    <!-- <button @click="getBucle">Bucle</button> -->
    <input
      v-model="searchValue"
      type="search"
      placeholder="Busca por id o nombre"
    >
    <CustomButton
      label-text="Buscar"
      @click="idNameSearch"
    />
    <table class="custom-table">
      <thead class="custom-table__header">
        <tr class="custom-table__header-row">
          <th class="custom-table__header-cell u-width-25"></th>
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
    // border-bottom-width: 0;
    // border-top-width: 0;
    // border-right: 0px solid $color-primary;
    // border-left: 0px solid $color-primary;
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
  // & tbody {
  //   tr {
  //     &:hover {
  //       background-color: rgba(255, 178, 0, 0.1);
  //     }
  //   }
  // }
  & .table-spinner-container {
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: #ffffffba;
    pointer-events: none;
  }
}

</style>
