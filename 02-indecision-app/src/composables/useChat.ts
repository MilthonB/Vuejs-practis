import { sleep } from "@/helpers/sleep";
import type { ChatMessageInterFace } from "@/interfaces/chat-message-interfeace";
import type { Yesnoresponse } from "@/interfaces/yes-no.response";
import { ref } from "vue";


export const useChat = ()=>{

    const  messages = ref<ChatMessageInterFace[]>([]);

    const getHerResponse = async() => {
        const resp = await fetch('https://yesno.wtf/api');
        const data = await resp.json() as Yesnoresponse;
        return data;
    }


  const onMessage = async (text: string) => {
    if(text.length === 0) return;
    messages.value.push({
      id: new Date().getTime(),
      itsMine: true,
      message: text
    })

    //Evaluar si termina con ??
    if(!text.endsWith('?')) return;


    await sleep(1.5);
    const {answer, image} = await getHerResponse();

    messages.value.push({
        id: new Date().getTime(),
        itsMine:false,
        message:answer,
        image: image
    })



  }

    return {
        //Propertis 
        messages,

        // /Methodos
        onMessage
    }   
}