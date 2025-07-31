// export const registerActions = async (fullname: string, emal:string, passwoard:string)=>{

// }

import { tesloApi } from "@/api/tesloApi"
import type { AuthResponse } from "../interface/auth.response"
import type { User } from "../interface/user.interface";

interface RegisterError {
    ok:false;
    message: string;
}

interface RegisterSuccess{
    ok:true;
    user: User;
    token: string;
}

export const registerActions = async(fullName: string, email:string, password:string):Promise<RegisterError | RegisterSuccess> =>{
    try {
        // console.log(fullname)
        const {data} = await tesloApi.post<AuthResponse>('/auth/register',{
            fullName,
            email,
            password
        })

        console.log({data})

        return  {
            ok:true,
            user: data.user,
            token: data.token
        }
    } catch (error) {
        console.log(error)
        return {
                    ok:false,
                    message: 'No se puedo crear el usuario'
                }

        throw new Error('No se puedo realiza la peticion')
    }
}