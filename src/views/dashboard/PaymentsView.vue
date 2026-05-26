<template>
  <div class="payments-view">
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

    <div class="row g-4 mb-4">
      <div class="col-12 col-md-4">
        <StateCard label="ចំណូលសរុបខែនេះ" value="$1,540" variant="green">
          <template #icon><i class="bi bi-graph-up fs-4"></i></template>
        </StateCard>
      </div>
      <div class="col-12 col-md-4">
        <StateCard label="ប្រតិបត្តិការសរុប" value="45" variant="blue">
          <template #icon><i class="bi bi-arrow-left-right fs-4"></i></template>
        </StateCard>
      </div>
      <div class="col-12 col-md-4">
        <StateCard label="មធ្យមភាគក្នុងម្នាក់" value="$85" variant="yellow">
          <template #icon><i class="bi bi-person-badge fs-4"></i></template>
        </StateCard>
      </div>
    </div>

    <div class="card border-0 rounded-4 shadow-sm">
      <div class="card-body p-0">
        <BaseTable 
          :items="mockPayments" 
          :fields="tableFields"
          :totalRows="mockPayments.length"
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
import { ref } from 'vue';
import StateCard from '@/components/ui/StateCard.vue';
import BaseTable from '@/components/ui/BaseTable.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const tableFields = [
  { key: 'date', label: 'ថ្ងៃខែឆ្នាំ', thClass: 'ps-4', tdClass: 'ps-4' },
  { key: 'tenant', label: 'អ្នកជួល' },
  { key: 'room', label: 'បន្ទប់' },
  { key: 'amount', label: 'ចំនួនទឹកប្រាក់' },
  { key: 'method', label: 'វិធីសាស្ត្របង់ប្រាក់' },
  { key: 'ref', label: 'លេខយោង' }
];

const mockPayments = ref([
  { date: '2024-05-15', tenant: 'សុខ សាន', room: 'R-002', amount: 120, method: 'ABA', ref: 'TXN-99821' },
  { date: '2024-05-14', tenant: 'ចាន់ ថន', room: 'R-006', amount: 70, method: 'សាច់ប្រាក់', ref: '-' },
  { date: '2024-05-12', tenant: 'លី ហួរ', room: 'R-008', amount: 145, method: 'ABA', ref: 'TXN-99750' },
  { date: '2024-05-10', tenant: 'មាស ស្រីនាថ', room: 'R-010', amount: 90, method: 'ABA', ref: 'TXN-99701' },
]);
</script>

<style scoped>
.payments-view { padding: 10px; }
.bg-secondary-soft { background-color: #f1f5f9; }
.text-secondary { color: #475569; }
</style>
