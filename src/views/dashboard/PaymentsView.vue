<script setup>
import { onMounted, computed, ref } from 'vue';
import { useBillingStore } from '@/stores/billing';
import StateCard from '@/components/ui/StateCard.vue';
import BaseTable from '@/components/ui/BaseTable.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import DeleteConfirmModal from '@/components/ui/DeleteConfirmModal.vue';

const billingStore = useBillingStore();

const isCreateModalOpen = ref(false);
const showDeleteModal = ref(false);
const selectedPayment = ref(null);
const formData = ref({
  bill_id: '',
  amount: 0,
  payment_method: 'Cash',
  payment_date: new Date().toISOString().split('T')[0],
  remarks: ''
});

const totalReceivedAmount = computed(() => {
  return billingStore.payments.reduce((acc, pay) => acc + (parseFloat(pay.amount) || 0), 0).toLocaleString();
});

const averagePayment = computed(() => {
  if (billingStore.payments.length === 0) return 0;
  const total = billingStore.payments.reduce((acc, pay) => acc + (parseFloat(pay.amount) || 0), 0);
  return (total / billingStore.payments.length).toFixed(2);
});

const tableFields = [
  { key: 'payment_date', label: 'ថ្ងៃខែឆ្នាំ', thClass: 'ps-4', tdClass: 'ps-4' },
  { key: 'bill_id', label: 'លេខវិក្កយបត្រ' },
  { key: 'room_number', label: 'បន្ទប់' },
  { key: 'amount', label: 'ចំនួនទឹកប្រាក់' },
  { key: 'payment_method', label: 'វិធីសាស្ត្របង់ប្រាក់' },
  { key: 'actions', label: 'សកម្មភាព' }
];

const handleCreatePayment = async () => {
  try {
    await billingStore.createPayment({ ...formData.value });
    isCreateModalOpen.value = false;
  } catch (err) {
    console.error("Failed to create payment:", err);
  }
};

const confirmDelete = (payment) => {
  selectedPayment.value = payment;
  showDeleteModal.value = true;
};

const handleDelete = async () => {
  try {
    await billingStore.deletePayment(selectedPayment.value.payment_id || selectedPayment.value.id);
    showDeleteModal.value = false;
  } catch (err) {
    alert('បរាជ័យក្នុងការលុប');
  }
};

const handlePrint = () => {
  window.print();
};

onMounted(() => {
  billingStore.fetchPayments();
  billingStore.fetchBills(); // To select bill in modal
});
</script>

<template>
  <div class="payments-view animate-entrance">
    <div class="header-section d-flex justify-content-between align-items-center mb-5">
      <div>
        <h1 class="display-6 fw-bold text-gradient">ការទូទាត់ (Payments)</h1>
        <p class="text-muted">ពិនិត្យមើលប្រវត្តិនៃការបង់ប្រាក់របស់អ្នកជួល</p>
      </div>
      <div class="d-flex gap-2">
        <BaseButton variant="outline" size="sm" @click="handlePrint">
          <i class="bi bi-printer me-2"></i>បោះពុម្ពរបាយការណ៍
        </BaseButton>
        <BaseButton variant="primary" size="sm" @click="isCreateModalOpen = true">
          <i class="bi bi-plus-circle me-2"></i>បន្ថែមការទូទាត់
        </BaseButton>
      </div>
    </div>

    <div class="row g-4 mb-5">
      <div class="col-12 col-md-4 stagger-1">
        <StateCard 
          label="ការទូទាត់សរុប" 
          :value="billingStore.payments.length" 
          :trendValue="`+${Math.floor(billingStore.payments.length / 3)}`"
          trendLabel="សប្ताហ៍នេះ"
          variant="blue">
          <template #icon><i class="bi bi-credit-card fs-4"></i></template>
        </StateCard>
      </div>
      <div class="col-12 col-md-4 stagger-2">
        <StateCard 
          label="ចំណូលសរុប" 
          :value="`$${totalReceivedAmount}`" 
          trendValue="+8%"
          trendLabel="ធៀបនឹងខែមុន"
          variant="green">
          <template #icon><i class="bi bi-wallet2 fs-4"></i></template>
        </StateCard>
      </div>
      <div class="col-12 col-md-4 stagger-3">
        <StateCard 
          label="មធ្យមភាគប្រចាំខែ" 
          :value="`$${averagePayment}`" 
          trendValue="+3%"
          trendLabel="ថ្ងៃនេះ"
          variant="yellow">
          <template #icon><i class="bi bi-bar-chart-line fs-4"></i></template>
        </StateCard>
      </div>
    </div>

    <div class="card-modern overflow-hidden">
      <BaseTable 
        :items="billingStore.payments" 
        :fields="tableFields"
        :totalRows="billingStore.payments.length"
        :perPage="10"
        :currentPage="1"
        :loading="billingStore.loading"
      >
        <template #cell(payment_method)="{ item }">
          <span :class="['badge-soft', item.payment_method === 'ABA' || item.payment_method === 'Bank' ? 'badge-primary' : 'badge-info']">
            <i v-if="item.payment_method === 'ABA' || item.payment_method === 'Bank'" class="bi bi-bank me-1"></i>
            <i v-else class="bi bi-cash me-1"></i>
            {{ item.payment_method }}
          </span>
        </template>
        <template #cell(amount)="{ item }">
          <span class="fw-bold text-success">+${{ item.amount }}</span>
        </template>
        <template #cell(payment_date)="{ item }">
          <span class="text-muted fw-medium">{{ item.payment_date ? new Date(item.payment_date).toLocaleDateString('km-KH') : '-' }}</span>
        </template>
        <template #cell(bill_id)="{ item }">
          <span class="fw-semibold">#{{ item.bill_id }}</span>
        </template>
        <template #cell(actions)="{ item }">
          <div class="d-flex gap-2">
            <button class="action-btn view" title="មើលបង្កាន់ដៃ"><i class="bi bi-receipt"></i></button>
            <button class="action-btn delete" title="លុប" @click="confirmDelete(item)"><i class="bi bi-trash3"></i></button>
          </div>
        </template>
      </BaseTable>
    </div>

    <!-- Create Payment Modal -->
    <BaseModal :show="isCreateModalOpen" title="បន្ថែមការទូទាត់ថ្មី" size="lg" @close="isCreateModalOpen = false">
      <form @submit.prevent="handleCreatePayment">
        <div class="row g-4">
          <div class="col-12">
            <div class="input-group-custom">
              <label class="custom-label">ជ្រើសរើសវិក្កយបត្រ (លេខវិក្កយបត្រ - បន្ទប់)</label>
              <select class="form-select custom-select" v-model="formData.bill_id" required>
                <option v-for="bill in billingStore.bills.filter(b => b.status !== 'Paid')" :key="bill.bill_id" :value="bill.bill_id">
                  #{{ bill.bill_id }} - បន្ទប់ {{ bill.room_number }} (នៅខ្វះ ${{ bill.total_amount }})
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <BaseInput label="ចំនួនទឹកប្រាក់ ($)" type="number" step="0.01" v-model="formData.amount" required />
          </div>
          <div class="col-md-6">
            <div class="input-group-custom">
              <label class="custom-label">វិធីសាស្ត្របង់ប្រាក់</label>
              <select class="form-select custom-select" v-model="formData.payment_method" required>
                <option value="Cash">Cash</option>
                <option value="ABA">ABA</option>
                <option value="Bank">Bank</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <BaseInput label="ថ្ងៃបង់ប្រាក់" type="date" v-model="formData.payment_date" required />
          </div>
          <div class="col-12">
            <BaseInput label="កំណត់ចំណាំ" v-model="formData.remarks" />
          </div>
        </div>
      </form>
      <template #footer>
        <BaseButton variant="secondary" @click="isCreateModalOpen = false" fullWidth>បោះបង់</BaseButton>
        <BaseButton variant="primary" @click="handleCreatePayment" :loading="billingStore.loading" fullWidth>រក្សាទុក</BaseButton>
      </template>
    </BaseModal>

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmModal
      :show="showDeleteModal"
      :loading="billingStore.loading"
      :message="`តើអ្នកពិតជាចង់លុបការទូទាត់ #${selectedPayment?.bill_id} នេះមែនទេ?`"
      @close="showDeleteModal = false"
      @confirm="handleDelete"
    />
  </div>
</template>

<style scoped>
.payments-view {
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
  .navbar {
    display: none !important;
  }
}
</style>
