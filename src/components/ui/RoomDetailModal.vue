<template>
  <BaseModal :show="show" title="ព័ត៌មានលម្អិតនៃបន្ទប់" @close="emit('close')">
    <div v-if="room" class="room-details">
      <div class="detail-group">
        <label>លេខបន្ទប់</label>
        <p class="h5 fw-bold text-primary">#{{ room.room_number }}</p>
      </div>
      
      <div class="row">
        <div class="col-6">
          <div class="detail-group">
            <label>ជាន់ទី</label>
            <p>{{ room.floor_number || '---' }}</p>
          </div>
        </div>
        <div class="col-6">
          <div class="detail-group">
            <label>តម្លៃជួល</label>
            <p class="fw-bold">${{ room.room_price }}</p>
          </div>
        </div>
      </div>

      <div class="detail-group">
        <label>ស្ថានភាព</label>
        <p>
          <span :class="['badge-soft', room.status === 'Available' ? 'badge-success' : 'badge-warning']">
            <i :class="['bi', room.status === 'Available' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill']"></i>
            {{ room.status === 'Available' ? 'ទំនេរ' : 'មានអ្នកជួល' }}
          </span>
        </p>
      </div>

      <div v-if="currentTenant" class="detail-group border-top pt-3 mt-3">
        <label>អ្នកជួលបច្ចុប្បន្ន</label>
        <div class="d-flex align-items-center gap-3 mt-2">
          <div class="tenant-avatar">
            <i class="bi bi-person-fill fs-4 text-muted"></i>
          </div>
          <div>
            <p class="mb-0 fw-bold">{{ currentTenant.name || currentTenant.tenant_name }}</p>
            <p class="mb-0 text-muted small">{{ currentTenant.phone || 'គ្មានលេខទូរស័ព្ទ' }}</p>
          </div>
        </div>
      </div>

      <div class="detail-group">
        <label>ការពិពណ៌នា</label>
        <p class="text-muted">{{ room.description || 'មិនមានការពិពណ៌នា' }}</p>
      </div>
    </div>

    <template #footer>
      <BaseButton variant="secondary" @click="emit('close')" fullWidth>
        បិទ
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue';
import { useRentStore } from '@/stores/rentroom';
import BaseModal from './BaseModal.vue';
import BaseButton from './BaseButton.vue';

const props = defineProps({
  show: Boolean,
  room: Object
});

const emit = defineEmits(['close']);
const rentStore = useRentStore();

const currentTenant = computed(() => {
  if (!props.room || props.room.status === 'Available' || props.room.status === 'ទំនេរ') return null;
  const assignment = rentStore.assignments.find(a => a.room_id === props.room.id && a.status === 'Active');
  return assignment ? (assignment.tenant || { tenant_name: assignment.tenant_name }) : null;
});
</script>

<style scoped>
.room-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-group label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  display: block;
}

.detail-group p {
  margin-bottom: 0;
  color: var(--text-main);
  font-size: 1rem;
}

.tenant-avatar {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: var(--surface-alt);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
