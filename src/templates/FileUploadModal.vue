<script setup lang="ts">
import { ref } from 'vue'
import ExcelUploader from '../components/ExcelUploader.vue'

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
</script>

<template>
  <div>
    <!-- 触发按钮 -->
    <button class="trigger-btn" @click="open">{{ buttonText }}</button>

    <!-- 弹窗 -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="isOpen" class="modal-overlay" @click="clickOverlay">
          <div class="modal-content">
            <!-- 关闭按钮 -->
            <button class="close-btn" @click="close">✕</button>

            <!-- 标题 -->
            <h2 class="modal-title">{{ title }}</h2>

            <!-- 上传列表 -->
            <div class="upload-list">
              <div 
                v-for="(item, index) in uploadItems" 
                :key="index"
                class="upload-item"
              >
                <ExcelUploader 
                  :hint="item.hint"
                  :accept="item.accept || '.xlsx,.xls'"
                  @success="(file) => handleFileSuccess(file, index)"
                />
              </div>
            </div>

            <!-- 底部按钮 -->
            <div class="modal-footer">
              <button class="btn-cancel" @click="close">{{ cancelText }}</button>
              <button class="btn-confirm" @click="handleConfirm">{{ confirmText }}</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.trigger-btn {
  padding: 12px 32px;
  background: #4f49cc;
  color: rgb(245, 245, 245);
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.trigger-btn:hover {
  background: #66b1ff;
}

/* 遮罩层 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* 弹窗内容 */
.modal-content {
  background: white;
  border-radius: 12px;
  padding: 32px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #909399;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: #f5f7fa;
  color: #606266;
}

.modal-title {
  margin: 0 0 24px 0;
  color: #303133;
  font-size: 20px;
  text-align: center;
}

.upload-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid #e4e7ed;
  padding-top: 20px;
}

.btn-cancel,
.btn-confirm {
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-cancel {
  background: white;
  border: 1px solid #dcdfe6;
  color: #606266;
}

.btn-cancel:hover {
  border-color: #409eff;
  color: #409eff;
}

.btn-confirm {
  background: #409eff;
  border: none;
  color: white;
}

.btn-confirm:hover {
  background: #66b1ff;
}

/* 过渡动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95);
}
</style>
