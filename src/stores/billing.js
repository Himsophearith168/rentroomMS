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
      // Handle specific error codes
      if (err.response?.status === 404) {
        error.value = "មិនមានវិក្កយបត្រ ឬម៉ាស៊ីនបម្រើមិនឆ្លើយតប";
        console.warn("[Billing] 404 - Backend endpoint not available", err.message);
      } else if (err.response?.status === 401) {
        error.value = "សូមចូលប្រើប្រាស់ម្ដងទៀត";
        console.warn("[Billing] 401 - Unauthorized", err.message);
      } else {
        error.value = "បរាជ័យក្នុងការទាញយកវិក្កយបត្រ";
        console.error("[Billing] Error:", err);
      }
      bills.value = [];
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
      const errorMessage = err.response?.data?.message || "បរាជ័យក្នុងការបង្កើតវិក្កយបត្រថ្មី";
      error.value = errorMessage;
      throw new Error(errorMessage);
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
      if (err.response?.status === 404) {
        error.value = "មិនមានលម្អិតវិក្កយបត្រ ឬម៉ាស៊ីនបម្រើមិនឆ្លើយតប";
      } else {
        error.value = "បរាជ័យក្នុងការទាញយកលម្អិតវិក្កយបត្រ";
      }
      billDetails.value = [];
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
      if (err.response?.status === 404) {
        error.value = "មិនមានការទូទាត់ ឬម៉ាស៊ីនបម្រើមិនឆ្លើយតប";
      } else {
        error.value = "បរាជ័យក្នុងការទាញយកការទូទាត់";
      }
      payments.value = [];
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
      if (err.response?.status === 404) {
        error.value = "មិនមានវិក្កយបត្រផ្លូវការ ឬម៉ាស៊ីនបម្រើមិនឆ្លើយតប";
      } else {
        error.value = "បរាជ័យក្នុងការទាញយកវិក្កយបត្រផ្លូវការ";
      }
      invoices.value = [];
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
