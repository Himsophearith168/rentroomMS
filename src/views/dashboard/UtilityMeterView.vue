<template>
  <div class="utility-meter-view animate-entrance">
    <div class="header-section d-flex justify-content-between align-items-center mb-5">
      <div>
        <h1 class="display-6 fw-bold text-gradient">ការវាស់ស្ទង់ម៉ែត្រ</h1>
        <p class="text-muted">បញ្ចូលលេខម៉ែត្រ (ភ្លើង, ទឹក) សម្រាប់បន្ទប់នីមួយៗ</p>
      </div>
      <BaseButton variant="primary" @click="isCreateModalOpen = true">
        <i class="bi bi-plus-lg me-2"></i>កត់ត្រាលេខម៉ែត្រថ្មី
      </BaseButton>
    </div>

    <div class="card-modern overflow-hidden">
      <BaseTable 
        :items="utilityStore.meterReadings" 
        :fields="tableFields"
        :loading="utilityStore.loading"
      >
        <template #cell(room_number)="{ item }">
          <span class="fw-bold">#{{ item.room_number }}</span>
        </template>
        <template #cell(utility_name)="{ item }">
          <span class="badge-soft badge-primary">{{ item.utility_name }}</span>
        </template>
        <template #cell(meter_value)="{ item }">
          <span class="fw-bold text-dark">{{ item.meter_value }}</span>
          <span class="text-muted small ms-1">{{ item.unit }}</span>
        </template>
        <template #cell(reading_date)="{ item }">
          <span class="text-muted">{{ item.reading_date }}</span>
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
      :title="isEditing ? 'កែប្រែការវាស់ស្ទង់' : 'កត់ត្រាលេខម៉ែត្រថ្មី'" 
      @close="closeModal"
    >
      <form @submit.prevent="handleSubmit">
        <div class="row g-4">
          <div class="col-md-6">
            <div class="input-group-custom">
              <label class="custom-label">បន្ទប់</label>
              <select class="form-select custom-select" v-model="formData.room_id" required>
                <option v-for="room in rentStore.rooms" :key="room.room_id" :value="room.room_id">
                  បន្ទប់លេខ #{{ room.room_number }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="input-group-custom">
              <label class="custom-label">ប្រភេទសេវាកម្ម (តាមម៉ែត្រ)</label>
              <select class="form-select custom-select" v-model="formData.utility_type_id" required>
                <option v-for="type in meterUtilityTypes" :key="type.utility_type_id" :value="type.utility_type_id">
                  {{ type.utility_name }} ({{ type.unit }})
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <BaseInput label="លេខម៉ែត្រ" type="number" step="0.01" v-model="formData.meter_value" placeholder="ឧ. 1250.5" required />
          </div>
          <div class="col-md-6">
            <BaseInput label="ថ្ងៃវាស់ស្ទង់" type="date" v-model="formData.reading_date" required />
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
import { ref, reactive, onMounted, computed } from 'vue';
import { useUtilityStore } from '@/stores/utility';
import { useRentStore } from '@/stores/rentroom';
import BaseTable from '@/components/ui/BaseTable.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import BaseInput from '@/components/ui/BaseInput.vue';

const utilityStore = useUtilityStore();
const rentStore = useRentStore();

const isCreateModalOpen = ref(false);
const isEditing = ref(false);
const editingId = ref(null);

const formData = reactive({
  room_id: '',
  utility_type_id: '',
  meter_value: '',
  reading_date: new Date().toISOString().split('T')[0]
});

const meterUtilityTypes = computed(() => {
  return utilityStore.utilityTypes.filter(t => t.billing_type === 'Meter');
});

const tableFields = [
  { key: 'room_number', label: 'លេខបន្ទប់', thClass: 'ps-4', tdClass: 'ps-4' },
  { key: 'utility_name', label: 'ប្រភេទសេវាកម្ម' },
  { key: 'meter_value', label: 'លេខម៉ែត្រ' },
  { key: 'reading_date', label: 'ថ្ងៃវាស់ស្ទង់' },
  { key: 'actions', label: 'សកម្មភាព' }
];

const openEditModal = (item) => {
  isEditing.value = true;
  editingId.value = item.reading_id || item.id;
  Object.assign(formData, {
    room_id: item.room_id,
    utility_type_id: item.utility_type_id,
    meter_value: item.meter_value,
    reading_date: item.reading_date ? new Date(item.reading_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  });
  isCreateModalOpen.value = true;
};

const closeModal = () => {
  isCreateModalOpen.value = false;
  isEditing.value = false;
  editingId.value = null;
  Object.assign(formData, {
    room_id: '',
    utility_type_id: '',
    meter_value: '',
    reading_date: new Date().toISOString().split('T')[0]
  });
};

const handleSubmit = async () => {
  if (!formData.room_id || !formData.utility_type_id || !formData.meter_value) return;
  
  try {
    if (isEditing.value) {
      await utilityStore.updateMeterReading(editingId.value, { ...formData });
    } else {
      await utilityStore.createMeterReading({ ...formData });
    }
    closeModal();
  } catch (err) {
    console.error("Failed to save meter reading:", err);
  }
};

const confirmDelete = async (item) => {
  const id = item.reading_id || item.id;
  if (!id) {
    console.error("Meter Reading ID is missing", item);
    return;
  }
  
  if (confirm(`តើអ្នកពិតជាចង់លុបការវាស់ស្ទង់នេះមែនទេ?`)) {
    try {
      await utilityStore.deleteMeterReading(id);
    } catch (err) {
      console.error("Failed to delete meter reading:", err);
    }
  }
};

onMounted(() => {
  utilityStore.fetchUtilityTypes();
  utilityStore.fetchMeterReadings();
  rentStore.fetchRooms();
});
</script>

<style scoped>
.utility-meter-view {
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
