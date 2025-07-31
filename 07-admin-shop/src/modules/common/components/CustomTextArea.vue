<template>
  <div>
    <textarea
    :type="type"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement)?.value ?? '')"
    @blur:="$emit('blur')"
      :class="['form-control',{'border_red-500':error}]"
    ></textarea>
    <span class="text-red-400" v-show="error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
    interface Props {
  modelValue?: string | number
  error?: string
  type?: 'text' | 'number'
}

defineEmits(['update:modelValue', 'blur'])

withDefaults(defineProps<Props>(), {
  type: 'text',
})
</script>

<style scoped>
.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
