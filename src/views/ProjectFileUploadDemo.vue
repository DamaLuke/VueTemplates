<script setup lang="ts">
import FileUploadModal from '../templates/FileUploadModal.vue'

// 配置上传项
const projectUploadItems = [
  { hint: 'Excel数据集' },
  { hint: '数据管理汇总报告' },
  { hint: '项目进展报告' },
  { hint: '质疑汇总报告' }
]
// 处理提交
const handleConfirm = (files: Record<string, File>) => {
  console.log('提交的文件:', files)
  alert(`成功上传 ${Object.keys(files).length} 个文件`)
}

const handleCancel = () => {
  console.log('用户取消')
}
</script>

<template>
  <div class="page">    
    <!-- 场景：项目文件上传 -->
    <FileUploadModal
      button-text="艾迪研进展报告程序"    
      title="项目文件上传"
      :upload-items="projectUploadItems"
      confirm-text="提交"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </div>
</template>

<style>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 20px;
}

.page h1 {
  color: #303133;
  margin-bottom: 20px;
}
</style>
