<template>
  <div class="bill-detail-view animate-entrance">
    <div class="header-section d-flex justify-content-between align-items-center mb-5">
      <div>
        <h1 class="display-6 fw-bold text-gradient">លម្អិតវិក្កយបត្រ</h1>
        <p class="text-muted">ពិនិត្យមើលធាតុនីមួយៗនៃវិក្កយបត្រ #{{ billId }}</p>
      </div>
      <div class="d-flex gap-2">
        <BaseButton variant="outline" @click="handlePrint">
          <i class="bi bi-printer me-2"></i>បោះពុម្ព
        </BaseButton>
        <BaseButton variant="secondary" @click="$router.push({ name: 'Bill' })">
          <i class="bi bi-arrow-left me-2"></i>ត្រឡប់ក្រោយ
        </BaseButton>
      </div>
    </div>

    <div v-if="selectedBill" class="row g-4 mb-5 print-section">
      <div class="col-md-4">
        <div class="card-modern p-4 h-100">
          <h5 class="fw-bold mb-3 border-bottom pb-2">ព័ត៌មានវិក្កយបត្រ</h5>
          <div class="info-row">
            <span class="label">បន្ទប់:</span>
            <span class="value">#{{ selectedBill.room_number }}</span>
          </div>
          <div class="info-row">
            <span class="label">អ្នកជួល:</span>
            <span class="value">{{ selectedBill.fullname }}</span>
          </div>
          <div class="info-row">
            <span class="label">សម្រាប់ខែ:</span>
            <span class="value">{{ new Date(selectedBill.bill_month).toLocaleDateString('km-KH', { month: 'long', year: 'numeric' }) }}</span>
          </div>
          <div class="info-row">
            <span class="label">ស្ថានភាព:</span>
            <span :class="['badge-soft', getStatusBadge(selectedBill.status)]">{{ getStatusText(selectedBill.status) }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card-modern p-4 h-100">
          <h5 class="fw-bold mb-3 border-bottom pb-2">សេចក្តីសង្ខេបទឹកប្រាក់</h5>
          <div class="info-row">
            <span class="label">ថ្លៃជួលបន្ទប់:</span>
            <span class="value fw-bold">${{ selectedBill.room_rent }}</span>
          </div>
          <div class="info-row">
            <span class="label">ថ្លៃសេវាកម្មសរុប:</span>
            <span class="value fw-bold">${{ utilityTotal }}</span>
          </div>
          <div class="info-row">
            <span class="label">ថ្លៃផ្សេងៗ:</span>
            <span class="value fw-bold">${{ selectedBill.other_fee }}</span>
          </div>
          <div class="info-row mt-2 pt-2 border-top">
            <span class="label fw-bold">ទឹកប្រាក់សរុប:</span>
            <span class="value fw-bold text-primary fs-5">${{ selectedBill.total_amount }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card-modern overflow-hidden print-table">
      <BaseTable 
        :items="billingStore.billDetails" 
        :fields="tableFields"
        :loading="billingStore.loading"
      >
        <template #cell(utility_name)="{ item }">
          <span class="fw-semibold">{{ item.utility_name }}</span>
        </template>
        <template #cell(reading)="{ item }">
          <span v-if="item.old_reading !== null" class="text-muted small">
            {{ item.old_reading }} -> {{ item.new_reading }}
          </span>
          <span v-else>-</span>
        </template>
        <template #cell(quantity)="{ item }">
          <span class="fw-medium">{{ item.quantity }} {{ item.unit }}</span>
        </template>
        <template #cell(unit_price)="{ item }">
          <span class="text-muted">${{ item.unit_price }}</span>
        </template>
        <template #cell(total_price)="{ item }">
          <span class="fw-bold text-dark">${{ item.total_price }}</span>
        </template>
      </BaseTable>
    </div>
    
    <div class="print-only mt-5 text-center">
      <p class="text-muted small">អរគុណសម្រាប់ការស្នាក់នៅជាមួយយើងខ្ញុំ!</p>
      <div class="d-flex justify-content-between mt-5 pt-5">
        <div class="text-center" style="width: 200px;">
          <p class="mb-5">ហត្ថលេខាម្ចាស់ផ្ទះ</p>
          <div class="border-top pt-2">................................</div>
        </div>
        <div class="text-center" style="width: 200px;">
          <p class="mb-5">ហត្ថលេខាអ្នកជួល</p>
          <div class="border-top pt-2">................................</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useBillingStore } from '@/stores/billing';
import BaseTable from '@/components/ui/BaseTable.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const route = useRoute();
const billingStore = useBillingStore();
const billId = computed(() => route.query.bill_id);
const shouldPrint = computed(() => route.query.print === 'true');

const selectedBill = computed(() => {
  return billingStore.bills.find(b => b.bill_id == billId.value);
});

const utilityTotal = computed(() => {
  return billingStore.billDetails.reduce((acc, detail) => acc + (parseFloat(detail.total_price) || 0), 0).toFixed(2);
});

const tableFields = [
  { key: 'utility_name', label: 'សេវាកម្ម', thClass: 'ps-4', tdClass: 'ps-4' },
  { key: 'reading', label: 'លេខម៉ែត្រ (ចាស់ -> ថ្មី)' },
  { key: 'quantity', label: 'បរិមាណ' },
  { key: 'unit_price', label: 'តម្លៃ/ឯកតា' },
  { key: 'total_price', label: 'សរុប' }
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

const handlePrint = () => {
  window.print();
};

onMounted(() => {
  if (billId.value) {
    billingStore.fetchBillDetails(billId.value);
    if (billingStore.bills.length === 0) {
      billingStore.fetchBills();
    }
  }
});

watch([() => billingStore.loading, shouldPrint], ([loading, print]) => {
  if (!loading && print) {
    setTimeout(() => {
      window.print();
    }, 500);
  }
}, { immediate: true });
</script>

<style scoped>
.bill-detail-view {
  max-width: 1400px;
  margin: 0 auto;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.info-row .label {
  color: var(--text-muted);
}

.info-row .value {
  color: var(--text-main);
  font-weight: 500;
}

.print-only {
  display: none;
}

@media print {
  .header-section,
  .sidebar,
  .navbar {
    display: none !important;
  }
  
  .bill-detail-view {
    padding: 0;
    max-width: 100%;
  }
  
  .card-modern {
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
  
  .row {
    display: flex;
    flex-wrap: nowrap;
    gap: 20px;
  }
  
  .col-md-4 {
    flex: 1;
  }
  
  .print-only {
    display: block;
  }
  
  .badge-soft {
    border: 1px solid #ddd;
    background: none !important;
    color: #000 !important;
  }
}
</style>
