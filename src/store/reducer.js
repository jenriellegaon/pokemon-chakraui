/* eslint-disable no-param-reassign */
import {
  FETCH_POKEMON_BY_KEY_REQUESTED,
  FETCH_POKEMON_BY_KEY_SUCCESSFUL,
  FETCH_POKEMON_BY_KEY_FAILED,
  FETCH_POKEMONS_REQUESTED,
  FETCH_POKEMONS_SUCCESSFUL,
  FETCH_POKEMONS_FAILED,
} from './action-types'

const globalState = {
  pokemon: {},
  isFetchingPokemon: false,
  pokemons: {},
  isFetchingPokemons: false,
}

const globalReducer = (state = globalState, { payload, type }) => {
  switch (type) {
    case FETCH_POKEMON_BY_KEY_REQUESTED: {
      return {
        ...state,
        isFetchingPokemon: true,
      }
    }

    case FETCH_POKEMON_BY_KEY_SUCCESSFUL: {
      return {
        ...state,
        isFetchingPokemon: false,
        pokemon: payload || {},
      }
    }
    case FETCH_POKEMON_BY_KEY_FAILED: {
      return {
        ...state,
        isFetchingPokemon: false,
        pokemon: {},
      }
    }

    case FETCH_POKEMONS_REQUESTED: {
      return {
        ...state,
        isFetchingPokemons: true,
      }
    }

    case FETCH_POKEMONS_SUCCESSFUL: {
      return {
        ...state,
        isFetchingPokemons: false,
        pokemons: payload || {},
      }
    }
    case FETCH_POKEMONS_FAILED: {
      return {
        ...state,
        isFetchingPokemons: false,
        pokemons: {},
      }
    }

    default:
      return state
  }
}

export { globalReducer, globalState }
