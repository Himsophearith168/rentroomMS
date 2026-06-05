<template>
  <div class="utility-type-view animate-entrance">
    <div class="header-section d-flex justify-content-between align-items-center mb-5">
      <div>
        <h1 class="display-6 fw-bold text-gradient">ប្រភេទសេវាកម្ម</h1>
        <p class="text-muted">គ្រប់គ្រងប្រភេទ និងតម្លៃសេវាកម្មប្រើប្រាស់ (ទឹក, ភ្លើង, ...)</p>
      </div>
      <div class="d-flex gap-2">
        <BaseButton variant="outline" @click="handlePrint">
          <i class="bi bi-printer me-2"></i>បោះពុម្ព
        </BaseButton>
        <BaseButton variant="primary" @click="isCreateModalOpen = true">
          <i class="bi bi-plus-lg me-2"></i>បន្ថែមប្រភេទសេវាកម្ម
        </BaseButton>
      </div>
    </div>

    <div class="card-modern overflow-hidden">
      <BaseTable 
        :items="utilityStore.utilityTypes" 
        :fields="tableFields"
        :loading="utilityStore.loading"
      >
        <template #cell(billing_type)="{ item }">
          <span :class="['badge-soft', item.billing_type === 'Meter' ? 'badge-primary' : 'badge-info']">
            {{ item.billing_type === 'Meter' ? 'តាមម៉ែត្រ' : 'ថ្លៃថេរ' }}
          </span>
        </template>
        <template #cell(unit)="{ item }">
          <span class="text-muted">{{ item.unit || '-' }}</span>
        </template>
        <template #cell(actions)="{ item }">
          <div class="d-flex gap-2">
            <button class="action-btn edit" title="កែប្រែ" @click="openEditModal(item)">
              <i class="bi bi-pencil-square"></i>
            </button>
            <button class="action-btn delete" title="លុប" @click="confirmDelete(item)">
              <i class="bi bi-trash3"></i>
            </button>
          </div>
        </template>
      </BaseTable>
    </div>

    <!-- Create/Edit Modal -->
    <BaseModal 
      :show="isCreateModalOpen" 
      :title="isEditing ? 'កែប្រែប្រភេទសេវាកម្ម' : 'បន្ថែមប្រភេទសេវាកម្មថ្មី'" 
      @close="closeModal"
    >
      <!-- Error Message Display -->
      <div v-if="utilityStore.error" class="alert alert-danger alert-dismissible fade show" role="alert">
        {{ utilityStore.error }}
        <button type="button" class="btn-close" @click="utilityStore.error = null"></button>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="row g-4">
          <div class="col-12">
            <BaseInput label="ឈ្មោះសេវាកម្ម" v-model="formData.utility_name" placeholder="ឧ. ភ្លើង, ទឹក, សំរាម..." required />
          </div>
          <div class="col-md-6">
            <div class="input-group-custom">
              <label class="custom-label">ប្រភេទការគិតលុយ</label>
              <select class="form-select custom-select" v-model="formData.billing_type" required>
                <option value="Meter">តាមម៉ែត្រ (Meter)</option>
                <option value="Fixed">ថ្លៃថេរ (Fixed)</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <BaseInput label="ឯកតា (Unit)" v-model="formData.unit" placeholder="ឧ. kWh, m3, ខែ..." />
          </div>
        </div>
      </form>
      <template #footer>
        <BaseButton variant="secondary" @click="closeModal" fullWidth>បោះបង់</BaseButton>
        <BaseButton variant="primary" @click="handleSubmit" :loading="utilityStore.loading" fullWidth>រក្សាទុក</BaseButton>
      </template>
    </BaseModal>

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmModal
      :show="showDeleteModal"
      :loading="utilityStore.loading"
      :message="`តើអ្នកពិតជាចង់លុបប្រភេទសេវាកម្ម '${selectedType?.utility_name}' នេះមែនទេ?`"
      @close="showDeleteModal = false"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useUtilityStore } from '@/stores/utility';
import BaseTable from '@/components/ui/BaseTable.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import DeleteConfirmModal from '@/components/ui/DeleteConfirmModal.vue';

const utilityStore = useUtilityStore();
const isCreateModalOpen = ref(false);
const showDeleteModal = ref(false);
const selectedType = ref(null);
const isEditing = ref(false);
const editingId = ref(null);

const formData = reactive({
  utility_name: '',
  billing_type: 'Meter',
  unit: ''
});

const tableFields = [
  { key: 'utility_name', label: 'ឈ្មោះសេវាកម្ម', thClass: 'ps-4', tdClass: 'ps-4' },
  { key: 'billing_type', label: 'ប្រភេទការគិតលុយ' },
  { key: 'unit', label: 'ឯកតា' },
  { key: 'actions', label: 'សកម្មភាព' }
];

const openEditModal = (item) => {
  isEditing.value = true;
  editingId.value = item.utility_type_id || item.id;
  Object.assign(formData, {
    utility_name: item.utility_name,
    billing_type: item.billing_type,
    unit: item.unit
  });
  isCreateModalOpen.value = true;
};

const closeModal = () => {
  isCreateModalOpen.value = false;
  isEditing.value = false;
  editingId.value = null;
  Object.assign(formData, {
    utility_name: '',
    billing_type: 'Meter',
    unit: ''
  });
};

const handleSubmit = async () => {
  if (!formData.utility_name) {
    utilityStore.error = 'សូមបំពេញឈ្មោះសេវាកម្ម';
    return;
  }
  
  try {
    if (isEditing.value) {
      await utilityStore.updateUtilityType(editingId.value, { ...formData });
    } else {
      await utilityStore.createUtilityType({ ...formData });
    }
    closeModal();
  } catch (err) {
    console.error("Failed to save utility type:", err);
    utilityStore.error = err?.response?.data?.message || 'មានបញ្ហាក្នុងការរក្សាទុក';
  }
};

const confirmDelete = (item) => {
  selectedType.value = item;
  showDeleteModal.value = true;
};

const handleDelete = async () => {
  const id = selectedType.value.utility_type_id || selectedType.value.id;
  try {
    await utilityStore.deleteUtilityType(id);
    showDeleteModal.value = false;
  } catch (err) {
    console.error("Failed to delete utility type:", err);
    utilityStore.error = err?.response?.data?.message || 'មានបញ្ហាក្នុងការលុប';
  }
};

const handlePrint = () => {
  window.print();
};

onMounted(() => {
  utilityStore.fetchUtilityTypes();
});
</script>

<style scoped>
.utility-type-view {
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

.input-group-custom {
  position: relative;
  display: flex;
  flex-direction: column;
}

.custom-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #718096;
  margin-bottom: 4px;
  margin-left: 4px;
}

.custom-select {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.custom-select:focus {
  border-color: #0d9488;
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
  outline: none;
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
