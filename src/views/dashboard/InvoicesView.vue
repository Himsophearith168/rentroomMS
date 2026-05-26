<template>
  <div class="invoices-view">
    <!-- ... header remains same ... -->
    <div class="header-section d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="display-6 fw-bold">វិក្កយបត្រផ្លូវការ (Invoices)</h1>
        <p class="text-muted">រក្សាទុក និងគ្រប់គ្រងឯកសារវិក្កយបត្រផ្លូវការ</p>
      </div>
      <BaseButton variant="outline-primary">
        <i class="bi bi-file-earmark-pdf me-2"></i>បណ្ណសារវិក្កយបត្រ
      </BaseButton>
    </div>

    <!-- ... filter card ... -->

    <div class="card border-0 rounded-4 shadow-sm">
      <div class="card-body p-0">
        <BaseTable 
          :items="rentStore.invoices" 
          :fields="tableFields"
          :totalRows="rentStore.invoices.length"
          :perPage="10"
          :currentPage="1"
        >
          <template #cell(type)="{ item }">
            <span class="text-muted"><i class="bi bi-file-pdf me-2"></i>{{ item.type || 'វិក្កយបត្រពន្ធ' }}</span>
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
import { onMounted } from 'vue';
import { useRentStore } from '@/stores/rentroom';
import BaseTable from '@/components/ui/BaseTable.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const rentStore = useRentStore();

const tableFields = [
  { key: 'invoiceNo', label: 'លេខឯកសារ', thClass: 'ps-4', tdClass: 'ps-4' },
  { key: 'date', label: 'កាលបរិច្ឆេទ' },
  { key: 'tenant', label: 'អ្នកជួល' },
  { key: 'type', label: 'ប្រភេទឯកសារ' },
  { key: 'actions', label: 'សកម្មភាព' }
];

onMounted(() => {
  rentStore.fetchInvoices();
});
</script>

<style scoped>
.invoices-view { padding: 10px; }
</style>
