// import axios from 'axios'

// const defaultParams = { page: 0, size: 100 }

const POKEAPI_ENDPOINT ='https://pokeapi.co/api/v2/'

export default {
  getPokemonList (params) {
    // console.log(`${POKEAPI_ENDPOINT}pokemon/?limit=${params.params.limit}&offset=${params.params.offset}`);
    return fetch(`${POKEAPI_ENDPOINT}pokemon/?limit=${params.params.limit}&offset=${params.params.offset}`)
  },
  getPokemonFindById (params) {
    // console.log('API getNexusFind', params)
    return fetch(`${POKEAPI_ENDPOINT}pokemon/${params.params.id}`)
  }
}