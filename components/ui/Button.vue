<template>
    <button v-if="behaviour === 'button'" :type="type" :disabled="disabled"
      class="flex items-center justify-center gap-x-3 px-5 py-2 transition-colors font-semibold text-white bg-blue-500 rounded-md hover:opacity-95 focus:outline-none"
      :class="classes">
      <slot />
    </button>
    <a v-else :href="href" :disabled="disabled"
      class="flex items-center gap-x-3 px-5 py-2 transition-colors font-semibold text-white bg-blue-500 rounded-md hover:opacity-95 focus:outline-none"
      :class="classes">
      <slot />
    </a>
</template>

<script setup lang="ts">
interface Props {
  behaviour: 'button' | 'anchor',
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark'
}
const props = defineProps<Props>()
const colors = [
  {
    color: 'primary',
    bg: 'bg-blue-500',
    hover: 'hover:bg-blue-600',
    darkBg: 'dark:bg-blue-600',
    darkHover: 'dark:hover:bg-blue-700',
    text: 'text-gray-50',
  },
  {
    color: 'secondary',
    bg: 'bg-gray-500',
    hover: 'hover:bg-gray-600',
    darkBg: 'dark:bg-gray-600',
    darkHover: 'dark:hover:bg-gray-700',
    text: 'text-gray-50',
  },
  {
    color: 'danger',
    bg: 'bg-red-500',
    hover: 'hover:bg-red-600',
    darkBg: 'dark:bg-red-600',
    darkHover: 'dark:hover:bg-red-700',
    text: 'text-gray-50',
  },
  {
    color: 'success',
    bg: 'bg-green-500',
    hover: 'hover:bg-green-600',
    darkBg: 'dark:bg-green-600',
    darkHover: 'dark:hover:bg-green-700',
    text: 'text-gray-50',
  },
  {
    color: 'warning',
    bg: 'bg-yellow-500',
    hover: 'hover:bg-yellow-600',
    darkBg: 'dark:bg-yellow-600',
    darkHover: 'dark:hover:bg-yellow-700',
    text: 'text-gray-50',
  },
  {
    color: 'info',
    bg: 'bg-teal-500',
    hover: 'hover:bg-teal-600',
    darkBg: 'dark:bg-teal-600',
    darkHover: 'dark:hover:bg-teal-700',
    text: 'text-gray-50',
  },
  {
    color: 'light',
    bg: 'bg-gray-200',
    hover: 'hover:bg-gray-300',
    darkBg: 'dark:bg-gray-200',
    darkHover: 'dark:hover:bg-gray-300',
    text: 'text-gray-700',
  },
  {
    color: 'dark',
    bg: 'bg-gray-600',
    hover: 'hover:bg-gray-700',
    darkBg: 'dark:bg-gray-600',
    darkHover: 'dark:hover:bg-gray-700',
    text: 'text-gray-50',
  },
]
const classes = computed(() => {
  const color = props.color || 'primary'
  const colorObj = colors.find(c => c.color === color)
  return `${colorObj?.bg} ${colorObj?.hover} ${colorObj?.darkBg} ${colorObj?.darkHover} ${colorObj?.text}`
})
</script>