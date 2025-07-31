<template>
  <h1 class="text-2xl font-semibold mb-4">Login</h1>
  <form @submit.prevent="onLogin">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Correo</label>
      <input
        v-model="myForm.email"
        ref="emailInputRef"
        type="text"
        id="email"
        name="email"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Contraseña</label>
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
      <input 
      v-model="myForm.rememberMe"
      type="checkbox" id="remember" name="remember" class="text-blue-500" />
      <label for="remember" class="text-gray-600 ml-2">Recordar usuario</label>
    </div>
    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">Olvidaste la contraña?</a>
    </div>
    <!-- Login Button -->
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Ingresar
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'register' }" class="hover:underline">Sign up Here</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import { useToast } from 'vue-toastification';

// const router = useRouter();
const authStore = useAuthStore();
const emailInputRef = ref<HTMLInputElement|null>(null);
const passwaordInputRef = ref<HTMLInputElement|null>(null);

const toast = useToast();

const myForm = reactive({
  email:'',
  passwaord: '',
  rememberMe: false
}) // para lamacenar objetocs reacrtivos


const onLogin = async() => {

  //usar en esquemas de validacion

  if(myForm.email === ''){
    return emailInputRef.value?.focus();
  }

   if(myForm.passwaord.length < 6 ){
    return passwaordInputRef.value?.focus();
  }


  if( myForm.rememberMe ){
    localStorage.setItem('email', myForm.email)
  }else{
    localStorage.removeItem('email')
  }




    const ok = await authStore.login(myForm.email, myForm.passwaord);

    if(ok) return;

  

    toast.error('usuario/contrasenia no son correctos')





  // localStorage.setItem('userId', 'ABC-123');

  // const lastPath = localStorage.getItem('lastPath') ?? '/';

  // // router.replace({
  // //   // name: 'home',
  // // });
  // router.replace(lastPath);
};


watchEffect(()=>{
  const email = localStorage.getItem('email')
  if(email){
    myForm.email = email;
    myForm.rememberMe = true;
  }
});
</script>
