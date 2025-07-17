<template>
    <section>
        <img 
        v-if="props.pokemonId"
        class="brightness-0 h-[200px]"
        :src="pokemonImage" alt="PokemonGuess">

         <img 
        v-else
        class="fade-in h-[200px]"
        :src="pokemonImage" alt="PokemonGuess">
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';


interface Props{
    pokemonId: number;
    showPokemon?: boolean
}

    const props = withDefaults(defineProps<Props>(),{
        showPokemon:false
    });

    console.log(!props.showPokemon);
    const pokemonImage = computed(() => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`);

</script>


<style scoped>
/* Esta configuracion es pa que no pueda arrastar la imagen */
img {
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: noe;
    -webkit-user-drag: none;
    -webkit-user-select: none;
}
</style>
