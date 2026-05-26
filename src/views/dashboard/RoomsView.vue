<template>
  <div class="rooms-view">
    <div class="header-section d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="display-6 fw-bold">បញ្ជីបន្ទប់ជួលទាំងអស់</h1>
        <p class="text-muted">គ្រប់គ្រង និងពិនិត្យមើលស្ថានភាពបន្ទប់ជួលរបស់អ្នក</p>
      </div>
      <BaseButton variant="primary">
        <i class="bi bi-plus-lg me-2"></i>បន្ថែមបន្ទប់ថ្មី
      </BaseButton>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-12 col-md-3">
        <StateCard label="បន្ទប់សរុប" value="20" variant="blue">
          <template #icon><i class="bi bi-house-door fs-4"></i></template>
        </StateCard>
      </div>
      <div class="col-12 col-md-3">
        <StateCard label="បន្ទប់មានអ្នកជួល" value="12" variant="green">
          <template #icon><i class="bi bi-house-check fs-4"></i></template>
        </StateCard>
      </div>
      <div class="col-12 col-md-3">
        <StateCard label="បន្ទប់ទំនេរ" value="8" variant="yellow">
          <template #icon><i class="bi bi-house-exclamation fs-4"></i></template>
        </StateCard>
      </div>
      <div class="col-12 col-md-3">
        <StateCard label="ចំណូលរំពឹងទុក" value="$1,200" variant="purple">
          <template #icon><i class="bi bi-currency-dollar fs-4"></i></template>
        </StateCard>
      </div>
    </div>

    <div class="card border-0 rounded-4 shadow-sm">
      <div class="card-body p-0">
        <BaseTable 
          :items="rentStore.rooms" 
          :fields="tableFields"
          :totalRows="rentStore.rooms.length"
          :perPage="10"
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
          <template #cell(actions)>
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-light text-primary border"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-sm btn-light text-danger border"><i class="bi bi-trash"></i></button>
            </div>
          </template>
        </BaseTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRentStore } from '@/stores/rentroom';
import StateCard from '@/components/ui/StateCard.vue';
import BaseTable from '@/components/ui/BaseTable.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const rentStore = useRentStore();

const tableFields = [
  { key: 'id', label: 'លេខបន្ទប់', thClass: 'ps-4', tdClass: 'ps-4' },
  { key: 'type', label: 'ប្រភេទបន្ទប់' },
  { key: 'price', label: 'តម្លៃជួល' },
  { key: 'status', label: 'ស្ថានភាព' },
  { key: 'tenant', label: 'អ្នកជួល' },
  { key: 'actions', label: 'សកម្មភាព' }
];

onMounted(() => {
  rentStore.fetchRooms();
});
</script>

<style scoped>
.rooms-view { padding: 10px; }
.bg-success-soft { background-color: #dcfce7; }
.bg-warning-soft { background-color: #fef9c3; }
.text-success { color: #16a34a; }
.text-warning { color: #ca8a04; }
</style>
