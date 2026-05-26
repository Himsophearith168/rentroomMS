import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/API/api";

export const useRentStore = defineStore("rent", () => {
  const rooms = ref([]);
  const tenants = ref([]);
  const invoices = ref([]);
  const payments = ref([]);
  const utilities = ref([]);
  const roomAssigns = ref([]);
  
  const loading = ref(false);
  const error = ref(null);

  // --- Rooms ---
  const fetchRooms = async () => {
    loading.value = true;
    try {
      const response = await api.get("/room");
      rooms.value = response.data.data || response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការទាញយកទិន្នន័យបន្ទប់";
    } finally {
      loading.value = false;
    }
  };

  const createRoom = async (roomData) => {
    loading.value = true;
    try {
      const response = await api.post("/room", roomData);
      await fetchRooms();
      return response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការបង្កើតបន្ទប់ថ្មី";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // --- Tenants ---
  const fetchTenants = async () => {
    loading.value = true;
    try {
      const response = await api.get("/tenant");
      tenants.value = response.data.data || response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការទាញយកទិន្នន័យអ្នកជួល";
    } finally {
      loading.value = false;
    }
  };

  const createTenant = async (tenantData) => {
    loading.value = true;
    try {
      const response = await api.post("/tenant", tenantData);
      await fetchTenants();
      return response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការបង្កើតអ្នកជួលថ្មី";
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
      error.value = "បរាជ័យក្នុងការទាញយកទិន្នន័យវិក្កយបត្រ";
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
      error.value = "បរាជ័យក្នុងការទាញយកទិន្នន័យការទូទាត់";
    } finally {
      loading.value = false;
    }
  };

  // --- Utilities ---
  const fetchUtilities = async () => {
    loading.value = true;
    try {
      const response = await api.get("/utility");
      utilities.value = response.data.data || response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការទាញយកទិន្នន័យសេវាកម្ម";
    } finally {
      loading.value = false;
    }
  };

  // --- Room Assignments ---
  const fetchRoomAssigns = async () => {
    loading.value = true;
    try {
      const response = await api.get("/roomAssign");
      roomAssigns.value = response.data.data || response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការទាញយកទិន្នន័យការជួលបន្ទប់";
    } finally {
      loading.value = false;
    }
  };

  return {
    rooms,
    tenants,
    invoices,
    payments,
    utilities,
    roomAssigns,
    loading,
    error,
    fetchRooms,
    createRoom,
    fetchTenants,
    createTenant,
    fetchInvoices,
    fetchPayments,
    fetchUtilities,
    fetchRoomAssigns
  };
});
