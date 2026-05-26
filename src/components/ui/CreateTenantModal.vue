<template>
  <BaseModal :show="show" @close="emit('close')">
    <template #modal>
      <div class="modal-content border-0 rounded-4 shadow-lg">
        <div class="modal-header border-0 pb-0 pt-4 px-4 d-flex justify-content-between align-items-center">
          <h5 class="modal-title fw-bold fs-4">{{ title }}</h5>
          <button type="button" class="btn-close" @click="emit('close')"></button>
        </div>
        
        <div class="modal-body p-4">
          <form @submit.prevent="handleSubmit">
            <div class="row g-4">
              <div class="col-12">
                <BaseInput 
                  label="ឈ្មោះពេញ" 
                  v-model="formData.name" 
                  placeholder="ឧ. សុខ សាន"
                />
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
                  label="ថ្ងៃចូលនៅ" 
                  type="date" 
                  v-model="formData.startDate"
                />
              </div>

              <div class="col-12">
                <div class="input-group-custom">
                  <label class="custom-label">ព័ត៌មានបន្ថែម (អត្តសញ្ញាណប័ណ្ណ...)</label>
                  <textarea 
                    class="form-control custom-textarea" 
                    rows="3" 
                    v-model="formData.info"
                    placeholder="បញ្ចូលព័ត៌មានបន្ថែមអំពីអ្នកជួល..."
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div class="modal-footer border-0 pt-0 pb-4 px-4 gap-2">
          <BaseButton variant="secondary" @click="emit('close')" fullWidth>
            បោះបង់
          </BaseButton>
          <BaseButton variant="primary" @click="handleSubmit" :loading="loading" fullWidth>
            រក្សាទុក
          </BaseButton>
        </div>
      </div>
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
  name: '',
  phone: '',
  startDate: new Date().toISOString().split('T')[0],
  info: ''
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    await rentStore.createTenant({
      name: formData.name,
      phone: formData.phone,
      startDate: formData.startDate,
      info: formData.info
    });
    emit('submit', { ...formData });
    emit('close');
    // Reset form
    Object.assign(formData, {
      name: '',
      phone: '',
      startDate: new Date().toISOString().split('T')[0],
      info: ''
    });
  } catch (err) {
    console.error("Failed to create tenant:", err);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.modal-content {
  overflow: hidden;
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
