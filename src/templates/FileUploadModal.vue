<script setup lang="ts">
import { ref, computed } from 'vue'
import styles from '../styles/components/modal.module.css'
import ExcelUploader from '../components/ExcelUploader.vue'
import Buttons from '../components/Buttons.vue'

// ========== Props ==========
interface UploadItem {
  hint: string
  accept?: string
}

interface Props {
  // 弹窗标题
  title?: string
  // 上传项配置
  uploadItems: UploadItem[]
  // 打开按钮文字
  buttonText?: string
  // 确认按钮文字
  confirmText?: string
  // 取消按钮文字
  cancelText?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '上传文件',
  buttonText: '上传文件',
  confirmText: '确认',
  cancelText: '取消'
})

// ========== Emits ==========
const emit = defineEmits<{
  // 确认提交
  confirm: [files: Record<string, File>]
  // 取消/关闭
  cancel: []
}>()

// ========== 状态 ==========
const isOpen = ref(false)
const uploadedFiles = ref<Record<string, File>>({})

// ========== 方法 ==========
const open = () => {
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
  emit('cancel')
}

const clickOverlay = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    close()
  }
}

// 处理文件上传成功
const handleFileSuccess = (file: File, index: number) => {
  uploadedFiles.value[index] = file
}

// 确认提交
const handleConfirm = () => {
  emit('confirm', uploadedFiles.value)
  close()
}

// 动态过渡类名
const transitionClasses = computed(() => ({
  enterActiveClass: styles.modalEnterActive,
  enterFromClass: styles.modalEnterFrom,
  leaveActiveClass: styles.modalLeaveActive,
  leaveToClass: styles.modalLeaveTo
}))

defineExpose({ open, close })
</script>

<template>
  <div>
    <!-- 触发按钮 -->
    <Buttons type="primary" @click="open">{{ buttonText }}</Buttons>

    <!-- 弹窗 -->
    <Teleport to="body">
      <Transition v-bind="transitionClasses">
        <div v-if="isOpen" :class="styles.overlay" @click="clickOverlay">
          <div :class="styles.content">
            <!-- 关闭按钮 -->
            <button :class="styles.closeBtn" @click="close">✕</button>

            <!-- 标题 -->
            <h2 :class="styles.title">{{ title }}</h2>

            <!-- 上传列表 -->
            <div :class="styles.uploadList">
              <div
                v-for="(item, index) in uploadItems"
                :key="index"
              >
                <ExcelUploader
                  :hint="item.hint"
                  :accept="item.accept || '.xlsx,.xls'"
                  @success="(file: File) => handleFileSuccess(file, index)"
                />
              </div>
            </div>

            <!-- 底部按钮 -->
            <div :class="styles.footer">
              <button :class="[styles.btnBase, styles.btnCancel]" @click="close">{{ cancelText }}</button>
              <button :class="[styles.btnBase, styles.btnConfirm]" @click="handleConfirm">{{ confirmText }}</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
