<template>
  <div class="app-container">
    <Sidebar />

    <main class="main-wrapper">
      <Navbar />

      <div class="content-padding">
        <RouterView />
      </div>
    </main>

    <CreateRoomModal 
      :show="isCreateModalOpen" 
      @close="isCreateModalOpen = false" 
      @submit="handleCreated"
    />
  </div>
</template>

<script setup>
import { ref, provide } from "vue";
import { useNoteStore } from "@/stores/note";

import Sidebar from "@/components/userdashboard/Sidebar.vue";
import Navbar from "@/components/userdashboard/Navbar.vue";
import CreateRoomModal from "@/components/ui/CreateRoomModal.vue";

const noteStore = useNoteStore();

/* ================= SIDEBAR & MODAL STATE ================= */
const isSidebarOpen = ref(false);
const isCreateModalOpen = ref(false);

const toggleCreateModal = () => (isCreateModalOpen.value = !isCreateModalOpen.value);

provide("sidebar", {
  isSidebarOpen,
  toggleSidebar: () => (isSidebarOpen.value = !isSidebarOpen.value),
  closeSidebar: () => (isSidebarOpen.value = false),
});

provide("modals", {
  isCreateModalOpen,
  toggleCreateModal
});
/* ================================================= */

const createRef = ref(null);
const viewModalRef = ref(null);
const editModalRef = ref(null);
const activeTask = ref(null);

const refreshKey = ref(0);
const refreshList = () => refreshKey.value++;

const openCreate = () => createRef.value?.open();

const handleCreated = async () => {
  await noteStore.fetchAllNotes();
};

const openView = (task) => {
  activeTask.value = task;
  viewModalRef.value?.open();
};

const openEdit = (task) => {
  activeTask.value = task;
  editModalRef.value?.open();
};

const onMarkCompleted = (task) => {
  const key = "reablist_tasks";
  const list = JSON.parse(localStorage.getItem(key) || "[]");

  localStorage.setItem(
    key,
    JSON.stringify(
      list.map((t) =>
        t.id === task.id
          ? { ...t, isCompleted: true, updatedAt: new Date().toISOString() }
          : t
      )
    )
  );

  activeTask.value = { ...task, isCompleted: true };
  refreshList();
};

const onTaskUpdated = (task) => {
  activeTask.value = task;
  refreshList();
};
</script>

<style scoped>
/* ================= LAYOUT ================= */
.app-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: #f8f9fa;
}

/* Desktop layout */
.main-wrapper {
  margin-left: 280px;
  width: calc(100% - 280px);
}

/* Content spacing */
.content-padding {
  min-height: 100vh;
  padding:6px 18px;
}

/* ================= MOBILE ================= */
@media (max-width: 900px) {
  .main-wrapper {
    margin-left: 0;
    width: 100%;
  }

  .content-padding {
    padding-top: 64px;
  }
}

@media (max-width: 680px) {
  .content-padding {
    padding: 12px;
  }
}
</style>
