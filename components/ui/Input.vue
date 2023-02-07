<template>
  <div class="flex items-center gap-x-5">
    <label :for="label.toLowerCase()" class="block mb-2 text-xl font-medium text-inherit">
      {{ label }}
    </label>
    <input :step="type === 'number' ? '0.01' : ''" :type="type" :id="label.toLowerCase()" :value="modelValue" @input="onInput"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :placeholder=placeholder required>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string,
  type: 'text' | 'number' | 'email' | 'password',
  placeholder?: string
  modelValue?: string | number
}
const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])

const onInput = (e: Event): Event => {
  emits('update:modelValue', (e.target as HTMLInputElement).value)
  return e
}
</script>