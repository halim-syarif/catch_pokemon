import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    pokemons: [],
    myPokemons: [],
    baseUrl: 'https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=20'
  },
  mutations: {
    SET_POKEMON: function (state, payload) {
      state.pokemons = [...state.pokemons].concat(payload)
    },
    SET_COUNT: function (state, payload) {
      state.count = payload
    },
    SET_BASE_URL: function (state, payload) {
      state.baseUrl = payload
    },
    SET_MY_POKEMON: function (state, payload) {
      state.myPokemons = [...state.myPokemons].concat(payload)
    },
    FILTER_MY_POKEMON: function (state, payload) {
      state.myPokemons = payload
    }
  },
  actions: {
    getPokemons: function ({ state, commit }) {
      axios
        .get(state.baseUrl)
        .then((response) => {
          response.data.results.forEach(el => {
            const id = el.url.slice(42, -1)
            el.id = id
            el.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
          })
          commit('SET_POKEMON', response.data.results)
          commit('SET_COUNT', Math.ceil(response.data.count / 20))
          commit('SET_BASE_URL', response.data.next)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getDetail: function (context, id) {
      return axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    }
  },
  modules: {}
})
