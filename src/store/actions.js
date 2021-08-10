import axiosInstance from 'helpers/axios-instance'
import {
  ERROR,
  FETCH_POKEMON_BY_KEY_REQUESTED,
  FETCH_POKEMON_BY_KEY_SUCCESSFUL,
  FETCH_POKEMON_BY_KEY_FAILED,
  FETCH_POKEMONS_REQUESTED,
  FETCH_POKEMONS_SUCCESSFUL,
  FETCH_POKEMONS_FAILED,
  SET_POKEMON_TEAM,
} from './action-types'

const getPokemon = (key) => (dispatch) => {
  dispatch({
    type: FETCH_POKEMON_BY_KEY_REQUESTED,
  })
  axiosInstance().get(`/pokemon/${key}`)
    .then((res) => {
      dispatch({
        type: FETCH_POKEMON_BY_KEY_SUCCESSFUL,
        payload: res.data,
      })
    })
    .catch((err) => {
      dispatch({
        type: FETCH_POKEMON_BY_KEY_FAILED,
        payload: err.response ? err.response.data : ERROR,
      })
    })
}

const getPokemons = (params) => (dispatch) => {
  let queryStr = [];
  if (params) {
    queryStr = Object.values(params).join("&");
  }

  dispatch({
    type: FETCH_POKEMONS_REQUESTED,
  })
  axiosInstance().get(`/pokemon/?${queryStr}`)
    .then((res) => {
      dispatch({
        type: FETCH_POKEMONS_SUCCESSFUL,
        payload: res.data,
      })
    })
    .catch((err) => {
      dispatch({
        type: FETCH_POKEMONS_FAILED,
        payload: err.response ? err.response.data : ERROR,
      })
    })
}

const setPokemonTeam = (payload) => (dispatch) => {
  dispatch({
    type: SET_POKEMON_TEAM,
    payload,
  })
}

export {
  getPokemon,
  getPokemons,
  setPokemonTeam,
}
