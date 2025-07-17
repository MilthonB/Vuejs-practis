<template>
    <section class="mt-5 flex flex-col">
       <button v-for="{ name, id } in options" :key="id" 
       @click="$emit('selectedOption', id)"
       :disabled="false"
       class="capitalize disabled:shadow-none disabled:bg-grray-100">
        {{ name }}
       </button>
    </section>
</template>

<script setup lang="ts">
import type { Pokemon } from '../interfaces/pokemon.interface';


    interface Props {
        options: Pokemon[],
        blockSelection:boolean
    }

    const props = defineProps<Props>();

    const emit = defineEmits();

</script>

<style scoped>
    button{
        @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100
    }
</style>