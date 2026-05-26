<template>
  <div class="dashboard-view">
    <div class="header-section d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="display-6 fw-bold">ផ្ទាំងគ្រប់គ្រង</h1>
        <p class="text-muted">សូមស្វាគមន៍មកកាន់ប្រព័ន្ធគ្រប់គ្រងផ្ទះជួល!</p>
      </div>
      <BaseButton variant="primary" size="md">
        <template #left-icon>
          <i class="bi bi-plus-lg"></i>
        </template>
        បន្ថែមបន្ទប់ថ្មី
      </BaseButton>
    </div>
    
    <!-- Statistic Cards -->
    <div class="row g-4 mb-5">
      <div class="col-12 col-md-4">
        <StateCard 
          label="ចំនួនកំណត់ចំណាំ" 
          :value="noteCount" 
          trendValue="12%" 
          variant="blue"
        >
          <template #icon>
            <i class="bi bi-journal-text fs-4"></i>
          </template>
        </StateCard>
      </div>
      
      <div class="col-12 col-md-4">
        <StateCard 
          label="បន្ទប់ទំនេរ" 
          value="5" 
          trendValue="8%" 
          variant="green"
        >
          <template #icon>
            <i class="bi bi-house-door fs-4"></i>
          </template>
        </StateCard>
      </div>

      <div class="col-12 col-md-4">
        <StateCard 
          label="អ្នកជួលសរុប" 
          value="12" 
          trendValue="5%" 
          variant="yellow"
        >
          <template #icon>
            <i class="bi bi-people fs-4"></i>
          </template>
        </StateCard>
      </div>
    </div>

    <!-- Features Section -->
    <div class="section-title mb-3">
      <h2 class="h4 fw-bold mb-0">មុខងាររហ័ស</h2>
    </div>
    <div class="row g-4 mb-5">
      <div class="col-12 col-md-3">
        <FeaturesCard 
          title="គ្រប់គ្រងវិក្កយបត្រ" 
          description="ពិនិត្យ និងបង្កើតវិក្កយបត្រសម្រាប់អ្នកជួល" 
          iconColor="#3B82F6"
        >
          <template #icon>
            <i class="bi bi-receipt fs-4"></i>
          </template>
        </FeaturesCard>
      </div>
      <div class="col-12 col-md-3">
        <FeaturesCard 
          title="របាយការណ៍" 
          description="មើលរបាយការណ៍ចំណូល និងចំណាយប្រចាំខែ" 
          iconColor="#10B981"
        >
          <template #icon>
            <i class="bi bi-graph-up-arrow fs-4"></i>
          </template>
        </FeaturesCard>
      </div>
      <div class="col-12 col-md-3">
        <FeaturesCard 
          title="កំណត់ត្រា" 
          description="រក្សាទុកព័ត៌មានសំខាន់ៗអំពីការជួល" 
          iconColor="#F59E0B"
        >
          <template #icon>
            <i class="bi bi-card-checklist fs-4"></i>
          </template>
        </FeaturesCard>
      </div>
      <div class="col-12 col-md-3">
        <FeaturesCard 
          title="ការកំណត់" 
          description="កំណត់ព័ត៌មានផ្ទះជួល និងតម្លៃសេវាកម្ម" 
          iconColor="#EF4444"
        >
          <template #icon>
            <i class="bi bi-gear fs-4"></i>
          </template>
        </FeaturesCard>
      </div>
    </div>

    <!-- Recent Data Table -->
    <div class="section-title mb-3 d-flex justify-content-between align-items-center">
      <h2 class="h4 fw-bold mb-0">បញ្ជីបន្ទប់ជួលថ្មីៗ</h2>
      <BaseButton variant="outline" size="sm">មើលទាំងអស់</BaseButton>
    </div>

    <div class="card border-0 rounded-4 shadow-sm">
      <div class="card-body p-0">
        <BaseTable 
          :items="mockRooms" 
          :fields="tableFields"
          :totalRows="mockRooms.length"
          :perPage="5"
          :currentPage="1"
        >
          <template #cell(status)="{ item }">
            <span :class="['badge rounded-pill', item.status === 'ទំនេរ' ? 'bg-success-soft text-success' : 'bg-warning-soft text-warning']">
              {{ item.status }}
            </span>
          </template>
          <template #cell(price)="{ item }">
            <span class="fw-bold text-primary">${{ item.price }}</span>
          </template>
        </BaseTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useNoteStore } from '@/stores/note';
import StateCard from '@/components/ui/StateCard.vue';
import BaseTable from '@/components/ui/BaseTable.vue';
import FeaturesCard from '@/components/ui/FeaturesCard.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const noteStore = useNoteStore();
const noteCount = computed(() => noteStore.notes?.length || 0);

const tableFields = [
  { key: 'id', label: 'លេខបន្ទប់', thClass: 'ps-4', tdClass: 'ps-4' },
  { key: 'type', label: 'ប្រភេទបន្ទប់' },
  { key: 'price', label: 'តម្លៃជួល' },
  { key: 'status', label: 'ស្ថានភាព' },
  { key: 'tenant', label: 'អ្នកជួល' }
];

const mockRooms = ref([
  { id: 'R-001', type: 'បន្ទប់ធម្មតា', price: 50, status: 'ទំនេរ', tenant: '-' },
  { id: 'R-002', type: 'បន្ទប់វីអាយភី', price: 100, status: 'មានអ្នកជួល', tenant: 'សុខ សាន' },
  { id: 'R-003', type: 'បន្ទប់ធម្មតា', price: 50, status: 'ទំនេរ', tenant: '-' },
  { id: 'R-004', type: 'បន្ទប់ធម្មតា', price: 50, status: 'មានអ្នកជួល', tenant: 'កែវ សុភា' },
  { id: 'R-005', type: 'បន្ទប់វីអាយភី', price: 100, status: 'ទំនេរ', tenant: '-' },
]);
</script>

<style scoped>
.dashboard-view {
  padding: 10px;
}

.bg-success-soft { background-color: #dcfce7; }
.bg-warning-soft { background-color: #fef9c3; }
.text-success { color: #16a34a; }
.text-warning { color: #ca8a04; }

.section-title h2 {
  color: #1e293b;
}
</style>
