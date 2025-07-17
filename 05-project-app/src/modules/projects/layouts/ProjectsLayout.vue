<script setup lang="ts">
import TopMenu from '@/modules/common/components/TopMenu.vue';
import SideMenu from '../components/SideMenu.vue';

</script>

<template>
    <div class="flex flex-col">

        <!-- Top menu -->
         <top-menu></top-menu>

        <main class="flex flex-row">
            <!-- Side menu -->
             <side-menu></side-menu>

             <!-- RouterView -->
              <router-view>

              </router-view>
        </main>
    </div>
</template>