<template>
  <label class="relative block text-md font-medium text-inherit">
    <p class="absolute top-0 -translate-y-full text-md">{{ label }}</p>
    <select @input="onInput" :value="modelValue"
      class="w-full py-3 px-4 text-md font-semibold text-gray-900 dark:text-gray-300 bg-gray-200 dark:bg-gray-500 dark:placeholder-gray-300 rounded-md">
      <slot />
    </select>
  </label>
</template>

<script setup lang="ts">
interface Props {
  label?: string
  modelValue: string | number
}
const emits = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()
const onInput = (e: Event): Event => {
  emits('update:modelValue', (e.target as HTMLInputElement).value)
  return e
}
defineProps<Props>()
</script>