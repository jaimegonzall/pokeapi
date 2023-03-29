import { createStore } from 'vuex'
import api from '@/service/api.service.js'

export default createStore({
  state: {
    pokemonsPageOptions: {
      limit: 10,
      offset: 10
      // page: 0,
      // sort: 'id,asc'
    },
    pokemonFilterOptions: {},
    pokemonList: [],
    pokemonListLoading: false,
    pokemonListError: false,
    pokemonFullDataList: [],
    pokemonFullDataListLoading: false,
    pokemonFullDataListError: false,
    pokemonItem: {},
    pokemonItemLoading: false,
    pokemonItemError: false
  },
  mutations: {
    resetPokemonList (state) {
      state.pokemonList = []
    },
    setPokemonList (state, pokemons) {
      state.pokemonList = pokemons
    },
    setPokemonItem (state, item) {
      state.pokemonItem = item
    },
    setPokemonItemList (state, item) {
      state.pokemonFullDataList.push(item)
    },
    resetPokemonItemList (state) {
      state.pokemonFullDataList = []
    }
  },
  getters: {
    getPokemonList (state) {
      return state.pokemonList
    },
    getPokemonFullDataList (state) {
      return state.pokemonFullDataList
    },
    getPokemonItem (state) {
      return state.pokemonItem
    },
    getPokemonItemLoading (state) {
      return state.pokemonItemLoading
    },
    getPokemonItemError (state) {
      return state.pokemonItemError
    }
  },
  actions: {
    async getPokemonPaginatedList ({commit}, params = this.state.pokemonsPageOptions) {
      this.state.pokemonListLoading = true
      this.state.pokemonListError = false
      await api.getPokemonList({ params })
      .then(res => res.json())
      .then(data => {
        commit('setPokemonList', data)
      })
      .catch((error) => {
        console.log('ERROR catch', error)
          this.state.pokemonListError = true
      })
      this.state.pokemonListLoading = false
    },
    async getPokemonListByType ({commit}, params) {
      commit('resetPokemonList')
      commit('resetPokemonItemList')
      await api.getPokemonListByType({ params })
        .then(res => res.json())
        .then(data => {
          commit('setPokemonList', data.pokemon)
        })
        .catch((error) => {
          console.log('ERROR catch', error)
        })
    },
    async getPokemonFullDataList ({commit}, params) {
      this.state.pokemonItemLoading = true
      this.state.pokemonItemError = false
      await api.getPokemonFindById({ params })
        .then(res => res.json())
        .then(data => {
          commit('setPokemonItemList', data)
        })
        .catch((error) => {
          console.log('ERROR catch', error)
          this.state.pokemonItemError = true
        })
      this.state.pokemonItemLoading = false
    },
    async getPokemonSearchById ({commit}, params) {
      this.state.pokemonItemLoading = true
      this.state.pokemonItemError = false
      await api.getPokemonFindById({ params })
        .then(res => res.json())
        .then(data => {
          // console.info('STORE ITEM', data)
          commit('setPokemonItem', data)
        })
        .catch((error) => {
          console.log('ERROR catch', error)
          this.state.pokemonItemError = true
        })
      this.state.pokemonItemLoading = false
    }
  }
})
