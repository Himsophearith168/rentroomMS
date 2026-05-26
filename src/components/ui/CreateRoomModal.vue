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
                  label="លេខបន្ទប់" 
                  v-model="formData.roomNumber" 
                  placeholder="ឧ. R-001"
                />
              </div>
              
              <div class="col-md-6">
                <div class="input-group-custom">
                  <label class="custom-label">ប្រភេទបន្ទប់</label>
                  <select class="form-select custom-select" v-model="formData.type">
                    <option value="បន្ទប់ធម្មតា">បន្ទប់ធម្មតា</option>
                    <option value="បន្ទប់វីអាយភី">បន្ទប់វីអាយភី</option>
                  </select>
                </div>
              </div>
              
              <div class="col-md-6">
                <BaseInput 
                  label="តម្លៃជួល ($)" 
                  type="number" 
                  v-model="formData.price"
                />
              </div>

              <div class="col-12">
                <div class="input-group-custom">
                  <label class="custom-label">ពិពណ៌នាបន្ថែម</label>
                  <textarea 
                    class="form-control custom-textarea" 
                    rows="3" 
                    v-model="formData.description"
                    placeholder="បញ្ចូលព័ត៌មានបន្ថែមអំពីបន្ទប់..."
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
import BaseModal from './BaseModal.vue';
import BaseInput from './BaseInput.vue';
import BaseButton from './BaseButton.vue';

const props = defineProps({
  show: Boolean,
  title: {
    type: String,
    default: 'បង្កើតបន្ទប់ជួលថ្មី'
  }
});

const emit = defineEmits(['close', 'submit']);

const loading = ref(false);
const formData = reactive({
  roomNumber: '',
  type: 'បន្ទប់ធម្មតា',
  price: '',
  description: ''
});

const handleSubmit = () => {
  loading.value = true;
  // Simulate API call
  setTimeout(() => {
    emit('submit', { ...formData });
    loading.value = false;
    emit('close');
    // Reset form
    Object.assign(formData, {
      roomNumber: '',
      type: 'បន្ទប់ធម្មតា',
      price: '',
      description: ''
    });
  }, 1000);
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

.custom-select, .custom-textarea {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.custom-select:focus, .custom-textarea:focus {
  border-color: #0d9488;
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
  outline: none;
}

.custom-textarea {
  resize: none;
}
</style>
