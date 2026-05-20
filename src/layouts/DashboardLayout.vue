<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main -->
    <div class="dashboard-main">
      <!-- Navbar -->
      <Navbar />

      <!-- Content -->
      <main class="dashboard-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/dashboard/Sidebar.vue";
import Navbar from "@/components/dashboard/Navbar.vue";
</script>

<style scoped>
/* =========================
   ROOT LAYOUT
========================= */
.dashboard-layout {
  width: 1400px;
  min-height: 100vh;

  background: #f8fafc;

  overflow-x: hidden;
}

/* =========================
   MAIN
========================= */
.dashboard-main {
 min-width: 280px;
  min-height: 100vh;
  margin-left: 180px;
  width: calc(100% - 285px);


  transition: all 0.3s ease;
}

.dashboard-content {
  width: 100%;
  padding: 24px;
}

/* =========================
   MOBILE
========================= */
@media (max-width: 900px) {
  .dashboard-main {
    margin-left: 0;
    width: 100%;
  }

  .dashboard-content {
    padding: 18px;
  }
}

@media (max-width: 576px) {
  .dashboard-content {
    padding: 14px;
  }
}
</style>