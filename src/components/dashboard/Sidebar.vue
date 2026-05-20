<template>
  
    <!-- Overlay -->
    <Transition name="fade">
      <div
        v-if="isSidebarOpen"
        class="sidebar-overlay"
        @click="closeSidebar"
      />
    </Transition>

    <!-- Sidebar -->
    <aside
      class="dashboard-sidebar"
      :class="{ open: isSidebarOpen }"
    >
      <!-- Logo -->
      <div class="sidebar-logo">
        <div class="logo-box">
          <i class="bi bi-grid-fill"></i>
        </div>

        <h2>
          Teas<span>Jul</span>
        </h2>
      </div>

      <!-- Navigation -->
      <nav class="sidebar-nav">
        <RouterLink
          to="/"
          class="nav-link"
          active-class="active"
        >
          <i class="bi bi-house-door-fill"></i>
          <span>Dashboard</span>
        </RouterLink>

        <RouterLink
          to="/tasks"
          class="nav-link"
          active-class="active"
        >
          <i class="bi bi-check2-square"></i>
          <span>Tasks</span>
        </RouterLink>

        <RouterLink
          to="/analytics"
          class="nav-link"
          active-class="active"
        >
          <i class="bi bi-bar-chart-fill"></i>
          <span>Analytics</span>
        </RouterLink>

        <RouterLink
          to="/settings"
          class="nav-link"
          active-class="active"
        >
          <i class="bi bi-gear-fill"></i>
          <span>Settings</span>
        </RouterLink>
      </nav>

      <!-- Bottom -->
      <div class="sidebar-bottom">
        <button class="logout-btn">
          <i class="bi bi-box-arrow-right"></i>
          Logout
        </button>
      </div>
    </aside>
 
</template>

<script setup>
import { useSidebar } from "@/composable/useSidebar";

const { isSidebarOpen, closeSidebar } = useSidebar();
</script>

<style scoped>
.dashboard-sidebar {
  position: fixed;

  top: 0;
  left: 0;
  bottom: 0;

  width: 285px;

  background: rgba(255,255,255,0.9);

  backdrop-filter: blur(20px);

  border-right: 1px solid rgba(226,232,240,0.8);

  padding: 24px 18px;

  display: flex;
  flex-direction: column;

  z-index: 1100;

  transition: all 0.3s ease;
}

.sidebar-logo {
  display: flex;
  align-items: center;

  gap: 14px;

  margin-bottom: 40px;
}

.logo-box {
  width: 52px;
  height: 52px;

  border-radius: 18px;

  background:
    linear-gradient(
      135deg,
      #14b8a6,
      #0f766e
    );

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;

  font-size: 22px;

  box-shadow:
    0 10px 25px rgba(20,184,166,0.25);
}

.sidebar-logo h2 {
  margin: 0;

  font-size: 28px;
  font-weight: 900;

  color: #0f172a;
}

.sidebar-logo span {
  color: #14b8a6;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;

  gap: 10px;
}

.nav-link {
  display: flex;
  align-items: center;

  gap: 14px;

  padding: 14px 18px;

  border-radius: 18px;

  text-decoration: none;

  color: #64748b;

  font-weight: 700;

  transition: all 0.25s ease;
}

.nav-link:hover {
  background: rgba(20,184,166,0.08);

  color: #0f766e;
}

.nav-link.active {
  background:
    linear-gradient(
      135deg,
      rgba(20,184,166,0.14),
      rgba(20,184,166,0.06)
    );

  color: #0f766e;
}

.sidebar-bottom {
  margin-top: auto;
}

.logout-btn {
  width: 100%;
  height: 54px;

  border: none;

  border-radius: 18px;

  background:
    linear-gradient(
      135deg,
      #ef4444,
      #dc2626
    );

  color: white;

  font-weight: 800;

  cursor: pointer;

  transition: all 0.3s ease;
}

.logout-btn:hover {
  transform: translateY(-2px);
}

.sidebar-overlay {
  position: fixed;
  inset: 0;

  background: rgba(0,0,0,0.35);

  z-index: 1000;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .dashboard-sidebar {
    transform: translateX(-100%);
  }

  .dashboard-sidebar.open {
    transform: translateX(0);
  }
}
</style>