<template>
  <div class="rooms-view animate-entrance">
    <div class="header-section d-flex justify-content-between align-items-center mb-5">
      <div>
        <h1 class="display-6 fw-bold text-gradient">បញ្ជីបន្ទប់ជួលទាំងអស់</h1>
        <p class="text-muted">គ្រប់គ្រង និងពិនិត្យមើលស្ថានភាពបន្ទប់ជួលរបស់អ្នក</p>
      </div>
      <BaseButton variant="primary" @click="openCreateModal">
        <i class="bi bi-plus-lg me-2"></i>បន្ថែមបន្ទប់ថ្មី
      </BaseButton>
    </div>

    <div class="row g-4 mb-5">
      <div class="col-12 col-md-3 stagger-1">
        <StateCard 
          label="បន្ទប់សរុប" 
          :value="roomCount" 
          trendValue="+2"
          trendLabel="បន្ទប់ថ្មី"
          variant="blue">
          <template #icon><i class="bi bi-house-door fs-4"></i></template>
        </StateCard>
      </div>
      <div class="col-12 col-md-3 stagger-2">
        <StateCard 
          label="បន្ទប់មានអ្នកជួល" 
          :value="occupiedRooms" 
          trendValue="+1"
          trendLabel="សប្ताហ៍នេះ"
          variant="green">
          <template #icon><i class="bi bi-house-check fs-4"></i></template>
        </StateCard>
      </div>
      <div class="col-12 col-md-3 stagger-3">
        <StateCard 
          label="បន្ទប់ទំនេរ" 
          :value="availableRooms" 
          :trendValue="`-${occupiedRooms - availableRooms}`"
          trendLabel="ម្សិលមិញ"
          variant="yellow">
          <template #icon><i class="bi bi-house-exclamation fs-4"></i></template>
        </StateCard>
      </div>
      <div class="col-12 col-md-3 stagger-4">
        <StateCard 
          label="ចំណូលរំពឹងទុក" 
          :value="`$${totalPotentialRevenue}`" 
          trendValue="+5%"
          trendLabel="ប្រឹងប្រែង"
          variant="orange">
          <template #icon><i class="bi bi-currency-dollar fs-4"></i></template>
        </StateCard>
      </div>
    </div>

    <div class="card-modern overflow-hidden">
      <BaseTable 
        :items="rentStore.rooms" 
        :fields="tableFields"
        :totalRows="rentStore.rooms.length"
        :perPage="10"
        :currentPage="1"
        :loading="rentStore.loading"
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
          <span class="fw-semibold">#{{ item.room_number }}</span>
        </template>
        <template #cell(actions)>
          <div class="d-flex gap-2">
            <button class="action-btn edit" title="កែប្រែ"><i class="bi bi-pencil-square"></i></button>
            <button class="action-btn delete" title="លុប"><i class="bi bi-trash3"></i></button>
          </div>
        </template>
      </BaseTable>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, inject } from 'vue';
import { useRentStore } from '@/stores/rentroom';
import StateCard from '@/components/ui/StateCard.vue';
import BaseTable from '@/components/ui/BaseTable.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const rentStore = useRentStore();
const { toggleCreateModal } = inject("modals");

const roomCount = computed(() => rentStore.rooms.length);
const availableRooms = computed(() => rentStore.rooms.filter(r => r.status === 'Available').length);
const occupiedRooms = computed(() => rentStore.rooms.filter(r => r.status !== 'Available').length);
const totalPotentialRevenue = computed(() => {
  return rentStore.rooms.reduce((acc, room) => acc + (parseFloat(room.room_price) || 0), 0).toLocaleString();
});

const openCreateModal = () => {
  toggleCreateModal();
};

const tableFields = [
  { key: 'room_number', label: 'លេខបន្ទប់', thClass: 'ps-4', tdClass: 'ps-4' },
  { key: 'room_price', label: 'តម្លៃជួល' },
  { key: 'floor_number', label: 'ជាន់' },
  { key: 'status', label: 'ស្ថានភាព' },
  { key: 'description', label: 'ការពិពណ៌នា' },
  { key: 'actions', label: 'សកម្មភាព' }
];

onMounted(() => {
  rentStore.fetchRooms();
});
</script>

<style scoped>
.rooms-view {
  max-width: 1400px;
  margin: 0 auto;
}

.action-btn {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
  background: white;
  transition: var(--transition);
  cursor: pointer;
}

.action-btn.edit:hover {
  background: var(--info-soft);
  color: var(--info);
  border-color: var(--info);
}

.action-btn.delete:hover {
  background: var(--danger-soft);
  color: var(--danger);
  border-color: var(--danger);
}
</style>
