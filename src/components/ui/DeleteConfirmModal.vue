<template>
  <BaseModal :show="show" :title="title" @close="emit('close')">
    <div class="text-center py-3">
      <div class="delete-icon-wrapper mb-4">
        <i class="bi bi-exclamation-triangle-fill text-danger display-4"></i>
      </div>
      <h4 class="fw-bold mb-3">{{ message }}</h4>
      <p class="text-muted">{{ description }}</p>
    </div>

    <template #footer>
      <div class="d-flex gap-3 w-100">
        <BaseButton variant="secondary" @click="emit('close')" fullWidth>
          បោះបង់
        </BaseButton>
        <BaseButton variant="danger" @click="emit('confirm')" :loading="loading" fullWidth>
          លុបចេញ
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import BaseModal from './BaseModal.vue';
import BaseButton from './BaseButton.vue';

defineProps({
  show: Boolean,
  loading: Boolean,
  title: {
    type: String,
    default: 'បញ្ជាក់ការលុប'
  },
  message: {
    type: String,
    default: 'តើអ្នកប្រាកដថាចង់លុបទិន្នន័យនេះមែនទេ?'
  },
  description: {
    type: String,
    default: 'សកម្មភាពនេះមិនអាចត្រឡប់ក្រោយបានទេ បន្ទាប់ពីលុបចេញ។'
  }
});

const emit = defineEmits(['close', 'confirm']);
</script>

<style scoped>
.delete-icon-wrapper {
  width: 80px;
  height: 80px;
  background-color: var(--danger-soft);
  color: var(--danger);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
</style>
