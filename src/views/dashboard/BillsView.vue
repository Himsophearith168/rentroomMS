<template>
  <div class="bills-view">
    <div class="header-section d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="display-6 fw-bold">វិក្កយបត្រ (Bills)</h1>
        <p class="text-muted">គ្រប់គ្រងការចេញវិក្កយបត្រប្រចាំខែ</p>
      </div>
      <BaseButton variant="primary">
        <i class="bi bi-receipt me-2"></i>បង្កើតវិក្កយបត្រថ្មី
      </BaseButton>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-12 col-md-4">
        <StateCard label="វិក្កយបត្រមិនទាន់បង់" value="5" variant="red">
          <template #icon><i class="bi bi-clock-history fs-4"></i></template>
        </StateCard>
      </div>
      <div class="col-12 col-md-4">
        <StateCard label="វិក្កយបត្រខែនេះ" value="12" variant="blue">
          <template #icon><i class="bi bi-calendar-event fs-4"></i></template>
        </StateCard>
      </div>
      <div class="col-12 col-md-4">
        <StateCard label="ទឹកប្រាក់សរុប" value="$850" variant="purple">
          <template #icon><i class="bi bi-cash-stack fs-4"></i></template>
        </StateCard>
      </div>
    </div>

    <div class="card border-0 rounded-4 shadow-sm">
      <div class="card-body p-0">
        <BaseTable 
          :items="mockBills" 
          :fields="tableFields"
          :totalRows="mockBills.length"
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
import { ref } from 'vue';
import StateCard from '@/components/ui/StateCard.vue';
import BaseTable from '@/components/ui/BaseTable.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const tableFields = [
  { key: 'invoiceId', label: 'លេខវិក្កយបត្រ', thClass: 'ps-4', tdClass: 'ps-4' },
  { key: 'tenant', label: 'ឈ្មោះអ្នកជួល' },
  { key: 'room', label: 'លេខបន្ទប់' },
  { key: 'month', label: 'សម្រាប់ខែ' },
  { key: 'amount', label: 'ទឹកប្រាក់' },
  { key: 'status', label: 'ស្ថានភាព' },
  { key: 'actions', label: 'សកម្មភាព' }
];

const mockBills = ref([
  { invoiceId: 'INV-202405-01', tenant: 'សុខ សាន', room: 'R-002', month: 'ឧសភា 2024', amount: 120, status: 'រួចរាល់' },
  { invoiceId: 'INV-202405-02', tenant: 'កែវ សុភា', room: 'R-004', month: 'ឧសភា 2024', amount: 65, status: 'មិនទាន់បង់' },
  { invoiceId: 'INV-202405-03', tenant: 'ចាន់ ថន', room: 'R-006', month: 'ឧសភា 2024', amount: 70, status: 'រួចរាល់' },
  { invoiceId: 'INV-202405-04', tenant: 'លី ហួរ', room: 'R-008', month: 'ឧសភា 2024', amount: 145, status: 'មិនទាន់បង់' },
]);
</script>

<style scoped>
.bills-view { padding: 10px; }
.bg-success-soft { background-color: #dcfce7; }
.bg-danger-soft { background-color: #fee2e2; }
.text-success { color: #16a34a; }
.text-danger { color: #dc2626; }
</style>
