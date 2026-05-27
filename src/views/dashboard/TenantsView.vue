<template>
  <div class="tenants-view">
    <!-- ... header remains same ... -->
    <div class="header-section d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="display-6 fw-bold">បញ្ជីឈ្មោះអ្នកជួលទាំងអស់</h1>
        <p class="text-muted">គ្រប់គ្រងព័ត៌មាន និងទំនាក់ទំនងរបស់អ្នកជួល</p>
      </div>
      <BaseButton variant="primary" @click="isCreateModalOpen = true">
        <i class="bi bi-person-plus me-2"></i>បន្ថែមអ្នកជួល
      </BaseButton>
    </div>

    <!-- ... cards ... -->
    <div class="row g-4 mb-4">
      <div class="col-12 col-md-4">
        <StateCard label="អ្នកជួលសរុប" :value="rentStore.tenants.length" variant="blue">
          <template #icon><i class="bi bi-people fs-4"></i></template>
        </StateCard>
      </div>
      <div class="col-12 col-md-4">
        <StateCard label="អ្នកជួលថ្មីខែនេះ" value="3" variant="green">
          <template #icon><i class="bi bi-person-check fs-4"></i></template>
        </StateCard>
      </div>
      <div class="col-12 col-md-4">
        <StateCard label="កិច្ចសន្យាជិតផុតកំណត់" value="2" variant="red">
          <template #icon><i class="bi bi-exclamation-triangle fs-4"></i></template>
        </StateCard>
      </div>
    </div>

    <div class="card border-0 rounded-4 shadow-sm">
      <div class="card-body p-0">
        <BaseTable 
          :items="rentStore.tenants" 
          :fields="tableFields"
          :totalRows="rentStore.tenants.length"
          :perPage="10"
          :currentPage="1"
        >
          <template #cell(fullname)="{ item }">
            <div class="d-flex align-items-center">
              <div class="avatar-sm me-3 bg-light rounded-circle d-flex align-items-center justify-content-center">
                <i class="bi bi-person text-secondary"></i>
              </div>
              <span class="fw-medium">{{ item.fullname }}</span>
            </div>
          </template>
          <template #cell(phone)="{ item }">
            <span class="text-muted">{{ item.phone }}</span>
          </template>
          <template #cell(room)="{ item }">
            <span class="badge bg-info-soft text-info">{{ item.room || '-' }}</span>
          </template>
          <template #cell(actions)>
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-light text-primary border"><i class="bi bi-eye"></i></button>
              <button class="btn btn-sm btn-light text-success border"><i class="bi bi-telephone"></i></button>
            </div>
          </template>
        </BaseTable>
      </div>
    </div>

    <CreateTenantModal 
      :show="isCreateModalOpen" 
      @close="isCreateModalOpen = false"
      @submit="rentStore.fetchTenants"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRentStore } from '@/stores/rentroom';
import StateCard from '@/components/ui/StateCard.vue';
import BaseTable from '@/components/ui/BaseTable.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import CreateTenantModal from '@/components/ui/CreateTenantModal.vue';

const rentStore = useRentStore();
const isCreateModalOpen = ref(false);

const tableFields = [
  { key: 'fullname', label: 'ឈ្មោះអ្នកជួល', thClass: 'ps-4', tdClass: 'ps-4' },
  { key: 'phone', label: 'លេខទូរស័ព្ទ' },
  { key: 'room', label: 'លេខបន្ទប់' },
  { key: 'startDate', label: 'ថ្ងៃចូលនៅ' },
  { key: 'actions', label: 'សកម្មភាព' }
];

onMounted(() => {
  rentStore.fetchTenants();
});
</script>

<style scoped>
.tenants-view { padding: 10px; }
.bg-info-soft { background-color: #e0f2fe; }
.text-info { color: #0284c7; }
.avatar-sm { width: 32px; height: 32px; }
</style>
