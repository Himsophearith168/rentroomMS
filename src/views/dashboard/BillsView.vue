<template>
  <div class="bills-view">
    <!-- ... header remains same ... -->
    <div class="header-section d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="display-6 fw-bold">វិក្កយបត្រ (Bills)</h1>
        <p class="text-muted">គ្រប់គ្រងការចេញវិក្កយបត្រប្រចាំខែ</p>
      </div>
      <BaseButton variant="primary">
        <i class="bi bi-receipt me-2"></i>បង្កើតវិក្កយបត្រថ្មី
      </BaseButton>
    </div>

    <!-- ... cards ... -->

    <div class="card border-0 rounded-4 shadow-sm">
      <div class="card-body p-0">
        <BaseTable 
          :items="rentStore.invoices" 
          :fields="tableFields"
          :totalRows="rentStore.invoices.length"
          :perPage="10"
          :currentPage="1"
        >
          <template #cell(status)="{ item }">
            <span :class="['badge rounded-pill', item.status === 'រួចរាល់' ? 'bg-success-soft text-success' : 'bg-danger-soft text-danger']">
              {{ item.status }}
            </span>
          </template>
          <template #cell(amount)="{ item }">
            <span class="fw-bold text-dark">${{ item.amount }}</span>
          </template>
          <template #cell(actions)>
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-light text-primary border"><i class="bi bi-printer"></i></button>
              <button class="btn btn-sm btn-light text-info border"><i class="bi bi-send"></i></button>
            </div>
          </template>
        </BaseTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRentStore } from '@/stores/rentroom';
import StateCard from '@/components/ui/StateCard.vue';
import BaseTable from '@/components/ui/BaseTable.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const rentStore = useRentStore();

const tableFields = [
  { key: 'invoiceId', label: 'លេខវិក្កយបត្រ', thClass: 'ps-4', tdClass: 'ps-4' },
  { key: 'tenant', label: 'ឈ្មោះអ្នកជួល' },
  { key: 'room', label: 'លេខបន្ទប់' },
  { key: 'month', label: 'សម្រាប់ខែ' },
  { key: 'amount', label: 'ទឹកប្រាក់' },
  { key: 'status', label: 'ស្ថានភាព' },
  { key: 'actions', label: 'សកម្មភាព' }
];

onMounted(() => {
  rentStore.fetchInvoices();
});
</script>

<style scoped>
.bills-view { padding: 10px; }
.bg-success-soft { background-color: #dcfce7; }
.bg-danger-soft { background-color: #fee2e2; }
.text-success { color: #16a34a; }
.text-danger { color: #dc2626; }
</style>
