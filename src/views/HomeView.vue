<script setup>
import { onMounted, computed } from 'vue'
import store from '@/store/index.js'

// import { capitalize } from '@/utils/format'

onMounted(async () => {
  getPokemonList()
})

async function getPokemonList () {
  await store.dispatch('getPokemonPaginatedList', {
    limit: 20,
    offset: 20,
  })
}

function getBucle () {
  for (let n of store.getters.getPokemonList.results) {
      console.log(n.name);
      getPokemonItem(n.name)
  }
}

async function getPokemonItem (value) {
  await store.dispatch('getPokemonFullDataList', {
    id: value
  })
}

const gettingPokemonList = computed(() => {
  return store.getters.getPokemonFullDataList
})
</script>

<template>
  <div class="main-view">
    <button @click="getBucle">Bucle</button>
    <table class="custom-table">
      <thead class="custom-table__header">
        <tr class="custom-table__header-row">
          <th class="custom-table__header-cell">#</th>
          <th class="custom-table__header-cell">name</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in gettingPokemonList"
          :key="index"
        >
          <td>::{{ item.id }}</td>
          <td>::{{ item.name }}</td>
        </tr>
      </tbody>
    </table>
    <!-- <pre>::{{ gettingPokemonList }}</pre> -->
    <!-- <pre>{{ store.getters.getPokemonList }}</pre> -->
  </div>
</template>

<style scoped lang="scss">
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
  --bs-table-striped-bg: #F2F2F2;
  --bs-table-hover-bg: rgba(255, 178, 0, 0.1);
  border-width: 0px !important;
  & thead tr {
    position: sticky;
    top: 0;
    z-index: 33;
  }
  & thead tr .table__header {
    background: none;
    background-color: var(--main-color);
    color: var(--white);
    border: none;
    font-weight: 400;
    font-size: 14px;
    padding: 6px 10px;
    white-space: nowrap;
    cursor: default;
    border-bottom-width: 0;
    border-top-width: 0;
    border-right: 0px solid var(--main-color);
    border-left: 0px solid var(--main-color);
    &:hover {
      border-color: #ffc643;
      box-shadow: inset 2px 0 0 #ffc643;
    }
    &--sortable {
      cursor: pointer;
    }
    &__content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select: none;
      & .arrows-container {
        position: relative;
        & .order-arrow {
          opacity: 0;
          position: absolute;
          right: 0;
          top: -5px;
        }
        & .order-arrow--active {
          opacity: 1;
        }
      }
    }
    // &:hover {
    //   background-color: --bs-btn-hover-bg;
    // }
  }
  & tbody tr td {
    height: 32px;
    padding: 0 10px;
    vertical-align: middle;
    font-weight: 400;
    font-size: 14px;
    border-bottom-width: 1 !important;
    border-bottom-color: var(--grey-02);
    border-top-width: 0 !important;
    & > span.u-no-wrap {
      white-space: nowrap;
    }
    & > span.u-truncate {
      // white-space: nowrap;
      // overflow: hidden;
      // text-overflow: ellipsis
      width: 100%;
      position: relative;
      top: 3px;
      display: inline-block;
      &.u-truncate-chip {
        width: calc(100% - 50px);
      }
    }
  }
  & tbody {
    tr {
      &:hover {
        background-color: rgba(255, 178, 0, 0.1);
        & td.ghost-column {
          & > * {
            opacity: 1;
          }
        }
      }
      &.selected-row {
        background: rgba(255, 178, 0, 0.4);
      }
      // pendiente de arreglar la reactividad, falla porque no se recarga la tabla al procesar el switch
      // &.disabled-row {
      //   background:  var(--grey-15);
      //   &.selected-row {
      //     background:  var(--grey-05);
      //   }
      //   &:hover {
      //     background:  var(--grey-05 );
      //   }
      // }
      & td.ghost-column {
        & > * {
          opacity: 0;
        }
      }
    }
  }
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
