<script setup lang="ts">
import type { ChatMessageInterFace } from '@/interfaces/chat-message-interfeace';
import ChatBubble from './ChatBubble.vue';
import { ref, toRef, watch } from 'vue';


interface Props{
  messages: ChatMessageInterFace[];
}

const props = defineProps<Props>();

const messageRef = toRef(props, 'messages');

const chatRef = ref<HTMLDivElement|null>(null);

watch(messageRef.value, ()=> {
  setTimeout(() => {
    chatRef.value?.scrollTo({
    top: chatRef.value.scrollHeight,
    behavior: 'smooth'
  })
  }, 300);
  
} );



</script>

<template>
    <div ref="chatRef" class="flex-1 overflow-y-auto p-4">
      <div class="flex flex-col space-y-2">
        <ChatBubble 
        v-for="message in messages"
        :key="message.id"
        :its-mine=message.itsMine
        :message="message.message"
        :image="message.image">
      </ChatBubble>
        
      </div>
    </div>
</template>