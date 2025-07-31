import { tesloApi } from "@/api/tesloApi"
import type { AuthResponse } from "../interface/auth.response"
import { isAxiosError } from "axios"
import type { User } from "../interface/user.interface";

interface LoginError {
    ok:false;
    message: string;
}

interface LoginSuccess{
    ok:true;
    user: User;
    token: string;
}

export const loginAction = async(email:string, password:string):Promise<LoginError | LoginSuccess> =>{
    try {
        const {data} = await tesloApi.post<AuthResponse>('/auth/login',{
            email,
            password
        })

        return  {
            ok:true,
            user: data.user,
            token: data.token
        }
    } catch (error) {
        if(isAxiosError(error)){
            if(error.response?.status === 401){
                return {
                    ok:false,
                    message: 'Usuario o contrasenia incorrectos'
                }
            }
        }

        throw new Error('No se puedo realiza la peticion')
    }
}