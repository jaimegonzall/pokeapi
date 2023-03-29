// import axios from 'axios'

// const defaultParams = { page: 0, size: 100 }

const POKEAPI_ENDPOINT ='https://pokeapi.co/api/v2/'

export default {
  getPokemonList (params) {
    return fetch(`${POKEAPI_ENDPOINT}pokemon/?limit=${params.params.limit}&offset=${params.params.offset}`)
  },
  getPokemonListByType (params) {
    return fetch(`${POKEAPI_ENDPOINT}type/${params.params.type}`)
  },
  getPokemonFindById (params) {
    return fetch(`${POKEAPI_ENDPOINT}pokemon/${params.params.id}`)
  }
}