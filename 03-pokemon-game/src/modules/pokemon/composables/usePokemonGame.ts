import { computed, onMounted, ref } from "vue"
import  { GameStatus } from "../interfaces/game-status.enum"
import { pokemonApi } from "../api/prokemonApi"
import type { PokemonListResponse } from "../interfaces/pokemon-list.response"
import type { Pokemon } from "../interfaces/pokemon.interface"
import confetti from 'canvas-confetti';


export const usePokemonGame = () => {



    const gameStatus = ref<GameStatus>(GameStatus.Playing)
    const pokemon = ref<Pokemon[]>([]);
    const pokemonOptions = ref<Pokemon[]>([]);


    const randomPokemon = computed(()=> pokemonOptions.value[Math.floor(Math.random()) * pokemonOptions.value.length]);
    const isLoading = computed(() => pokemon.value.length === 0 );

    const getPokemon = async(): Promise<Pokemon[]>=>{
        const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');

        // console.log(response.data)

        const pokemonArray = response.data.results.map(pokemon => {
            const urlParts =  pokemon.url.split('/');
            const id = urlParts[urlParts.length - 2] ?? 0;
            return {
                name: pokemon.name,
                id: +id
                // id: urlParts.at(-2)
            }
        })

        return pokemonArray.sort(()=> Math.random() - 0.5);

    }


    const getNextOptions = (howmany: number = 4) => {
        gameStatus.value = GameStatus.Playing;
        pokemonOptions.value = pokemon.value.slice(0, howmany);
        pokemon.value = pokemon.value.slice(howmany);
    }


    const checkAnsware = ( id:number ) => {
        const hasWon =  randomPokemon.value.id === id;
        if(hasWon){
            gameStatus.value= GameStatus.Won;
            confetti({
                particleCount:300,
                spread:150,
                origin:{y:0.6}
            });

            return;

        }

        gameStatus.value = GameStatus.Lost;
    }

    onMounted(async ()=> {
      
       pokemon.value =  await getPokemon(),
       getNextOptions();



    //    console.log(pokemons)
    })

    return {
        gameStatus,
        isLoading,
        pokemonOptions,
        randomPokemon,
        // Meetodos
        getNextOptions,
        checkAnsware

    }
}