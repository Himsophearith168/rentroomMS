<template>
  <div class="tenants-view animate-entrance">
    <div class="header-section d-flex justify-content-between align-items-center mb-5">
      <div>
        <h1 class="display-6 fw-bold text-gradient">បញ្ជីឈ្មោះអ្នកជួលទាំងអស់</h1>
        <p class="text-muted">គ្រប់គ្រងព័ត៌មាន និងទំនាក់ទំនងរបស់អ្នកជួល</p>
      </div>
      <div class="d-flex gap-2">
        <BaseButton variant="outline" @click="handlePrint">
          <i class="bi bi-printer me-2"></i>បោះពុម្ព
        </BaseButton>
        <BaseButton variant="primary" @click="isCreateModalOpen = true">
          <i class="bi bi-person-plus me-2"></i>បន្ថែមអ្នកជួល
        </BaseButton>
      </div>
    </div>

    <div class="row g-4 mb-5">
      <div class="col-12 col-md-4 stagger-1">
        <StateCard 
          label="អ្នកជួលសរុប" 
          :value="rentStore.tenants.length" 
          trendValue="+5"
          trendLabel="តាំងពីលើក"
          variant="blue">
          <template #icon><i class="bi bi-people fs-4"></i></template>
        </StateCard>
      </div>
      <div class="col-12 col-md-4 stagger-2">
        <StateCard 
          label="អ្នកជួលថ្មីខែនេះ" 
          value="3" 
          trendValue="+3"
          trendLabel="អ្នកថ្មី"
          variant="green">
          <template #icon><i class="bi bi-person-check fs-4"></i></template>
        </StateCard>
      </div>
      <div class="col-12 col-md-4 stagger-3">
        <StateCard 
          label="កិច្ចសន្យាជិតផុតកំណត់" 
          value="2" 
          trendValue="-1"
          trendLabel="ផុតកំណត់"
          variant="orange">
          <template #icon><i class="bi bi-exclamation-triangle fs-4"></i></template>
        </StateCard>
      </div>
    </div>

    <div class="card-modern overflow-hidden">
      <BaseTable 
        :items="rentStore.tenants" 
        :fields="tableFields"
        :totalRows="rentStore.tenants.length"
        :perPage="10"
        :currentPage="1"
        :loading="rentStore.loading"
      >
        <template #cell(fullname)="{ item }">
          <div class="d-flex align-items-center">
            <div class="avatar-sm me-3 bg-primary-soft text-primary rounded-circle d-flex align-items-center justify-content-center">
              <i class="bi bi-person-fill"></i>
            </div>
            <span class="fw-semibold">{{ item.fullname }}</span>
          </div>
        </template>
        <template #cell(phone)="{ item }">
          <span class="text-muted"><i class="bi bi-telephone me-2"></i>{{ item.phone }}</span>
        </template>
        <template #cell(actions)="{ item }">
          <div class="d-flex gap-2">
            <button class="action-btn assign" title="ប្រគល់បន្ទប់" @click="openAssignModal(item)">
              <i class="bi bi-key-fill"></i>
            </button>
            <button class="action-btn view" title="មើលព័ត៌មាន"><i class="bi bi-eye"></i></button>
            <button class="action-btn edit" title="កែប្រែ"><i class="bi bi-pencil-square"></i></button>
            <button class="action-btn delete" title="លុប" @click="confirmDelete(item)">
              <i class="bi bi-trash3"></i>
            </button>
          </div>
        </template>
      </BaseTable>
    </div>

    <CreateTenantModal 
      :show="isCreateModalOpen" 
      @close="isCreateModalOpen = false"
      @submit="rentStore.fetchTenants"
    />

    <CreateRoomAssignModal
      :show="isAssignModalOpen"
      :tenant="selectedTenant"
      @close="isAssignModalOpen = false"
      @submit="rentStore.fetchTenants"
    />

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmModal
      :show="showDeleteModal"
      :loading="rentStore.loading"
      :message="`តើអ្នកពិតជាចង់លុបអ្នកជួល '${selectedTenant?.fullname}' នេះមែនទេ?`"
      @close="showDeleteModal = false"
      @confirm="handleDelete"
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
import CreateRoomAssignModal from '@/components/ui/CreateRoomAssignModal.vue';
import DeleteConfirmModal from '@/components/ui/DeleteConfirmModal.vue';

const rentStore = useRentStore();
const isCreateModalOpen = ref(false);
const isAssignModalOpen = ref(false);
const showDeleteModal = ref(false);
const selectedTenant = ref(null);

const openAssignModal = (tenant) => {
  selectedTenant.value = tenant;
  isAssignModalOpen.value = true;
};

const confirmDelete = (tenant) => {
  selectedTenant.value = tenant;
  showDeleteModal.value = true;
};

const handleDelete = async () => {
  try {
    await rentStore.deleteTenant(selectedTenant.value.id);
    showDeleteModal.value = false;
  } catch (err) {
    alert('បរាជ័យក្នុងការលុប');
  }
};

const handlePrint = () => {
  window.print();
};

const tableFields = [
  { key: 'fullname', label: 'ឈ្មោះអ្នកជួល', thClass: 'ps-4', tdClass: 'ps-4' },
  { key: 'gender', label: 'ភេទ' },
  { key: 'phone', label: 'លេខទូរស័ព្ទ' },
  { key: 'telegram', label: 'តេឡេក្រាម' },
  { key: 'address', label: 'អាសយដ្ឋាន' },
  { key: 'actions', label: 'សកម្មភាព' }
];

onMounted(() => {
  rentStore.fetchTenants();
});
</script>

<style scoped>
.tenants-view {
  max-width: 1400px;
  margin: 0 auto;
}

.avatar-sm {
  width: 36px;
  height: 36px;
  font-size: 1.1rem;
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

.action-btn.view:hover {
  background: var(--primary-soft);
  color: var(--primary);
  border-color: var(--primary);
}

.action-btn.assign:hover {
  background: var(--warning-soft);
  color: var(--warning);
  border-color: var(--warning);
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

@media print {
  .header-section button, 
  .action-btn,
  .sidebar,
  .navbar {
    display: none !important;
  }
}
</style>
