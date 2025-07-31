<template>
  <FullScreenLoader
  v-if="authStore.isChecking"
  ></FullScreenLoader>
  <!-- <Routeview/> -->
   <RouterView v-else></RouterView>
   <VueQueryDevtools></VueQueryDevtools>
</template>

<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { useAuthStore } from './modules/auth/stores/auth.store';
import { AuthStatus } from './modules/auth/interface/auth-stats.enum';
import { useRoute, useRouter } from 'vue-router';
import FullScreenLoader from './modules/common/FullScreenLoader.vue';

  const authStore = useAuthStore();


  const router = useRouter(); // navegacion y historial
  const route = useRoute(); // Informacion de al ruta 


  
  
  authStore.$subscribe( (mutation, state) => {
    if (state.authStatus === AuthStatus.Checking){
      authStore.checkAuthStatus();
      return;``
    }
    if(route.path.includes('/auth')  &&  state.authStatus === AuthStatus.Authenticate){
      router.replace({name:'home'})
      return;
    }

      console.log(state.authStatus);
    }, {
      immediate:true
    } )

</script>

<style scoped>

</style>