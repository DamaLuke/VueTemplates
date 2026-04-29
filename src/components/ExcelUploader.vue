<script setup lang="ts">
import { ref } from 'vue'

// ========== Props ==========
interface Props {
  hint?: string
}

const props = withDefaults(defineProps<Props>(), {
  hint: 'please upload the excel file here'
})

// ========== Emits ==========
const emit = defineEmits<{
  success: [file: File]    // 上传成功时触发
  error: [message: string] // 上传失败时触发
}>()

// ========== State ==========
const fileName = ref('')
const status = ref<'idle' | 'success' | 'error'>('idle')
const message = ref('')

const ALLOWED_TYPES = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
  'application/vnd.ms-excel' // .xls
]

const handleFile = (file: File) => {
  // 校验文件类型
  if (!ALLOWED_TYPES.includes(file.type)) {
    status.value = 'error'
    message.value = '请上传 Excel 文件 (.xlsx 或 .xls)'
    return
  }

  // 上传成功
  fileName.value = file.name
  status.value = 'success'
  message.value = '上传成功！'
}

const onFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) handleFile(file)
}

const onDrop = (e: DragEvent) => {
  e.preventDefault()
  const file = e.dataTransfer?.files[0]
  if (file) handleFile(file)
}

const onDragOver = (e: DragEvent) => {
  e.preventDefault()
}
</script>

<template>
  <div class="uploader">
    <!-- 拖拽区域 -->
     <div class="form-row">
      <div  
        class="drop-zone"
        @drop="onDrop"
        @dragover="onDragOver"
      >
        <input 
          type="file" 
          accept=".xlsx,.xls"
          @change="onFileSelect"
          class="file-input"
        />
        <p class="hint">请上传：{{ props.hint }}</p>
      </div>
     </div>


    <!-- 状态提示 -->
    <div v-if="status !== 'idle'" :class="['status', status]">
      <p v-if="status === 'success'">✅ {{ message }}</p>
      <p v-if="status === 'error'">❌ {{ message }}</p>
      <p v-if="fileName" class="filename">文件名：{{ fileName }}</p>
    </div>
  </div>
</template>

<style scoped>
.uploader {
  max-width: 400px;
  margin: 5px auto;
  padding: 10px;
  font-family: Arial, sans-serif;
}

.drop-zone {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 10px 40px 10px;
  text-align: center;
  position: relative;
  transition: border-color 0.3s;
}

.drop-zone:hover {
  border-color: #409eff;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.form-label {
  width: 80px;
  text-align: right;
  color: #757f93;
  font-size: 14px;
  flex-shrink: 0;
  font-weight: bold;
}

.form-field {
  flex: 1;
}

.file-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.hint {
  font-size: 15px;
  color: #999;
  margin-top: 10px 10px;
}

.status {
  margin-top: 20px;
  padding: 15px;
  border-radius: 6px;
  text-align: center;
}

.status.success {
  background: #f0f9eb;
  color: #67c23a;
}

.status.error {
  background: #fef0f0;
  color: #f56c6c;
}

.filename {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}
</style>
