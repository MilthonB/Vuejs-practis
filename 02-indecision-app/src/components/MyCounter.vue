<!-- SFC Single file component-->

<template>
    <section>
        <h3>Conter: {{ counter }}</h3>
        <h3>Square: {{ square }}</h3>

        <div>
            <button v-on:click="incrementar">+1</button>
            <button @click="decrementar">-1</button>
        </div>
    </section>
</template>


<script lang="ts" setup>
import { useCounter } from '@/composables/uuseCounter';
interface Props{
        value:number
    }

    const props = defineProps<Props>()

    const { counter,
square,
decrementar,
incrementar, } = useCounter(props.value);

    

    
    
</script>



<style scoped>
    h3{
        color: blue;
    }
</style>