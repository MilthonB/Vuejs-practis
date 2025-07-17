

<template>
    <!-- Open the modal using ID.showModal() method -->
<dialog id="my_modal_1" class="modal" :open="open">
  <div class="modal-box">
    <h3 class="text-lg font-bold">{{ title }}</h3>
    <p class="py-4">{{ subtitle }}</p>
    <div class="modal-action flex flex-col">
      <form method="dialog" @submit.prevent="submitValue">
        <input 
        ref="inputRef"
        class="input input-bordered input-primary w-full flex-1"
        v-model="inputValue"
        type="text" placeholder="Nombre del proyecto">
        <!-- if there is a button in form, it will close the modal -->
         <div class="flex mt-5 justify-end">
            <button @click="$emit('close')" class="btn">Close</button>
            <button type="submit" class="btn btn-primary ml-4">Aceptar</button>
        </div>

        
      </form>
    </div>
  </div>
</dialog>>


</template>

<script setup lang="ts">
import { ref, watch } from 'vue';


    interface Props{
        open: boolean;
        title: string;
        subtitle: string
    }


    const props = defineProps<Props>();
    const emits = defineEmits<{
        close:[void];
        value: [text:string]
    }>();

    const inputValue = ref('');

    const inputRef = ref<HTMLInputElement | null >(null);

    watch(props, ({open})=> {
      if(open){
        inputRef.value?.focus;
      }
    })


    const submitValue = ()=>{
        if(!inputValue.value){
            inputRef.value?.focus;
            return;
        }

        emits('value', inputValue.value.trim());

        // 
        emits('close');

        inputValue.value ='';

    }


</script>

<style scoped>

</style>