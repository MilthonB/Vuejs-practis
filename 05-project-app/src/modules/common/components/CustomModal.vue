<template>
<dialog class="modal" :open="open">
  <div class="modal-box">

    <div class="border-b border-blue-500">
        <!-- Header -->
         <slot name="header"></slot>
    </div>

    <div class="my-5">
         <slot name="body"></slot>
    </div>

    <div class="border-t border-t-blue-500 pt-2">
         <slot name="footer"></slot>
    </div>
  </div>
</dialog>
</template>


<script setup lang="ts">

    interface Props{
        open?: boolean;


    }


    withDefaults(defineProps<Props>(),{
        open:false
    });
</script>