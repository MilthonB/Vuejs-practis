<script setup lang="ts">
import CustomFooter from '../components/CustomFooter.vue';
import TopMenu from '../components/TopMenu.vue';
import HomeView from '../views/HomeView.vue';

</script>

<template>
<!-- Header Navbar -->
  <TopMenu></TopMenu>




<router-view></router-view>

<!-- Footer -->
<custom-footer></custom-footer>

</template>

<!-- <script setup lang="ts">

</script>

<style scoped>

</style> -->