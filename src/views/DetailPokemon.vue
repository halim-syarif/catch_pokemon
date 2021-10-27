<template>
  <div class="DetailPokemon">
    <div class="flex-col lg:grid lg:grid-cols-2 m-10">
      <img :src="detail.image" id="imageDetail" class="lg:mt-5"/>
      <div class="shadow-xl bg-gray-50 p-3 m-3 rounded-lg lg:mb-5">
        <div class="font-semibold text-2xl capitalize">{{detail.name}}</div>
        <div class="grid grid-cols-2 mt-10 text-left">
          <div class="text-lg capitalize">Base happiness</div>
          <div class="text-lg capitalize">: {{detail.base_happiness}}</div>
        </div>
        <div class="grid grid-cols-2 mt-2 text-left">
          <div class="text-lg capitalize">Capture Rate</div>
          <div class="text-lg capitalize">: {{detail.capture_rate}} from 255</div>
        </div>
        <div class="grid grid-cols-2 mt-2 text-left">
          <div class="text-lg capitalize">Evolve From</div>
          <div class="text-lg capitalize">: {{detail.evolves_from_species ? detail.evolves_from_species.name : 'null'}}</div>
        </div>
        <div class="grid grid-cols-2 mt-2 text-left">
          <div class="text-lg capitalize">Habitat</div>
          <div class="text-lg capitalize">: {{detail.habitat ? detail.habitat.name : 'null'}}</div>
        </div>
        <div class="grid grid-cols-2 mt-2 text-left">
          <div class="text-lg capitalize">Growth rate</div>
          <div class="text-lg capitalize">: {{detail.growth_rate ? detail.growth_rate.name : 'null'}}</div>
        </div>
        <div class="grid grid-cols-2 mt-2 text-left">
          <div class="text-lg capitalize">Generation</div>
          <div class="text-lg capitalize">: {{detail.generation ? detail.generation.name : 'null'}}</div>
        </div>
        <div class="grid grid-cols-2 mt-2 text-left">
          <div class="text-lg capitalize">Shape</div>
          <div class="text-lg capitalize">: {{detail.shape ? detail.shape.name : 'null'}}</div>
        </div>
        <div class="grid grid-cols-2 mt-2 text-left">
          <div class="text-lg capitalize">Is Baby</div>
          <div class="text-lg capitalize">: {{detail.is_baby ? 'True' : 'False'}}</div>
        </div>
        <div class="grid grid-cols-2 mt-2 text-left">
          <div class="text-lg capitalize">Is Legendary</div>
          <div class="text-lg capitalize">: {{detail.is_legendary ? 'True' : 'False'}}</div>
        </div>
        <div class="grid grid-cols-2 mt-2 text-left">
          <div class="text-lg capitalize">Is Mythical</div>
          <div class="text-lg capitalize">: {{detail.is_mythical ? 'True' : 'False'}}</div>
        </div>
        <button v-if="!catched" @click="catchme" class="cursor-pointer bg-red-400 px-5 py-1 text-white shadow-sm rounded-lg ml-2 mt-10">Catch</button>
        <button v-else class="bg-green-400 px-5 py-1 text-white shadow-sm rounded-lg ml-2 mt-10">Catched</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DetailPokemon',
  data: function () {
    return {
      detail: {},
      catched: false
    }
  },
  computed: {
    myPokemons: function () {
      return this.$store.state.myPokemons
    }
  },
  methods: {
    catchme: function () {
      this.$isLoading(true)
      setTimeout(() => {
        const random = Math.ceil(Math.random(10) * 255)
        if (random < this.detail.capture_rate) {
          this.catched = true
          this.$store.commit('SET_MY_POKEMON', this.detail)
          this.$toasted.success('Wow, U got the Monster').goAway(2000)
        } else {
          this.$toasted.error('This Monster is Hard to catch, try again...').goAway(2000)
        }
        this.$isLoading(false)
      }, 3000)
    },
    checkIsCatched: function () {
      for (const pokemon of this.myPokemons) {
        if (pokemon.id === +this.$route.params.id) {
          this.catched = true
          break
        }
      }
    }
  },
  created () {
    this.checkIsCatched()
    this.$store.dispatch('getDetail', this.$route.params.id)
      .then(response => {
        console.log(response.data)
        this.detail = response.data
        this.detail.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.$route.params.id}.svg`
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style>
#imageDetail {
  width: 100vw;
  max-height: 70vh;
  padding-bottom: 20px;
}
</style>
