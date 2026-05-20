<template>
  <nav class="dashboard-navbar">
    <!-- Left -->
    <div class="navbar-left">
      <button
        class="menu-btn"
        @click="toggleSidebar"
      >
        <i class="bi bi-list"></i>
      </button>

      <div class="search-box">
        <i class="bi bi-search"></i>

        <input
          type="text"
          placeholder="Search..."
        />
      </div>
    </div>

    <!-- Right -->
    <div class="navbar-right">
      <UserSidebar />
    </div>
  </nav>
</template>

<script setup>
import { useSidebar } from "@/composable/useSidebar";
import UserSidebar from "./userSidebar.vue";

const { toggleSidebar } = useSidebar();
</script>

<style scoped>
.dashboard-navbar {
  height: 74px;
  width: 1100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: rgba(255,255,255,0.88);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(226,232,240,0.8);
  position: fixed;
  top: 0;
  z-index: 900;
}

.navbar-left {
  display: flex;
  align-items: center;

  /* gap: 10px; */
}

.menu-btn {
  width: 44px;
  height: 44px;

  border: none;

  border-radius: 14px;

  background: #f8fafc;

  cursor: pointer;

  font-size: 24px;

  color: #334155;
}

.search-box {
  width: 350px;
  height: 50px;

  background: #f8fafc;

  border: 1px solid #e2e8f0;

  border-radius: 16px;

  padding: 0 18px;

  display: flex;
  align-items: center;

  gap: 12px;
}

.search-box input {
  flex: 1;

  border: none;
  outline: none;

  background: transparent;
}

@media (max-width: 1200px) {
  .search-box {
    width: 250px;
  }
}

@media (max-width: 576px) {
  .dashboard-navbar {
    padding: 0 14px;
  }

  .search-box {
    display: none;
  }
}
</style>