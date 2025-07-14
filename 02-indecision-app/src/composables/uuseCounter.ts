import { computed, ref } from "vue";


export const useCounter = (initialValue:number) => {

    const counter =  ref(initialValue);
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
        decrementar,
        incrementar
    }
}