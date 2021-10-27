<template>
  <div class="MyPokemon">
    <div v-if="myPokemons.length === 0" class="flex flex-col justify-center font-semibold">
      <div>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg" id="imageNone"/>
      </div>
      <div>U dont have any monster</div>
      <div>try to catch some ...</div>
    </div>
    <div v-else class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 mx-5 text-center justify-center">
     <div v-for="pokemon in myPokemons" :key="pokemon.id">
        <div class="flex flex-col shadow-xl bg-gray-50 p-5 m-3 rounded-lg">
            <img :src="pokemon.image" id="image"/>
            <div class="font-semibold">{{pokemon.name}}</div>
            <div class="flex flex-row justify-evenly mt-2">
              <div @click="() => $router.push(`/detail/${pokemon.id}`)"  class="cursor-pointer bg-yellow-400 px-5 py-1 text-white shadow-sm rounded-lg">Detail</div>
              <div @click="() => releasePokemon(pokemon.id)" class="cursor-pointer bg-red-400 px-5 py-1 text-white shadow-sm rounded-lg ml-2">Release</div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MyPokemon',
  computed: {
    myPokemons: function () {
      return this.$store.state.myPokemons
    }
  },
  methods: {
    releasePokemon (id) {
      const filteredPokemon = this.myPokemons.filter(el => {
        return el.id !== id
      })
      this.$store.commit('FILTER_MY_POKEMON', filteredPokemon)
    }
  }
}
</script>

<style>
#imageNone {
  width: 100vw;
  max-height: 50vh;
  align-content: center;
  justify-content: center;
  padding-bottom: 20px;
}
</style>
