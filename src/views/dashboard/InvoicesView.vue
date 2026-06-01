<script setup>
import { onMounted } from 'vue';
import { useBillingStore } from '@/stores/billing';
import BaseTable from '@/components/ui/BaseTable.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const billingStore = useBillingStore();

const tableFields = [
  { key: 'invoice_number', label: 'លេខវិក្កយបត្រផ្លូវការ', thClass: 'ps-4', tdClass: 'ps-4' },
  { key: 'issue_date', label: 'កាលបរិច្ឆេទចេញ', thClass: 'text-center', tdClass: 'text-center' },
  { key: 'room_number', label: 'បន្ទប់', thClass: 'text-center', tdClass: 'text-center' },
  { key: 'fullname', label: 'អ្នកជួល' },
  { key: 'total_amount', label: 'ទឹកប្រាក់', thClass: 'text-end', tdClass: 'text-end' },
  { key: 'actions', label: 'សកម្មភាព', thClass: 'text-center', tdClass: 'text-center' }
];

onMounted(() => {
  billingStore.fetchInvoices();
});
</script>

<template>
  <div class="invoices-view animate-entrance">
    <div class="header-section d-flex justify-content-between align-items-center mb-5">
      <div>
        <h1 class="display-6 fw-bold text-gradient">វិក្កយបត្រផ្លូវការ (Invoices)</h1>
        <p class="text-muted">រក្សាទុក និងគ្រប់គ្រងឯកសារវិក្កយបត្រផ្លូវការសម្រាប់បណ្ណសារ</p>
      </div>
      <BaseButton variant="outline" size="sm">
        <i class="bi bi-file-earmark-pdf me-2"></i>បណ្ណសារវិក្កយបត្រ
      </BaseButton>
    </div>

    <div class="card-modern overflow-hidden">
      <BaseTable 
        :items="billingStore.invoices" 
        :fields="tableFields"
        :totalRows="billingStore.invoices.length"
        :perPage="10"
        :currentPage="1"
        :loading="billingStore.loading"
      >
        <template #cell(invoice_number)="{ item }">
          <span class="fw-bold text-primary">{{ item.invoice_number }}</span>
        </template>
        <template #cell(issue_date)="{ item }">
          <span class="text-muted">{{ item.issue_date ? new Date(item.issue_date).toLocaleDateString('km-KH') : '-' }}</span>
        </template>
        <template #cell(total_amount)="{ item }">
          <span class="fw-bold">${{ item.total_amount }}</span>
        </template>
        <template #cell(actions)>
          <div class="d-flex gap-2 justify-content-center">
            <BaseButton variant="secondary" size="sm">
              <i class="bi bi-download me-1"></i> ទាញយក
            </BaseButton>
          </div>
        </template>
      </BaseTable>
    </div>
  </div>
</template>

<style scoped>
.invoices-view {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
