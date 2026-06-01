import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/API/api";

export const useUserStore = defineStore("user", () => {
  const users = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchUsers = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get("/users");
      users.value = response.data.data || response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការទាញយកទិន្នន័យអ្នកប្រើប្រាស់";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const createUser = async (userData) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.post("/users", userData);
      await fetchUsers();
      return response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការបង្កើតអ្នកប្រើប្រាស់ថ្មី";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateUser = async (id, userData) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.put(`/users/${id}`, userData);
      await fetchUsers();
      return response.data;
    } catch (err) {
      error.value = "បរាជ័យក្នុងការកែប្រែអ្នកប្រើប្រាស់";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteUser = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      await api.delete(`/users/${id}`);
      await fetchUsers();
    } catch (err) {
      error.value = "បរាជ័យក្នុងការលុបអ្នកប្រើប្រាស់";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  };
});
