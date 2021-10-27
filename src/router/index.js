import Vue from 'vue'
import VueRouter from 'vue-router'
import AllPokemon from '../views/AllPokemon.vue'
import MyPokemon from '../views/MyPokemon.vue'
import DetailPokemon from '../views/DetailPokemon.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AllPokemon',
    component: AllPokemon
  },
  {
    path: '/detail/:id',
    name: 'DetailPokemon',
    component: DetailPokemon
  },
  {
    path: '/my_pokemon',
    name: 'MyPokemon',
    component: MyPokemon
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
