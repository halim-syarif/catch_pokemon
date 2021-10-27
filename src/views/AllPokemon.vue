<template>
  <div class="flex justify-center mx-5">
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 text-center justify-center">
        <div v-for="pokemon in pokemons" :key="pokemon.id">
          <div @click="() => $router.push(`/detail/${pokemon.id}`)" class="flex flex-col shadow-xl bg-gray-50 p-5 m-3 rounded-lg cursor-pointer">
            <img :src="pokemon.image" id="image"/>
            <div class="font-semibold">{{pokemon.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AllPokemon',
  data: function () {
    return {
      busy: false,
      page: 0
    }
  },
  computed: {
    pokemons: function () {
      return this.$store.state.pokemons
    },
    count: function () {
      return this.$store.state.count
    }
  },
  methods: {
    loadMore: function () {
      this.busy = true
      if (this.page < this.count) {
        this.$store.dispatch('getPokemons')
      }
      this.page++
      this.busy = false
    }
  },
  created () {
    this.$store.dispatch('getPokemons')
  }
}
</script>

<style>
#image {
  width: 50vw;
  height: 30vh;
  padding-bottom: 20px;
}
</style>
