import { computed, defineComponent, ref } from 'vue';

export default defineComponent(
    {
        props: {
            value: {type: Number, required:true}
        },

        setup(props){
                const counter =  ref(props.value);
                const square = computed(()=> counter.value * counter.value);
                    const incrementar = ()=>{
        counter.value = counter.value + 1;
    }

    const decrementar = ()=>{ 
        counter.value = counter.value - 1;
    }
                return {
                    counter,
                    square,

                    incrementar,
                    decrementar
                }
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
    