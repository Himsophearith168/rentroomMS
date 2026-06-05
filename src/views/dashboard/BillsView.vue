<template>
  <div class="bills-view animate-entrance">
    <!-- Error Alert -->
    <div v-if="billingStore.error" class="alert alert-warning alert-dismissible fade show mb-4" role="alert">
      <i class="bi bi-exclamation-triangle me-2"></i>{{ billingStore.error }}
      <button type="button" class="btn-close" @click="billingStore.error = null"></button>
    </div>

    <div class="header-section d-flex justify-content-between align-items-center mb-5">
      <div>
        <h1 class="display-6 fw-bold text-gradient">វិក្កយបត្រ (Bills)</h1>
        <p class="text-muted">គ្រប់គ្រងការចេញវិក្កយបត្រប្រចាំខែសម្រាប់អ្នកជួល</p>
      </div>
      <BaseButton variant="primary" @click="isCreateModalOpen = true">
        <i class="bi bi-receipt me-2"></i>បង្កើតវិក្កយបត្រថ្មី
      </BaseButton>
    </div>

    <div class="row g-4 mb-5">
      <div class="col-12 col-md-4 stagger-1">
        <StateCard 
          label="វិក្កយបត្រសរុប" 
          :value="billingStore.bills.length" 
          :trendValue="`+${Math.floor(Math.random() * 5)}`"
          trendLabel="ថ្មីថ្ងៃនេះ"
          variant="blue">
          <template #icon><i class="bi bi-file-earmark-text fs-4"></i></template>
        </StateCard>
      </div>
      <div class="col-12 col-md-4 stagger-2">
        <StateCard 
          label="ទឹកប្រាក់សរុប" 
          :value="`$${totalBillAmount}`" 
          :trendValue="`+${Math.floor(billingStore.bills.length / 2)}`"
          trendLabel="រង់ចាំការបង់"
          variant="green">
          <template #icon><i class="bi bi-cash-stack fs-4"></i></template>
        </StateCard>
      </div>
      <div class="col-12 col-md-4 stagger-3">
        <StateCard 
          label="មិនទាន់បង់" 
          :value="unpaidCount" 
          :trendValue="`-${Math.floor(unpaidCount / 2)}`"
          trendLabel="បានបង់"
          variant="orange">
          <template #icon><i class="bi bi-hourglass-split fs-4"></i></template>
        </StateCard>
      </div>
    </div>

    <div class="card-modern overflow-hidden">
      <BaseTable 
        :items="billingStore.bills" 
        :fields="tableFields"
        :totalRows="billingStore.bills.length"
        :perPage="10"
        :currentPage="1"
        :loading="billingStore.loading"
      >
        <template #cell(status)="{ item }">
          <span :class="['badge-soft', getStatusBadge(item.status)]">
            <i :class="['bi', item.status === 'Paid' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill']"></i>
            {{ getStatusText(item.status) }}
          </span>
        </template>
        <template #cell(total_amount)="{ item }">
          <span class="fw-bold text-dark">${{ item.total_amount }}</span>
        </template>
        <template #cell(bill_id)="{ item }">
          <span class="fw-semibold">#{{ item.bill_id }}</span>
        </template>
        <template #cell(bill_month)="{ item }">
          <span class="text-muted">{{ item.bill_month ? new Date(item.bill_month).toLocaleDateString('km-KH', { month: 'long', year: 'numeric' }) : '-' }}</span>
        </template>
        <template #cell(actions)="{ item }">
          <div class="d-flex gap-2">
            <button class="action-btn view" title="មើលលម្អិត" @click="$router.push({ name: 'BillDetail', query: { bill_id: item.bill_id } })">
              <i class="bi bi-eye"></i>
            </button>
            <button class="action-btn print" title="បោះពុម្ព" @click="handlePrintBill(item)">
              <i class="bi bi-printer"></i>
            </button>
            <button class="action-btn delete" title="លុប" @click="confirmDelete(item)">
              <i class="bi bi-trash3"></i>
            </button>
          </div>
        </template>
      </BaseTable>
    </div>

    <!-- Create Bill Modal -->
    <BaseModal :show="isCreateModalOpen" title="បង្កើតវិក្កយបត្រថ្មី" size="lg" @close="isCreateModalOpen = false">
      <form @submit.prevent="handleCreateBill">
        <div class="row g-4">
          <div class="col-12">
            <div class="input-group-custom">
              <label class="custom-label">ជ្រើសរើសការជួល (បន្ទប់ - អ្នកជួល)</label>
              <select class="form-select custom-select" v-model="formData.assignment_id" required>
                <option disabled value="">សូមជ្រើសរើសការជួល</option>
                <option v-for="asgn in rentStore.assignments" :key="asgn.assignment_id" :value="asgn.assignment_id">
                  #{{ asgn.room_number }} - {{ asgn.fullname }} ({{ asgn.status }})
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <BaseInput label="សម្រាប់ខែ" type="month" v-model="formData.bill_month" required />
          </div>
          <div class="col-md-6">
            <BaseInput label="ថ្ងៃផុតកំណត់" type="date" v-model="formData.due_date" required />
          </div>
          <div class="col-12">
            <BaseInput label="ថ្លៃផ្សេងៗ ($)" type="number" step="0.01" v-model="formData.other_fee" />
          </div>
        </div>
      </form>
      <template #footer>
        <BaseButton variant="secondary" @click="isCreateModalOpen = false" fullWidth>បោះបង់</BaseButton>
        <BaseButton variant="primary" @click="handleCreateBill" :loading="billingStore.loading" fullWidth>បង្កើតវិក្កយបត្រ</BaseButton>
      </template>
    </BaseModal>

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmModal
      :show="showDeleteModal"
      :loading="billingStore.loading"
      :message="`តើអ្នកពិតជាចង់លុបវិក្កយបត្រ #${selectedBill?.bill_id} នេះមែនទេ?`"
      @close="showDeleteModal = false"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useBillingStore } from '@/stores/billing';
import { useRentStore } from '@/stores/rentroom';
import { useAuthStore } from '@/stores/authentication';
import StateCard from '@/components/ui/StateCard.vue';
import BaseTable from '@/components/ui/BaseTable.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import DeleteConfirmModal from '@/components/ui/DeleteConfirmModal.vue';

const billingStore = useBillingStore();
const rentStore = useRentStore();
const authStore = useAuthStore();
const router = useRouter();

const isCreateModalOpen = ref(false);
const showDeleteModal = ref(false);
const selectedBill = ref(null);
const formData = ref({
  assignment_id: '',
  bill_month: new Date().toISOString().split('T')[0].substring(0, 7),
  other_fee: 0,
  due_date: ''
});

const totalBillAmount = computed(() => {
  return billingStore.bills.reduce((acc, bill) => acc + (parseFloat(bill.total_amount) || 0), 0).toLocaleString();
});

const unpaidCount = computed(() => {
  return billingStore.bills.filter(bill => bill.status !== 'Paid').length;
});

const tableFields = [
  { key: 'bill_id', label: 'លេខវិក្កយបត្រ', thClass: 'ps-4', tdClass: 'ps-4' },
  { key: 'room_number', label: 'បន្ទប់' },
  { key: 'fullname', label: 'អ្នកជួល' },
  { key: 'bill_month', label: 'សម្រាប់ខែ' },
  { key: 'total_amount', label: 'ទឹកប្រាក់សរុប' },
  { key: 'status', label: 'ស្ថានភាព' },
  { key: 'actions', label: 'សកម្មភាព' }
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'Paid': return 'badge-success';
    case 'Unpaid': return 'badge-danger';
    case 'Partially Paid': return 'badge-warning';
    case 'Draft': return 'badge-secondary';
    default: return 'badge-info';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'Paid': return 'បង់រួច';
    case 'Unpaid': return 'មិនទាន់បង់';
    case 'Partially Paid': return 'បង់ខ្លះ';
    case 'Draft': return 'ព្រាង';
    default: return status;
  }
};

const handleCreateBill = async () => {
  try {
    const assignment = rentStore.assignments.find(a => a.assignment_id == formData.value.assignment_id);
    if (!assignment) {
      throw new Error('សូមជ្រើសរើសការជួលដែលត្រឹមត្រូវ');
    }
    if (assignment.status === 'Ended') {
      throw new Error('មិនអាចបង្កើតវិក្កយបត្រសម្រាប់ការជួលដែលបានបញ្ចប់');
    }

    const payload = {
      assignment_id: Number(formData.value.assignment_id),
      bill_month: `${formData.value.bill_month}-01`,
      room_rent: Number(assignment.room_price) || 0,
      other_fee: Number(formData.value.other_fee) || 0,
      due_date: formData.value.due_date || null,
      details: []
    };

    if (!payload.assignment_id || !payload.bill_month || payload.room_rent <= 0) {
      throw new Error('assignment_id, bill_month, and room_rent are required');
    }

    await billingStore.createBill(payload);
    isCreateModalOpen.value = false;
  } catch (err) {
    console.error("Failed to create bill:", err);
    const message = err.response?.data?.message || err.message || 'Failed to create bill';
    billingStore.error = message;
    alert(message);
  }
};

const confirmDelete = (bill) => {
  selectedBill.value = bill;
  showDeleteModal.value = true;
};

const handleDelete = async () => {
  try {
    await billingStore.deleteBill(selectedBill.value.bill_id);
    showDeleteModal.value = false;
  } catch (err) {
    alert('បរាជ័យក្នុងការលុប');
  }
};

const handlePrintBill = (bill) => {
  router.push({ name: 'BillDetail', query: { bill_id: bill.bill_id, print: 'true' } });
};

onMounted(() => {
  if (authStore.isAuthenticated && authStore.token) {
    billingStore.fetchBills();
    rentStore.fetchAssignments();
  } else {
    billingStore.error = 'សូមចូលប្រើប្រាស់ដំបូង';
  }
});
</script>

<style scoped>
.bills-view {
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

.action-btn.view:hover {
  background: var(--info-soft);
  color: var(--info);
  border-color: var(--info);
}

.action-btn.print:hover {
  background: var(--primary-soft);
  color: var(--primary);
  border-color: var(--primary);
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

@media print {
  .header-section button,
  .action-btn,
  .sidebar,
  .navbar,
  .alert {
    display: none !important;
  }
}
</style>