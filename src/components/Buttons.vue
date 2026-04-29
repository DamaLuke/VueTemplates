<script setup lang="ts">
import styles from '../styles/components/button.module.css'

defineOptions({
  name: 'PrimaryButton'
})

interface Props {
  type?: 'primary'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'medium',
  disabled: false,
  loading: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', event)
}

// 动态构建 class 对象
const buttonClasses = computed(() => {
  return {
    [styles.base]: true,
    [styles[props.size]]: true,
    [styles[props.type]]: true,
    [styles.disabled]: props.disabled,
    [styles.loading]: props.loading
  }
})

import { computed } from 'vue'
</script>

<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" :class="styles.loadingIcon"></span>
    <span v-else-if="icon" :class="styles.icon">{{ icon }}</span>
    <span class="content">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.content {
  display: inline-flex;
  align-items: center;
}
</style>
