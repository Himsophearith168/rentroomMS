<template>
  <div class="dashboard-view">
    <div class="header-section mb-4">
      <h1 class="display-6 fw-bold">ផ្ទាំងគ្រប់គ្រង</h1>
      <p class="text-muted">សូមស្វាគមន៍មកកាន់ប្រព័ន្ធគ្រប់គ្រងផ្ទះជួល!</p>
    </div>
    
    <div class="row g-4 mt-2">
      <div class="col-12 col-md-4">
        <div class="stats-card p-4">
          <div class="d-flex align-items-center gap-3">
            <div class="icon-box bg-primary-soft text-primary">
              <i class="bi bi-journal-text fs-3"></i>
            </div>
            <div>
              <h3 class="h6 mb-1">ចំនួនកំណត់ចំណាំ</h3>
              <p class="h4 mb-0 fw-bold">{{ noteCount }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-12 col-md-4">
        <div class="stats-card p-4">
          <div class="d-flex align-items-center gap-3">
            <div class="icon-box bg-success-soft text-success">
              <i class="bi bi-house-door fs-3"></i>
            </div>
            <div>
              <h3 class="h6 mb-1">បន្ទប់ទំនេរ</h3>
              <p class="h4 mb-0 fw-bold">0</p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-4">
        <div class="stats-card p-4">
          <div class="d-flex align-items-center gap-3">
            <div class="icon-box bg-warning-soft text-warning">
              <i class="bi bi-people fs-3"></i>
            </div>
            <div>
              <h3 class="h6 mb-1">អ្នកជួលសរុប</h3>
              <p class="h4 mb-0 fw-bold">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useNoteStore } from '@/stores/note';

const noteStore = useNoteStore();
const noteCount = computed(() => noteStore.notes?.length || 0);
</script>

<style scoped>
.dashboard-view {
  padding: 10px;
}

.stats-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #f1f5f9;
  transition: transform 0.2s;
}

.stats-card:hover {
  transform: translateY(-2px);
}

.icon-box {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-primary-soft { background-color: #e0f2fe; }
.bg-success-soft { background-color: #dcfce7; }
.bg-warning-soft { background-color: #fef9c3; }

.text-primary { color: #0ea5e9; }
.text-success { color: #22c55e; }
.text-warning { color: #eab308; }
</style>
