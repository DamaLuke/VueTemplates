<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

interface PageItem {
  name: string
  path: string
  description: string
}

const pages: PageItem[] = [
  {
    name: '项目文件上传',
    path: '/project-upload',
    description: '演示 FileUploadModal 组件的文件上传功能'
  }
]

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="home-page">
    <h1>组件演示入口</h1>
    <div class="page-list">
      <div
        v-for="page in pages"
        :key="page.path"
        class="page-card"
        @click="navigateTo(page.path)"
      >
        <h3>{{ page.name }}</h3>
        <p>{{ page.description }}</p>
        <span class="arrow">→</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

h1 {
  text-align: center;
  color: #303133;
  margin-bottom: 40px;
}

.page-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.page-card {
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.page-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #409eff;
  transform: translateY(-2px);
}

.page-card h3 {
  margin: 0 0 8px 0;
  color: #303133;
  font-size: 18px;
}

.page-card p {
  margin: 0;
  color: #606266;
  font-size: 14px;
}

.arrow {
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  color: #c0c4cc;
  font-size: 20px;
  transition: color 0.3s ease;
}

.page-card:hover .arrow {
  color: #409eff;
}
</style>
