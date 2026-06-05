<template>
  <div class="room-assign-view animate-entrance">
    <div class="header-section d-flex justify-content-between align-items-center mb-5">
      <div>
        <h1 class="display-6 fw-bold text-gradient">ការប្រគល់បន្ទប់ជួល</h1>
        <p class="text-muted">គ្រប់គ្រងការប្រគល់ និងទទួលបន្ទប់ជួល</p>
      </div>
      <div class="d-flex gap-2">
        <BaseButton variant="outline" @click="handlePrint">
          <i class="bi bi-printer me-2"></i>បោះពុម្ពបញ្ជី
        </BaseButton>
      </div>
    </div>

    <div class="row g-4 mb-5">
      <div class="col-12 col-md-4 stagger-1">
        <StateCard 
          label="ការជួលបច្ចុប្បន្ន" 
          :value="activeAssignmentsCount" 
          variant="blue">
          <template #icon><i class="bi bi-key fs-4"></i></template>
        </StateCard>
      </div>
      <div class="col-12 col-md-4 stagger-2">
        <StateCard 
          label="ការជួលបានបញ្ចប់" 
          :value="endedAssignmentsCount" 
          variant="green">
          <template #icon><i class="bi bi-check2-circle fs-4"></i></template>
        </StateCard>
      </div>
      <div class="col-12 col-md-4 stagger-3">
        <StateCard 
          label="សរុបការជួល" 
          :value="rentStore.assignments.length" 
          variant="orange">
          <template #icon><i class="bi bi-layers fs-4"></i></template>
        </StateCard>
      </div>
    </div>

    <div class="card-modern overflow-hidden">
      <BaseTable 
        :items="rentStore.assignments" 
        :fields="tableFields"
        :totalRows="rentStore.assignments.length"
        :perPage="10"
        :currentPage="1"
        :loading="rentStore.loading"
      >
        <template #cell(status)="{ item }">
          <span :class="['badge-soft', item.status === 'Active' ? 'badge-success' : 'badge-secondary']">
            {{ item.status === 'Active' ? 'កំពុងជួល' : 'បញ្ចប់ការជួល' }}
          </span>
        </template>
        <template #cell(room_number)="{ item }">
          <span class="fw-bold">#{{ item.room_number }}</span>
        </template>
        <template #cell(fullname)="{ item }">
          <span class="fw-semibold text-dark">{{ item.fullname }}</span>
        </template>
        <template #cell(rent_date)="{ item }">
          <span class="text-muted">{{ item.rent_date ? new Date(item.rent_date).toLocaleDateString('km-KH') : '-' }}</span>
        </template>
        <template #cell(actions)="{ item }">
          <div class="d-flex gap-2">
            <button 
              v-if="item.status === 'Active'"
              class="action-btn end" 
              title="បញ្ចប់ការជួល" 
              @click="handleEndRental(item)"
            >
              <i class="bi bi-door-closed"></i>
            </button>
            <button class="action-btn delete" title="លុប" @click="confirmDelete(item)">
              <i class="bi bi-trash3"></i>
            </button>
          </div>
        </template>
      </BaseTable>
    </div>

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmModal
      :show="showDeleteModal"
      :loading="rentStore.loading"
      :message="deleteMessage"
      @close="showDeleteModal = false"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useRentStore } from '@/stores/rentroom';
import StateCard from '@/components/ui/StateCard.vue';
import BaseTable from '@/components/ui/BaseTable.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import DeleteConfirmModal from '@/components/ui/DeleteConfirmModal.vue';

const rentStore = useRentStore();
const showDeleteModal = ref(false);
const selectedAssignment = ref(null);
const deleteMessage = ref('');
const deleteAction = ref(null); // 'end' or 'delete'

const activeAssignmentsCount = computed(() => rentStore.assignments.filter(a => a.status === 'Active').length);
const endedAssignmentsCount = computed(() => rentStore.assignments.filter(a => a.status === 'Ended').length);

const tableFields = [
  { key: 'room_number', label: 'លេខបន្ទប់', thClass: 'ps-4', tdClass: 'ps-4' },
  { key: 'fullname', label: 'អ្នកជួល' },
  { key: 'rent_date', label: 'ថ្ងៃជួល' },
  { key: 'deposit', label: 'ប្រាក់កក់' },
  { key: 'status', label: 'ស្ថានភាព' },
  { key: 'actions', label: 'សកម្មភាព' }
];

const handleEndRental = (assignment) => {
  selectedAssignment.value = assignment;
  deleteMessage.value = `តើអ្នកពិតជាចង់បញ្ចប់ការជួលបន្ទប់ #${assignment.room_number} នេះមែនទេ?`;
  deleteAction.value = 'end';
  showDeleteModal.value = true;
};

const confirmDelete = (assignment) => {
  selectedAssignment.value = assignment;
  deleteMessage.value = 'តើអ្នកពិតជាចង់លុបព័ត៌មានការជួលនេះមែនទេ?';
  deleteAction.value = 'delete';
  showDeleteModal.value = true;
};

const handleDelete = async () => {
  try {
    if (deleteAction.value === 'end') {
      const endDate = new Date().toISOString().split('T')[0];
      await rentStore.endAssignment(selectedAssignment.value.assignment_id, endDate);
    } else {
      await rentStore.deleteAssignment(selectedAssignment.value.assignment_id);
    }
    showDeleteModal.value = false;
  } catch (err) {
    alert('ប្រតិបត្តិការបរាជ័យ');
  }
};

const handlePrint = () => {
  window.print();
};

onMounted(() => {
  rentStore.fetchAssignments();
});
</script>

<style scoped>
.room-assign-view {
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

.action-btn.end:hover {
  background: var(--warning-soft);
  color: var(--warning);
  border-color: var(--warning);
}

.action-btn.delete:hover {
  background: var(--danger-soft);
  color: var(--danger);
  border-color: var(--danger);
}

@media print {
  .header-section button, 
  .action-btn,
  .sidebar,
  .navbar {
    display: none !important;
  }
  
  .card-modern {
    border: none !important;
    box-shadow: none !important;
  }
}
</style>
