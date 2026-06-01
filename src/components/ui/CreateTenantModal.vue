<template>
  <BaseModal :show="show" :title="title" size="lg" @close="emit('close')">
    <form @submit.prevent="handleSubmit">
      <div class="row g-4">
        <div class="col-md-8">
          <BaseInput 
            label="ឈ្មោះពេញ" 
            v-model="formData.fullname" 
            placeholder="ឧ. សុខ សាន"
            required
          />
        </div>
        
        <div class="col-md-4">
          <div class="input-group-custom">
            <label class="custom-label">ភេទ</label>
            <select class="form-select custom-select" v-model="formData.gender">
              <option value="Male">ប្រុស</option>
              <option value="Female">ស្រី</option>
            </select>
          </div>
        </div>

        <div class="col-md-6">
          <BaseInput 
            label="លេខទូរស័ព្ទ" 
            v-model="formData.phone" 
            placeholder="ឧ. 012 345 678"
          />
        </div>
        
        <div class="col-md-6">
          <BaseInput 
            label="តេឡេក្រាម" 
            v-model="formData.telegram" 
            placeholder="ឧ. @username"
          />
        </div>

        <div class="col-md-6">
          <BaseInput 
            label="អត្តសញ្ញាណប័ណ្ណ" 
            v-model="formData.id_card" 
            placeholder="លេខអត្តសញ្ញាណប័ណ្ណ"
          />
        </div>

        <div class="col-md-6">
          <BaseInput 
            label="លេខទំនាក់ទំនងអាសន្ន" 
            v-model="formData.emergency_contact" 
            placeholder="ឈ្មោះ និងលេខទូរស័ព្ទ"
          />
        </div>

        <div class="col-12">
          <div class="input-group-custom">
            <label class="custom-label">អាសយដ្ឋាន</label>
            <textarea 
              class="form-control custom-textarea" 
              rows="2" 
              v-model="formData.address"
              placeholder="បញ្ចូលអាសយដ្ឋាន..."
            ></textarea>
          </div>
        </div>
      </div>
    </form>

    <template #footer>
      <BaseButton variant="secondary" @click="emit('close')" fullWidth>
        បោះបង់
      </BaseButton>
      <BaseButton variant="primary" @click="handleSubmit" :loading="loading" fullWidth>
        រក្សាទុក
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRentStore } from '@/stores/rentroom';
import BaseModal from './BaseModal.vue';
import BaseInput from './BaseInput.vue';
import BaseButton from './BaseButton.vue';

const props = defineProps({
  show: Boolean,
  title: {
    type: String,
    default: 'បន្ថែមអ្នកជួលថ្មី'
  }
});

const emit = defineEmits(['close', 'submit']);

const rentStore = useRentStore();
const loading = ref(false);
const formData = reactive({
  fullname: '',
  gender: 'Male',
  phone: '',
  telegram: '',
  id_card: '',
  emergency_contact: '',
  address: ''
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    await rentStore.createTenant({ ...formData });
    emit('submit', { ...formData });
    emit('close');
    // Reset form
    Object.assign(formData, {
      fullname: '',
      gender: 'Male',
      phone: '',
      telegram: '',
      id_card: '',
      emergency_contact: '',
      address: ''
    });
  } catch (err) {
    console.error("Failed to create tenant:", err);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
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

.custom-textarea {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px;
  font-size: 0.95rem;
  transition: all 0.2s;
  resize: none;
}

.custom-textarea:focus {
  border-color: #0d9488;
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
  outline: none;
}
</style>
