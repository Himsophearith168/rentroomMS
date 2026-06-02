<template>
  <div class="utility-view animate-entrance">
    <div class="header-section d-flex justify-content-between align-items-center mb-5">
      <div>
        <h1 class="display-6 fw-bold text-gradient">តម្លៃសេវាកម្ម</h1>
        <p class="text-muted">កំណត់តម្លៃសម្រាប់ប្រភេទសេវាកម្មនីមួយៗ</p>
      </div>
      <BaseButton variant="primary" @click="isCreateModalOpen = true">
        <i class="bi bi-plus-lg me-2"></i>បន្ថែមតម្លៃសេវាកម្ម
      </BaseButton>
    </div>

    <div class="card-modern overflow-hidden">
      <BaseTable 
        :items="utilityStore.utilityRates" 
        :fields="tableFields"
        :loading="utilityStore.loading"
      >
        <template #cell(utility_name)="{ item }">
          <span class="fw-semibold">{{ item.utility_name }}</span>
        </template>
        <template #cell(unit_price)="{ item }">
          <span class="fw-bold text-primary">${{ item.unit_price }}</span>
          <span class="text-muted small ms-1">/{{ item.unit }}</span>
        </template>
        <template #cell(is_active)="{ item }">
          <span :class="['badge-soft', item.is_active ? 'badge-success' : 'badge-secondary']">
            {{ item.is_active ? 'សកម្ម' : 'មិនសកម្ម' }}
          </span>
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
      :title="isEditing ? 'កែប្រែតម្លៃសេវាកម្ម' : 'បន្ថែមតម្លៃសេវាកម្មថ្មី'" 
      @close="closeModal"
    >
      <!-- Error alert inside modal -->
      <div v-if="submitError" class="alert alert-danger d-flex align-items-center mb-3" role="alert">
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        <span>{{ submitError }}</span>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="row g-4">
          <div class="col-12">
            <div class="input-group-custom">
              <label class="custom-label">ជ្រើសរើសប្រភេទសេវាកម្ម</label>
              <!-- FIX: use :value (v-bind) so the option value is bound as a Number, not a String -->
              <select class="form-select custom-select" v-model="formData.utility_type_id" required>
                <option disabled value="">-- ជ្រើសរើស --</option>
                <option
                  v-for="type in utilityStore.utilityTypes"
                  :key="type.utility_type_id"
                  :value="type.utility_type_id"
                >
                  {{ type.utility_name }} ({{ type.unit }})
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <BaseInput
              label="តម្លៃក្នុងមួយឯកតា ($)"
              type="number"
              step="0.01"
              min="0.01"
              v-model.number="formData.unit_price"
              placeholder="ឧ. 0.25"
              required
            />
          </div>
          <div class="col-md-6">
            <BaseInput
              label="ថ្ងៃចាប់ផ្តើមអនុវត្ត"
              type="date"
              v-model="formData.effective_from"
              required
            />
          </div>
          <div class="col-12">
            <div class="form-check form-switch mt-2">
              <input class="form-check-input" type="checkbox" id="isActiveSwitch" v-model="formData.is_active">
              <label class="form-check-label ms-2" for="isActiveSwitch">កំណត់ជាតម្លៃសកម្ម</label>
            </div>
          </div>
        </div>
      </form>
      <template #footer>
        <BaseButton variant="secondary" @click="closeModal" fullWidth>បោះបង់</BaseButton>
        <BaseButton variant="primary" @click="handleSubmit" :loading="utilityStore.loading" fullWidth>រក្សាទុក</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useUtilityStore } from '@/stores/utility';
import BaseTable from '@/components/ui/BaseTable.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import BaseInput from '@/components/ui/BaseInput.vue';

const utilityStore = useUtilityStore();
const isCreateModalOpen = ref(false);
const isEditing = ref(false);
const editingId = ref(null);
const submitError = ref(null); // FIX: track error message to display in modal

const formData = reactive({
  utility_type_id: '',   // will be a Number once selected (due to :value binding)
  unit_price: '',
  effective_from: new Date().toISOString().split('T')[0],
  is_active: true
});

const tableFields = [
  { key: 'utility_name', label: 'ប្រភេទសេវាកម្ម', thClass: 'ps-4', tdClass: 'ps-4' },
  { key: 'unit_price', label: 'តម្លៃ/ឯកតា' },
  { key: 'effective_from', label: 'ថ្ងៃចាប់ផ្តើម' },
  { key: 'is_active', label: 'ស្ថានភាព' },
  { key: 'actions', label: 'សកម្មភាព' }
];

const openEditModal = (item) => {
  isEditing.value = true;
  editingId.value = item.rate_id || item.id;
  submitError.value = null;
  Object.assign(formData, {
    utility_type_id: item.utility_type_id,
    unit_price: item.unit_price,
    effective_from: item.effective_from
      ? new Date(item.effective_from).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
    is_active: !!item.is_active
  });
  isCreateModalOpen.value = true;
};

const closeModal = () => {
  isCreateModalOpen.value = false;
  isEditing.value = false;
  editingId.value = null;
  submitError.value = null;
  Object.assign(formData, {
    utility_type_id: '',
    unit_price: '',
    effective_from: new Date().toISOString().split('T')[0],
    is_active: true
  });
};

const handleSubmit = async () => {
  submitError.value = null;
  if (!formData.utility_type_id || !formData.unit_price || !formData.effective_from) {
    submitError.value = 'សូមបំពេញព័ត៌មានឱ្យបានគ្រប់គ្រាន់';
    return;
  }
  if (Number(formData.unit_price) <= 0) {
    submitError.value = 'តម្លៃក្នុងមួយឯកតាត្រូវតែធំជាង 0';
    return;
  }
  const payload = {
    utility_type_id: Number(formData.utility_type_id),
    unit_price: Number(formData.unit_price),
    effective_from: formData.effective_from,
    is_active: formData.is_active ? 1 : 0
  };

  try {
    if (isEditing.value) {
      await utilityStore.updateUtilityRate(editingId.value, payload);
    } else {
      await utilityStore.createUtilityRate(payload);
    }
    closeModal();
  } catch (err) {
    // FIX: extract the actual server error message and show it in the modal
    const serverMsg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      'មានបញ្ហាក្នុងការរក្សាទុក';
    submitError.value = serverMsg;
    console.error('Failed to save utility rate:', err);
  }
};

const confirmDelete = async (item) => {
  const id = item.rate_id || item.id;
  if (!id) {
    console.error('Utility Rate ID is missing', item);
    return;
  }
  if (confirm('តើអ្នកពិតជាចង់លុបតម្លៃសេវាកម្មនេះមែនទេ?')) {
    try {
      await utilityStore.deleteUtilityRate(id);
    } catch (err) {
      const serverMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'មានបញ្ហាក្នុងការលុប';
      alert(serverMsg);
      console.error('Failed to delete utility rate:', err);
    }
  }
};

onMounted(() => {
  utilityStore.fetchUtilityTypes();
  utilityStore.fetchUtilityRates();
});
</script>

<style scoped>
.utility-view {
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
</style>