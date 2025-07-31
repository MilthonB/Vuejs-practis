<template>
  <h1 class="text-2xl font-semibold mb-4">Nueva cuenta</h1>
  <form @submit.prevent="onRegister">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="name" class="block text-gray-600">Nombre</label>
      <input
      v-model="myForm.fullName"
      ref="fullNameInputRef"
        type="text"
        id="name"
        name="name"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>

    <!-- Username Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">email</label>
      <input
      v-model="myForm.email"
      ref="emailInputRef"
        type="email"
        id="username"
        name="username"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Contrasenia</label>
      <input
      v-model="myForm.passwaord"
      ref="passwaordInputRef"
        type="password"
        id="password"
        name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Remember Me Checkbox -->
    <div class="mb-4 flex items-center">
      <input type="checkbox" id="remember" name="remember" class="text-blue-500" />
      <label for="remember" class="text-gray-600 ml-2">Remember Me</label>
    </div>
    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">Olvido la contrasenia?</a>
    </div>
    <!-- Login Button -->
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Crear cuenta 
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'login' }" class="hover:underline">Login Here</RouterLink>
  </div>
</template>



<script lang="ts" setup>
import { reactive, ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import { useToast } from 'vue-toastification';

// const router = useRouter();
const authStore = useAuthStore();
const fullNameInputRef = ref<HTMLInputElement|null>(null);
const emailInputRef = ref<HTMLInputElement|null>(null);
const passwaordInputRef = ref<HTMLInputElement|null>(null);

const toast = useToast();

const myForm = reactive({
  email:'',
  passwaord: '',
  fullName: ''
}) // para lamacenar objetocs reacrtivos


const onRegister = async() => {

  //usar en esquemas de validacion

  if(myForm.fullName.length < 2){
    return fullNameInputRef.value?.focus();
  }

  if(myForm.email === ''){
    return emailInputRef.value?.focus();
  }

   if(myForm.passwaord.length < 6 ){
    return passwaordInputRef.value?.focus();
  }


 


    console.log(myForm);
    const {ok, message} = await authStore.register(myForm.fullName, myForm.email, myForm.passwaord);

    if(ok) return;

  

    toast.error(message)





  // localStorage.setItem('userId', 'ABC-123');

  // const lastPath = localStorage.getItem('lastPath') ?? '/';

  // // router.replace({
  // //   // name: 'home',
  // // });
  // router.replace(lastPath);
};


</script>
