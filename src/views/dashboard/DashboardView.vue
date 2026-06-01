<template>
  <div class="dashboard-view animate-entrance">
    <div class="header-section mb-5">
      <h1 class="display-6 fw-bold text-gradient">ផ្ទាំងគ្រប់គ្រង</h1>
      <p class="text-muted">សូមស្វាគមន៍មកកាន់ប្រព័ន្ធគ្រប់គ្រងផ្ទះជួល! មើលស្ថានភាពផ្ទះរបស់អ្នកនៅទីនេះ។</p>
    </div>
    
    <!-- Statistic Cards -->
    <div class="row g-4 mb-5">
      <div class="col-12 col-md-4 stagger-1">
        <StateCard 
          label="ចំនួនបន្ទប់សរុប" 
          :value="roomCount" 
          trendValue="12%" 
          variant="blue"
        >
          <template #icon>
            <i class="bi bi-door-open fs-4"></i>
          </template>
        </StateCard>
      </div>
      
      <div class="col-12 col-md-4 stagger-2">
        <StateCard 
          label="បន្ទប់ទំនេរ" 
          :value="availableRooms" 
          trendValue="8%" 
          variant="green"
        >
          <template #icon>
            <i class="bi bi-house-check fs-4"></i>
          </template>
        </StateCard>
      </div>

      <div class="col-12 col-md-4 stagger-3">
        <StateCard 
          label="អ្នកជួលសរុប" 
          :value="tenantCount" 
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
    <div class="section-header mb-4 d-flex align-items-center gap-2">
      <div class="section-indicator"></div>
      <h2 class="h4 fw-bold mb-0">មុខងាររហ័ស</h2>
    </div>
    <div class="row g-4 mb-5">
      <div class="col-12 col-sm-6 col-xl-3 stagger-4">
        <FeaturesCard 
          title="គ្រប់គ្រងវិក្កយបត្រ" 
          description="ពិនិត្យ និងបង្កើតវិក្កយបត្រសម្រាប់អ្នកជួល" 
          iconColor="var(--info)"
        >
          <template #icon>
            <i class="bi bi-receipt fs-4"></i>
          </template>
        </FeaturesCard>
      </div>
      <div class="col-12 col-sm-6 col-xl-3 stagger-5">
        <FeaturesCard 
          title="របាយការណ៍" 
          description="មើលរបាយការណ៍ចំណូល និងចំណាយប្រចាំខែ" 
          iconColor="var(--success)"
        >
          <template #icon>
            <i class="bi bi-graph-up-arrow fs-4"></i>
          </template>
        </FeaturesCard>
      </div>
      <div class="col-12 col-sm-6 col-xl-3 stagger-6">
        <FeaturesCard 
          title="កំណត់ត្រា" 
          description="រក្សាទុកព័ត៌មានសំខាន់ៗអំពីការជួល" 
          iconColor="var(--accent)"
        >
          <template #icon>
            <i class="bi bi-card-checklist fs-4"></i>
          </template>
        </FeaturesCard>
      </div>
      <div class="col-12 col-sm-6 col-xl-3 stagger-7">
        <FeaturesCard 
          title="ការកំណត់" 
          description="កំណត់ព័ត៌មានផ្ទះជួល និងតម្លៃសេវាកម្ម" 
          iconColor="var(--danger)"
        >
          <template #icon>
            <i class="bi bi-gear fs-4"></i>
          </template>
        </FeaturesCard>
      </div>
    </div>

    <!-- Recent Data Table -->
    <div class="section-header mb-4 d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center gap-2">
        <div class="section-indicator"></div>
        <h2 class="h4 fw-bold mb-0">បញ្ជីបន្ទប់ជួលថ្មីៗ</h2>
      </div>
      <BaseButton variant="outline" size="sm">មើលទាំងអស់</BaseButton>
    </div>

    <div class="card-modern overflow-hidden">
      <BaseTable 
        :items="rentStore.rooms.slice(0, 5)" 
        :fields="tableFields"
        :totalRows="Math.min(rentStore.rooms.length, 5)"
        :perPage="5"
        :currentPage="1"
      >
        <template #cell(status)="{ item }">
          <span :class="['badge-soft', item.status === 'Available' ? 'badge-success' : 'badge-warning']">
            <i :class="['bi', item.status === 'Available' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill']"></i>
            {{ item.status === 'Available' ? 'ទំនេរ' : 'មានអ្នកជួល' }}
          </span>
        </template>
        <template #cell(room_price)="{ item }">
          <span class="fw-bold text-primary">${{ item.room_price }}</span>
        </template>
        <template #cell(room_number)="{ item }">
          <span class="fw-semibold text-dark">#{{ item.room_number }}</span>
        </template>
      </BaseTable>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useRentStore } from '@/stores/rentroom';
import StateCard from '@/components/ui/StateCard.vue';
import BaseTable from '@/components/ui/BaseTable.vue';
import FeaturesCard from '@/components/ui/FeaturesCard.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const rentStore = useRentStore();

const roomCount = computed(() => rentStore.rooms?.length || 0);
const availableRooms = computed(() => rentStore.rooms?.filter(r => r.status === 'Available' || r.status === 'ទំនេរ')?.length || 0);
const tenantCount = computed(() => rentStore.tenants?.length || 0);

const tableFields = [
  { key: 'room_number', label: 'លេខបន្ទប់' },
  { key: 'room_price', label: 'តម្លៃជួល' },
  { key: 'status', label: 'ស្ថានភាព' },
  { key: 'tenant', label: 'អ្នកជួល' }
];

onMounted(() => {
  rentStore.fetchRooms();
  rentStore.fetchTenants();
});
</script>

<style scoped>
.dashboard-view {
  max-width: 1400px;
  margin: 0 auto;
}

.section-indicator {
  width: 4px;
  height: 24px;
  background: var(--primary);
  border-radius: var(--radius-full);
}

.text-dark {
  color: var(--text-main) !important;
}

.stagger-7 { animation-delay: 0.8s; }
</style>
