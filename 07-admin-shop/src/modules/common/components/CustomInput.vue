<template>
  <div>
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value ?? '')"
      @blur="$emit('blur')"
      :class="[
        'form-control',
        {
          'border-red-500': error,
        },
      ]"
    />
    <span class="text-red-400">{{ error }}</span>
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
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}

.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
