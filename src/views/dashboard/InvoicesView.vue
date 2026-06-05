<template>
  <div class="invoices-view animate-entrance">
    <div class="header-section d-flex justify-content-between align-items-center mb-5">
      <div>
        <h1 class="display-6 fw-bold text-gradient">វិក្កយបត្រផ្លូវការ (Invoices)</h1>
        <p class="text-muted">រក្សាទុក និងគ្រប់គ្រងឯកសារវិក្កយបត្រផ្លូវការសម្រាប់បណ្ណសារ</p>
      </div>
      <div class="d-flex gap-2">
        <BaseButton variant="outline" size="sm" @click="handlePrint">
          <i class="bi bi-printer me-2"></i>បោះពុម្ព
        </BaseButton>
        <BaseButton variant="outline" size="sm">
          <i class="bi bi-file-earmark-pdf me-2"></i>បណ្ណសារវិក្កយបត្រ
        </BaseButton>
      </div>
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
        <template #cell(actions)="{ item }">
          <div class="d-flex gap-2 justify-content-center">
            <BaseButton variant="secondary" size="sm">
              <i class="bi bi-download me-1"></i> ទាញយក
            </BaseButton>
            <button class="action-btn delete" title="លុប" @click="confirmDelete(item)"><i class="bi bi-trash3"></i></button>
          </div>
        </template>
      </BaseTable>
    </div>

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmModal
      :show="showDeleteModal"
      :loading="billingStore.loading"
      :message="`តើអ្នកពិតជាចង់លុបវិក្កយបត្រ #${selectedInvoice?.invoice_number} នេះមែនទេ?`"
      @close="showDeleteModal = false"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useBillingStore } from '@/stores/billing';
import BaseTable from '@/components/ui/BaseTable.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import DeleteConfirmModal from '@/components/ui/DeleteConfirmModal.vue';

const billingStore = useBillingStore();
const showDeleteModal = ref(false);
const selectedInvoice = ref(null);

const confirmDelete = (invoice) => {
  selectedInvoice.value = invoice;
  showDeleteModal.value = true;
};

const handleDelete = async () => {
  try {
    await billingStore.deleteInvoice(selectedInvoice.value.id);
    showDeleteModal.value = false;
  } catch (err) {
    alert('បរាជ័យក្នុងការលុប');
  }
};

const handlePrint = () => {
  window.print();
};

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

<style scoped>
.invoices-view {
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

.action-btn.delete:hover {
  background: var(--danger-soft);
  color: var(--danger);
  border-color: var(--danger);
}

@media print {
  .header-section button, 
  .action-btn,
  .sidebar,
  .navbar,
  .btn-secondary {
    display: none !important;
  }
}
</style>