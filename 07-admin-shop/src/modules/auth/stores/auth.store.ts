import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { User } from "../interface/user.interface";
import { AuthStatus } from "../interface/auth-stats.enum";
import { loginAction } from "../actions/login.action";
import { useLocalStorage } from "@vueuse/core";
import { registerActions } from "../actions/register.actions";
import { checkAuthAction } from "../actions/check-auth.action";



export const useAuthStore =  defineStore('auth', () => {

    // Autheticaed, unAuthenticated, Checking  - estados
    const authStatus = ref(AuthStatus.Checking)
    const user = ref<User | undefined>()
    const token = ref(useLocalStorage('token',''))

    const login = async(email: string, passwaord: string) => {
        try {
            const loginRespos =  await loginAction(email, passwaord)
            if(!loginRespos.ok) {
                logOut()
                return false
            }

            user.value = loginRespos.user;
            token.value =loginRespos.token;
            authStatus.value = AuthStatus.Authenticate;
            return true;
        } catch (error) {
            logOut()
        }
    }


    const logOut = () =>{
        localStorage.removeItem('token')
            authStatus.value = AuthStatus.Unauthenticate
            user.value = undefined;
            token.value = '';
            return false
    }

    const checkAuthStatus = async(): Promise<boolean> =>{


        try {
            const statusResp = await checkAuthAction();

            if(!statusResp.ok){
                // authStatus.value
                logOut();
                return false;
            }

            authStatus.value = AuthStatus.Authenticate;
            user.value = statusResp.user;
            token.value = statusResp.token;
            return true
        } catch (error) {
            logOut()
            return false
        }
    }   


    const register = async(fullName: string, email:string, password:string) =>{

        try {
            const registerResp = await registerActions(fullName,email,password);

            if(!registerResp.ok) {
                logOut()
                return {ok: false, message:registerResp.message}
            }

            user.value = registerResp.user;
            token.value = registerResp.token;
            authStatus.value = AuthStatus.Authenticate

            return {ok:true, message:''}

        } catch (error) {
            return {ok: false, message: 'Error al registrar el suario'}
        }
    }



    return {
        user,token, authStatus,

        // Getters
        isChecking: computed(()=> authStatus.value === AuthStatus.Checking),
        isAuthenticated: computed(()=> authStatus.value === AuthStatus.Authenticate),
        // isUnAuthenticated: computed(()=> authStatus.value === AuthStatus.Unauthenticate)
        //TODO: getter pra saber si es admin o no
        isAdmin: computed(()=> user.value?.roles.includes('admin')?? false),
        username:  computed(() => user.value?.fullName),


        //Actions
        login,
        register,
        checkAuthStatus,
        logOut

    }
})