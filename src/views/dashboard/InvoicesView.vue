<template>
  <div class="invoices-view">
    <div class="header-section d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="display-6 fw-bold">វិក្កយបត្រផ្លូវការ (Invoices)</h1>
        <p class="text-muted">រក្សាទុក និងគ្រប់គ្រងឯកសារវិក្កយបត្រផ្លូវការ</p>
      </div>
      <BaseButton variant="outline-primary">
        <i class="bi bi-file-earmark-pdf me-2"></i>បណ្ណសារវិក្កយបត្រ
      </BaseButton>
    </div>

    <div class="card border-0 rounded-4 shadow-sm mb-4">
      <div class="card-body p-4">
        <div class="row g-3">
          <div class="col-md-4">
            <label class="form-label small fw-bold">ស្វែងរកតាមឈ្មោះ</label>
            <input type="text" class="form-control" placeholder="ឈ្មោះអ្នកជួល...">
          </div>
          <div class="col-md-4">
            <label class="form-label small fw-bold">ជ្រើសរើសខែ</label>
            <select class="form-select">
              <option>ឧសភា 2024</option>
              <option>មេសា 2024</option>
              <option>មីនា 2024</option>
            </select>
          </div>
          <div class="col-md-4 d-flex align-items-end">
            <BaseButton variant="primary" class="w-100">ស្វែងរក</BaseButton>
          </div>
        </div>
      </div>
    </div>

    <div class="card border-0 rounded-4 shadow-sm">
      <div class="card-body p-0">
        <BaseTable 
          :items="mockInvoices" 
          :fields="tableFields"
          :totalRows="mockInvoices.length"
          :perPage="10"
          :currentPage="1"
        >
          <template #cell(type)="{ item }">
            <span class="text-muted"><i class="bi bi-file-pdf me-2"></i>{{ item.type }}</span>
          </template>
          <template #cell(actions)>
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-outline-primary"><i class="bi bi-download"></i> ទាញយក</button>
            </div>
          </template>
        </BaseTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseTable from '@/components/ui/BaseTable.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const tableFields = [
  { key: 'invoiceNo', label: 'លេខឯកសារ', thClass: 'ps-4', tdClass: 'ps-4' },
  { key: 'date', label: 'កាលបរិច្ឆេទ' },
  { key: 'tenant', label: 'អ្នកជួល' },
  { key: 'type', label: 'ប្រភេទឯកសារ' },
  { key: 'actions', label: 'សកម្មភាព' }
];

const mockInvoices = ref([
  { invoiceNo: 'OFF-001', date: '2024-05-15', tenant: 'សុខ សាន', type: 'វិក្កយបត្រពន្ធ' },
  { invoiceNo: 'OFF-002', date: '2024-05-14', tenant: 'ចាន់ ថន', type: 'វិក្កយបត្រពន្ធ' },
  { invoiceNo: 'OFF-003', date: '2024-05-12', tenant: 'លី ហួរ', type: 'វិក្កយបត្រពន្ធ' },
  { invoiceNo: 'OFF-004', date: '2024-05-10', tenant: 'មាស ស្រីនាថ', type: 'វិក្កយបត្រពន្ធ' },
]);
</script>

<style scoped>
.invoices-view { padding: 10px; }
</style>
