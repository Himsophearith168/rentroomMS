<template>
  <BaseModal :show="show" :title="title" @close="emit('close')">
    <form @submit.prevent="handleSubmit">
      <div class="row g-4">
        <div class="col-12">
          <BaseInput 
            label="លេខបន្ទប់" 
            v-model="formData.room_number" 
            placeholder="ឧ. R-001"
          />
        </div>
        
        <div class="col-md-6">
          <BaseInput 
            label="ជាន់ទី" 
            type="number" 
            v-model="formData.floor_number"
            placeholder="ឧ. 1"
          />
        </div>
        
        <div class="col-md-6">
          <BaseInput 
            label="តម្លៃជួល ($)" 
            type="number" 
            v-model="formData.room_price"
            placeholder="ឧ. 100"
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
    default: 'បង្កើតបន្ទប់ជួលថ្មី'
  }
});

const emit = defineEmits(['close', 'submit']);

const rentStore = useRentStore();
const loading = ref(false);
const formData = reactive({
  room_number: '',
  room_price: '',
  floor_number: '',
  description: ''
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    await rentStore.createRoom({
      room_number: formData.room_number,
      room_price: formData.room_price,
      floor_number: formData.floor_number,
      description: formData.description,
      status: 'Available'
    });
    emit('submit', { ...formData });
    emit('close');
    // Reset form
    Object.assign(formData, {
      room_number: '',
      room_price: '',
      floor_number: '',
      description: ''
    });
  } catch (err) {
    console.error("Failed to create room:", err);
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
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 6px;
  margin-left: 2px;
}

.custom-textarea {
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-main);
  background-color: var(--bg-card);
  transition: var(--transition);
  resize: none;
}

.custom-textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px var(--primary-soft);
  outline: none;
}
</style>
