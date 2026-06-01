<template>
  <BaseModal :show="show" :title="`ប្រគល់បន្ទប់ឱ្យ: ${tenant?.fullname}`" size="lg" @close="emit('close')">
    <form @submit.prevent="handleSubmit">
      <div class="row g-4">
        <div class="col-12">
          <div class="input-group-custom">
            <label class="custom-label">ជ្រើសរើសបន្ទប់ដែលទំនេរ</label>
            <select class="form-select custom-select" v-model="formData.room_id" required>
              <option value="" disabled>-- សូមជ្រើសរើសបន្ទប់ --</option>
              <option v-for="room in availableRooms" :key="room.room_id" :value="room.room_id">
                បន្ទប់លេខ #{{ room.room_number }} - ${{ room.room_price }}/ខែ
              </option>
            </select>
          </div>
        </div>
        
        <div class="col-md-6">
          <BaseInput 
            label="ថ្ងៃចាប់ផ្តើម" 
            type="date" 
            v-model="formData.start_date"
            required
          />
        </div>

        <div class="col-md-6">
          <BaseInput 
            label="ប្រាក់កក់ ($)" 
            type="number" 
            v-model="formData.deposit_amount"
            placeholder="ឧ. 50"
          />
        </div>

        <div class="col-12">
          <div class="input-group-custom">
            <label class="custom-label">ថ្ងៃបញ្ចប់កិច្ចសន្យា (ប្រសិនបើមាន)</label>
            <BaseInput 
              type="date" 
              v-model="formData.end_date"
            />
          </div>
        </div>
      </div>
    </form>

    <template #footer>
      <BaseButton variant="secondary" @click="emit('close')" fullWidth>
        បោះបង់
      </BaseButton>
      <BaseButton variant="primary" @click="handleSubmit" :loading="loading" :disabled="!formData.room_id" fullWidth>
        បញ្ជាក់ការប្រគល់
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRentStore } from '@/stores/rentroom';
import BaseModal from './BaseModal.vue';
import BaseInput from './BaseInput.vue';
import BaseButton from './BaseButton.vue';

const props = defineProps({
  show: Boolean,
  tenant: Object
});

const emit = defineEmits(['close', 'submit']);

const rentStore = useRentStore();
const loading = ref(false);

const formData = reactive({
  room_id: '',
  tenant_id: '',
  start_date: new Date().toISOString().split('T')[0],
  end_date: '',
  deposit_amount: 0,
  status: 'Active'
});

const availableRooms = computed(() => {
  return rentStore.rooms.filter(room => room.status === 'Available' || room.status === 'ទំនេរ');
});

const handleSubmit = async () => {
  if (!formData.room_id) return;
  
  loading.value = true;
  try {
    const payload = {
      ...formData,
      tenant_id: props.tenant.tenant_id
    };
    await rentStore.createAssignment(payload);
    emit('submit', payload);
    emit('close');
    // Reset form
    Object.assign(formData, {
      room_id: '',
      tenant_id: '',
      start_date: new Date().toISOString().split('T')[0],
      end_date: '',
      deposit_amount: 0,
      status: 'Active'
    });
  } catch (err) {
    console.error("Failed to assign room:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (rentStore.rooms.length === 0) {
    rentStore.fetchRooms();
  }
});
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
  background-color: #fff;
}

.custom-select:focus {
  border-color: #0d9488;
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
  outline: none;
}
</style>
