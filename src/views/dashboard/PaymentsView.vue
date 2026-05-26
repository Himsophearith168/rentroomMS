<template>
  <div class="payments-view">
    <!-- ... header remains same ... -->
    <div class="header-section d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="display-6 fw-bold">ការទូទាត់ (Payments)</h1>
        <p class="text-muted">ពិនិត្យមើលប្រវត្តិនៃការបង់ប្រាក់របស់អ្នកជួល</p>
      </div>
      <div class="d-flex gap-2">
        <BaseButton variant="light" class="border">
          <i class="bi bi-download me-2"></i>ទាញយករបាយការណ៍
        </BaseButton>
        <BaseButton variant="primary">
          <i class="bi bi-plus-circle me-2"></i>បន្ថែមការទូទាត់
        </BaseButton>
      </div>
    </div>

    <!-- ... cards ... -->

    <div class="card border-0 rounded-4 shadow-sm">
      <div class="card-body p-0">
        <BaseTable 
          :items="rentStore.payments" 
          :fields="tableFields"
          :totalRows="rentStore.payments.length"
          :perPage="10"
          :currentPage="1"
        >
          <template #cell(method)="{ item }">
            <span class="badge bg-secondary-soft text-secondary">
              <i v-if="item.method === 'ABA'" class="bi bi-bank me-1"></i>
              <i v-else class="bi bi-cash me-1"></i>
              {{ item.method }}
            </span>
          </template>
          <template #cell(amount)="{ item }">
            <span class="fw-bold text-success">+${{ item.amount }}</span>
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
  { key: 'date', label: 'ថ្ងៃខែឆ្នាំ', thClass: 'ps-4', tdClass: 'ps-4' },
  { key: 'tenant', label: 'អ្នកជួល' },
  { key: 'room', label: 'បន្ទប់' },
  { key: 'amount', label: 'ចំនួនទឹកប្រាក់' },
  { key: 'method', label: 'វិធីសាស្ត្របង់ប្រាក់' },
  { key: 'ref', label: 'លេខយោង' }
];

onMounted(() => {
  rentStore.fetchPayments();
});
</script>

<style scoped>
.payments-view { padding: 10px; }
.bg-secondary-soft { background-color: #f1f5f9; }
.text-secondary { color: #475569; }
</style>
