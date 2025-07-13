<script setup lang="ts">
import MyCounterScript2 from './components/my-counter-script/MyCounterScript2.vue';
import MyCounter from './components/MyCounter.vue';
import MyCounterScript from './components/MyCounterScript.vue';

</script>

<!-- SFC Single file component-->

<template>
    <h1>Mi primera app</h1>
    <hr>
    <MyCounter :value=5></MyCounter>
    <MyCounterScript :value=8></MyCounterScript>
    <MyCounterScript2 :value="11"></MyCounterScript2>
</template>




