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


<script lang="ts", src="./MyCounterScript2.ts">

</script>



<style scoped>
    h3{
        color: blue;
    }
</style>