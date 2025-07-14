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


<script lang="ts">
import { useCounter } from '@/composables/uuseCounter';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent(
    {
        props: {
            value: {type: Number, required:true}
        },

        setup(props){
            const { 
                counter,
                square,
                decrementar,
                incrementar, } = useCounter(props.value);
            return{counter,square,
            decrementar,
            incrementar,}
        }
    }
)
// import { computed, ref } from 'vue';

//     interface Props{
//         value:number
//     }

//     const props = defineProps<Props>()

//     const counter =  ref(props.value );
//     const square = computed(()=> counter.value * counter.value);

//     const incrementar = ()=>{
//         counter.value = counter.value + 1;
//     }

//     const decrementar = ()=>{ 
//         counter.value = counter.value - 1;
//     }
    
</script>



<style scoped>
    h3{
        color: blue;
    }
</style>