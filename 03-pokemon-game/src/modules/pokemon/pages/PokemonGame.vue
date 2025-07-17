<template>
    <section v-if="isLoading || randomPokemon.id === null" class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="text-3xl">Espere por favor</h1>
        <h3 class="animate-pulse">Cargando Pokemon</h3>
    </section>

    <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="m-5">Quien es este Pokemon??</h1>
        <h3 class="capitalize">{{gameStatus}}</h3>
         <!-- // Pokemon picture

         // Pokemon options -->

         <PokemonPicture 
         :pokemon-id="randomPokemon.id"
         
         :show-pokemon="gameStatus === GameStatus.Playing"/>

         <PokemonOptions 
         :options="options"
         :block-selection="gameStatus !== GameStatus.Playing" 
         @selected-option="checkAnsware" />
    </section>
</template>
s
<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces/game-status.enum';

const { gameStatus, isLoading, randomPokemon, pokemonOptions:options, checkAnsware } = usePokemonGame();

    const onSelectedOptions = ( value:number ) =>{
        console.log(value)
    }

</script>
