import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/API/api";

export const useBillingStore = defineStore("billing", () => {
  const bills = ref([]);
  const billDetails = ref([]);
  const payments = ref([]);
  const invoices = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // --- Bills ---
  const fetchBills = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get("/bill");
      bills.value = response.data.data || response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការទាញយកវិក្កយបត្រ";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const createBill = async (billData) => {
    loading.value = true;
    try {
      const response = await api.post("/bill", billData);
      await fetchBills();
      return response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការបង្កើតវិក្កយបត្រថ្មី";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateBill = async (id, billData) => {
    loading.value = true;
    try {
      const response = await api.put(`/bill/${id}`, billData);
      await fetchBills();
      return response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការកែប្រែវិក្កយបត្រ";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteBill = async (id) => {
    loading.value = true;
    try {
      await api.delete(`/bill/${id}`);
      await fetchBills();
    } catch (err) {
      error.value = "បរាជ័យក្នុងការលុបវិក្កយបត្រ";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // --- Bill Details ---
  const fetchBillDetails = async (billId) => {
    loading.value = true;
    try {
      const response = await api.get("/billDetail", { params: { bill_id: billId } });
      billDetails.value = response.data.data || response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការទាញយកលម្អិតវិក្កយបត្រ";
    } finally {
      loading.value = false;
    }
  };

  const createBillDetail = async (detailData) => {
    loading.value = true;
    try {
      const response = await api.post("/billDetail", detailData);
      if (detailData.bill_id) await fetchBillDetails(detailData.bill_id);
      await fetchBills(); // Total amount changes
      return response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការបង្កើតលម្អិតវិក្កយបត្រ";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // --- Payments ---
  const fetchPayments = async () => {
    loading.value = true;
    try {
      const response = await api.get("/payment");
      payments.value = response.data.data || response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការទាញយកការទូទាត់";
    } finally {
      loading.value = false;
    }
  };

  const createPayment = async (paymentData) => {
    loading.value = true;
    try {
      const config = paymentData instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
      const response = await api.post("/payment", paymentData, config);
      await fetchPayments();
      await fetchBills(); // Bill status might change
      return response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការបង្កើតការទូទាត់";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // --- Invoices ---
  const fetchInvoices = async () => {
    loading.value = true;
    try {
      const response = await api.get("/invoice");
      invoices.value = response.data.data || response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការទាញយកវិក្កយបត្រផ្លូវការ";
    } finally {
      loading.value = false;
    }
  };

  const createInvoice = async (invoiceData) => {
    loading.value = true;
    try {
      const response = await api.post("/invoice", invoiceData);
      await fetchInvoices();
      return response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការបង្កើតវិក្កយបត្រផ្លូវការ";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    bills,
    billDetails,
    payments,
    invoices,
    loading,
    error,
    fetchBills,
    createBill,
    updateBill,
    deleteBill,
    fetchBillDetails,
    createBillDetail,
    fetchPayments,
    createPayment,
    fetchInvoices,
    createInvoice
  };
});
