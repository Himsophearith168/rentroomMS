import { defineStore } from "pinia";
import { ref } from "vue";

export const useNoteStore = defineStore("note", () => {
  const notes = ref([]);
  const all = ref([]);
  const searchResults = ref([]);
  const loading = ref(false);

  const fetchAllNotes = async () => {
    loading.value = true;
    return new Promise((resolve) => {
      setTimeout(() => {
        notes.value = [];
        all.value = [];
        loading.value = false;
        resolve();
      }, 500);
    });
  };

  const fetchNotes = fetchAllNotes;

  const searchNotes = (query) => {
    if (!query) {
      searchResults.value = [];
      return;
    }
    searchResults.value = all.value.filter(n => n.title.includes(query));
  };

  const clearSearch = () => {
    searchResults.value = [];
  };

  return {
    notes,
    all,
    searchResults,
    loading,
    fetchAllNotes,
    fetchNotes,
    searchNotes,
    clearSearch,
  };
});
