<script setup lang="ts">
import ChatMessage from '@/components/chat/ChatMessage.vue';
import MessageBox from '@/components/chat/MessageBox.vue';
import { useChat } from '@/composables/useChat';
import type { ChatMessageInterFace } from '@/interfaces/chat-message-interfeace';
import { ref } from 'vue';


  const {messages, onMessage} = useChat();

</script>

<!-- Fuente: https://tailwindcomponents.com/component/chat-layout -->
<template>
  <div class="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto">
    <div class="bg-blue-500 p-4 text-white flex justify-between items-center">
      <span>Mi esposa</span>
    </div>

    <ChatMessage :messages="messages" />
    <MessageBox @send-messahe="onMessage($event)"></MessageBox>

    
  </div>
</template>