import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/API/api";

export const useRentStore = defineStore("rent", () => {
  const rooms = ref([]);
  const tenants = ref([]);
  const assignments = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // --- Rooms ---
  const fetchRooms = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get("/room");
      rooms.value = response.data.data || response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការទាញយកទិន្នន័យបន្ទប់";
      console.error(err);
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

  const updateRoom = async (id, roomData) => {
    loading.value = true;
    try {
      const response = await api.put(`/room/${id}`, roomData);
      await fetchRooms();
      return response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការកែប្រែបន្ទប់";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteRoom = async (id) => {
    loading.value = true;
    try {
      await api.delete(`/room/${id}`);
      await fetchRooms();
    } catch (err) {
      error.value = "បរាជ័យក្នុងការលុបបន្ទប់";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // --- Tenants ---
  const fetchTenants = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get("/tenant");
      tenants.value = response.data.data || response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការទាញយកទិន្នន័យអ្នកជួល";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const createTenant = async (tenantData) => {
    loading.value = true;
    try {
      // Use FormData if tenantData contains a file (id_card)
      const config = tenantData instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
      const response = await api.post("/tenant", tenantData, config);
      await fetchTenants();
      return response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការបង្កើតអ្នកជួលថ្មី";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateTenant = async (id, tenantData) => {
    loading.value = true;
    try {
      const config = tenantData instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
      const response = await api.put(`/tenant/${id}`, tenantData, config);
      await fetchTenants();
      return response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការកែប្រែអ្នកជួល";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteTenant = async (id) => {
    loading.value = true;
    try {
      await api.delete(`/tenant/${id}`);
      await fetchTenants();
    } catch (err) {
      error.value = "បរាជ័យក្នុងការលុបអ្នកជួល";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // --- Assignments ---
  const fetchAssignments = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get("/roomAssign");
      assignments.value = response.data.data || response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការទាញយកទិន្នន័យការប្រគល់បន្ទប់";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const createAssignment = async (data) => {
    loading.value = true;
    try {
      const response = await api.post("/roomAssign", data);
      await fetchAssignments();
      await fetchRooms(); // Status changes to Occupied
      return response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការបង្កើតការប្រគល់បន្ទប់ថ្មី";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateAssignment = async (id, data) => {
    loading.value = true;
    try {
      const response = await api.put(`/roomAssign/${id}`, data);
      await fetchAssignments();
      return response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការកែប្រែការប្រគល់បន្ទប់";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const endAssignment = async (id, endDate) => {
    loading.value = true;
    try {
      const response = await api.put(`/roomAssign/${id}/end`, { end_date: endDate });
      await fetchAssignments();
      await fetchRooms(); // Status changes to Available
      return response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការបញ្ចប់ការជួល";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteAssignment = async (id) => {
    loading.value = true;
    try {
      await api.delete(`/roomAssign/${id}`);
      await fetchAssignments();
    } catch (err) {
      error.value = "បរាជ័យក្នុងការលុបការប្រគល់បន្ទប់";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    rooms,
    tenants,
    assignments,
    loading,
    error,
    fetchRooms,
    createRoom,
    updateRoom,
    deleteRoom,
    fetchTenants,
    createTenant,
    updateTenant,
    deleteTenant,
    fetchAssignments,
    createAssignment,
    updateAssignment,
    endAssignment,
    deleteAssignment
  };
});
