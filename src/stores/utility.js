import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/API/api";

export const useUtilityStore = defineStore("utility", () => {
  const utilityTypes = ref([]);
  const utilityRates = ref([]);
  const activeRates = ref([]);
  const meterReadings = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // --- Utility Types ---
  const fetchUtilityTypes = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get("/utilityType");
      utilityTypes.value = response.data.data || response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការទាញយកប្រភេទសេវាកម្ម";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const createUtilityType = async (data) => {
    loading.value = true;
    try {
      const response = await api.post("/utilityType", data);
      await fetchUtilityTypes();
      return response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការបង្កើតប្រភេទសេវាកម្មថ្មី";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateUtilityType = async (id, data) => {
    loading.value = true;
    try {
      const response = await api.put(`/utilityType/${id}`, data);
      await fetchUtilityTypes();
      return response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការកែប្រែប្រភេទសេវាកម្ម";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteUtilityType = async (id) => {
    loading.value = true;
    try {
      await api.delete(`/utilityType/${id}`);
      await fetchUtilityTypes();
    } catch (err) {
      error.value = "បរាជ័យក្នុងការលុបប្រភេទសេវាកម្ម";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // --- Utility Rates ---
  const fetchUtilityRates = async () => {
    loading.value = true;
    try {
      const response = await api.get("/utility");
      utilityRates.value = response.data.data || response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការទាញយកតម្លៃសេវាកម្ម";
    } finally {
      loading.value = false;
    }
  };

  const fetchActiveRates = async () => {
    loading.value = true;
    try {
      const response = await api.get("/utility/active");
      activeRates.value = response.data.data || response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការទាញយកតម្លៃសេវាកម្មដែលកំពុងប្រើប្រាស់";
    } finally {
      loading.value = false;
    }
  };

  const createUtilityRate = async (data) => {
    loading.value = true;
    try {
      const payload = {
        utility_type_id: parseInt(data.utility_type_id),
        unit_price: parseFloat(data.unit_price),
        effective_from: data.effective_from,
        is_active: data.is_active ? 1 : 0
      };
      console.log("[UtilityStore] POST /utility payload:", payload);
      const response = await api.post("/utility", payload);
      await fetchUtilityRates();
      await fetchActiveRates();
      return response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការបង្កើតតម្លៃសេវាកម្មថ្មី";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateUtilityRate = async (id, data) => {
    loading.value = true;
    try {
      const payload = {
        utility_type_id: parseInt(data.utility_type_id),
        unit_price: parseFloat(data.unit_price),
        effective_from: data.effective_from,
        is_active: data.is_active ? 1 : 0
      };
      console.log(`[UtilityStore] PUT /utility/${id} payload:`, payload);
      const response = await api.put(`/utility/${id}`, payload);
      await fetchUtilityRates();
      await fetchActiveRates();
      return response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការកែប្រែតម្លៃសេវាកម្ម";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteUtilityRate = async (id) => {
    loading.value = true;
    try {
      await api.delete(`/utility/${id}`);
      await fetchUtilityRates();
      await fetchActiveRates();
    } catch (err) {
      error.value = "បរាជ័យក្នុងការលុបតម្លៃសេវាកម្ម";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // --- Meter Readings ---
  const fetchMeterReadings = async () => {
    loading.value = true;
    try {
      const response = await api.get("/utilityMeter");
      meterReadings.value = response.data.data || response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការទាញយកការវាស់ស្ទង់ម៉ែត្រ";
    } finally {
      loading.value = false;
    }
  };

  const createMeterReading = async (data) => {
    loading.value = true;
    try {
      const response = await api.post("/utilityMeter", data);
      await fetchMeterReadings();
      return response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការបង្កើតការវាស់ស្ទង់ម៉ែត្រថ្មី";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateMeterReading = async (id, data) => {
    loading.value = true;
    try {
      const response = await api.put(`/utilityMeter/${id}`, data);
      await fetchMeterReadings();
      return response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការកែប្រែការវាស់ស្ទង់ម៉ែត្រ";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteMeterReading = async (id) => {
    loading.value = true;
    try {
      await api.delete(`/utilityMeter/${id}`);
      await fetchMeterReadings();
    } catch (err) {
      error.value = "បរាជ័យក្នុងការលុបការវាស់ស្ទង់ម៉ែត្រ";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const getLatestReading = async (roomId, utilityTypeId) => {
    try {
      const response = await api.get(`/utilityMeter/latest`, {
        params: { room_id: roomId, utility_type_id: utilityTypeId }
      });
      return response.data.data || response.data;
    } catch (err) {
      console.error("Error fetching latest reading:", err);
      return null;
    }
  };

  return {
    utilityTypes,
    utilityRates,
    activeRates,
    meterReadings,
    loading,
    error,
    fetchUtilityTypes,
    createUtilityType,
    updateUtilityType,
    deleteUtilityType,
    fetchUtilityRates,
    fetchActiveRates,
    createUtilityRate,
    updateUtilityRate,
    deleteUtilityRate,
    fetchMeterReadings,
    createMeterReading,
    updateMeterReading,
    deleteMeterReading,
    getLatestReading
  };
});
