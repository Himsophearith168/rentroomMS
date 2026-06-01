<template>
  <div>
    <Transition name="overlay-fade">
      <div v-if="isSidebarOpen" class="sidebar-overlay" @click="closeSidebar" />
    </Transition>

    <aside id="reab-sidebar" :class="{ open: isSidebarOpen }">
      <!-- Logo -->
      <div class="logo-sticky">
        <div class="logo-section">
          <a href="#" class="brand-area">
            <div class="brand-logo">
              <i class="bi bi-check2-circle"></i>
            </div>
            <span class="brand-name">
              <span class="brand-color">ផ្ទះជួល</span
              ><span class="brand-last-color">តាពេជ្រ</span>
            </span>
          </a>
        </div>
      </div>

      <!-- Navigation -->
      <nav>
        <p class="nav-label">ផ្ទាំងគ្រប់គ្រងគោល</p>

        <router-link
          :to="{ name: 'Dashboard' }"
          class="reab-nav-link"
          active-class="active"
          exact
          @click="handleNavClick"
        >
          <i class="fas fa-chart-pie"></i>
          <span>ផ្ទាំងគ្រប់គ្រង</span>
        </router-link>

        <router-link
          :to="{ name: 'Users' }"
          class="reab-nav-link"
          active-class="active"
          @click="handleNavClick"
        >
          <i class="fas fa-user-shield"></i>
          <span>អ្នកប្រើប្រាស់</span>
        </router-link>

        <p class="nav-label">ការគ្រប់គ្រងបន្ទប់ និងអ្នកជួល</p>

        <router-link
          :to="{ name: 'Room' }"
          class="reab-nav-link"
          active-class="active"
          @click="handleNavClick"
        >
          <i class="fas fa-door-open"></i>
          <span>បន្ទប់ជួល</span>
        </router-link>
        <router-link
          :to="{ name: 'Tenant' }"
          class="reab-nav-link"
          active-class="active"
          @click="handleNavClick"
        >
          <i class="fas fa-users"></i>
          <span>អ្នកជួល</span>
        </router-link>

        <p class="nav-label">សេវាកម្ម និងការវាស់វែង</p>

        <router-link
          :to="{ name: 'UtilityMeter' }"
          class="reab-nav-link"
          active-class="active"
          @click="handleNavClick"
        >
          <i class="fas fa-tachometer-alt"></i>
          <span>ការវាស់ស្ទង់ម៉ែត្រ</span>
        </router-link>
        <router-link
          :to="{ name: 'Utility' }"
          class="reab-nav-link"
          active-class="active"
          @click="handleNavClick"
        >
          <i class="fas fa-dollar-sign"></i>
          <span>តម្លៃសេវាកម្ម</span>
        </router-link>
        <router-link
          :to="{ name: 'UtilityType' }"
          class="reab-nav-link"
          active-class="active"
          @click="handleNavClick"
        >
          <i class="fas fa-cogs"></i>
          <span>ប្រភេទសេវាកម្ម</span>
        </router-link>

        <p class="nav-label">ហិរញ្ញវត្ថុ និងវិក្កយបត្រ</p>

        <router-link
          :to="{ name: 'Bill' }"
          class="reab-nav-link"
          active-class="active"
          @click="handleNavClick"
        >
          <i class="fas fa-file-invoice-dollar"></i>
          <span>វិក្កយបត្រ (Bills)</span>
        </router-link>

        <router-link
          :to="{ name: 'BillDetail' }"
          class="reab-nav-link"
          active-class="active"
          @click="handleNavClick"
        >
          <i class="fas fa-list-ol"></i>
          <span>លម្អិតវិក្កយបត្រ</span>
        </router-link>

        <router-link
          :to="{ name: 'Payment' }"
          class="reab-nav-link"
          active-class="active"
          @click="handleNavClick"
        >
          <i class="fas fa-money-check-alt"></i>
          <span>ការទូទាត់ (Payments)</span>
        </router-link>

        <router-link
          :to="{ name: 'Invoice' }"
          class="reab-nav-link"
          active-class="active"
          @click="handleNavClick"
        >
          <i class="fas fa-file-contract"></i>
          <span>វិក្កយបត្រផ្លូវការ (Invoices)</span>
        </router-link>
      </nav>

      <!-- Footer -->
      <div class="mt-auto">
        <button class="btn-logout" @click="openLogoutModal">
          <i class="fas fa-sign-out-alt me-2"></i>
          ចាកចេញ
        </button>
      </div>
      
    </aside>

    <!-- Logout Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showLogoutModal"
          class="modal-backdrop"
          @click.self="closeLogoutModal"
        >
          <div class="modal-card" @click.stop>
            <div class="modal-head">
              <h3>ចាកចេញ?</h3>
              <button @click="closeLogoutModal" class="close-btn" type="button">
                &times;
              </button>
            </div>
            <div class="modal-body">
              <p>តើអ្នកប្រាកដថាចង់ចាកចេញពីគណនីរបស់អ្នកដែរឬទេ?</p>
            </div>
            <div class="modal-foot">
              <button
                class="btn-cancel"
                @click="closeLogoutModal"
                type="button"
              >
                បោះបង់
              </button>
              <button
                class="btn-confirm-logout"
                @click="handleLogout"
                :disabled="isLoggingOut"
                type="button"
              >
                <i class="bi bi-box-arrow-right fw-bold"></i>
                {{ isLoggingOut ? "កំពុងចាកចេញ..." : "ចាកចេញ" }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import api from "@/API/api";
import { useAuthStore } from "@/stores/authentication";
import { PlusCircle } from "lucide-vue-next";
import { useSidebar } from "@/composable/Usesidebar";

// ── Sidebar state — same singleton as Navbar ─────────────────────
const { isSidebarOpen, closeSidebar } = useSidebar();
const { toggleCreateModal } = inject("modals");

const router = useRouter();
const authStore = useAuthStore();

const showLogoutModal = ref(false);
const isLoggingOut = ref(false);

const handleNavClick = () => {
  if (window.innerWidth <= 900) closeSidebar();
};

const openCreateTask = () => {
  closeSidebar?.();
  toggleCreateModal(); 
};
const openLogoutModal = () => {
  showLogoutModal.value = true;
};

const handleLogout = async () => {
  if (isLoggingOut.value) return;
  isLoggingOut.value = true;
  try {
    await api.post("/auth/logout");
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    authStore.logout();
    showLogoutModal.value = false;
    isLoggingOut.value = false;
    router.push("/login");
  }
};
</script>

<style scoped>
/* Sidebar shell ─────────────────────────────────────────────────── */
#reab-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--sidebar-width);
  height: 100vh;
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border-color);
  z-index: 1100;
  transition: var(--transition);
  overflow-y: auto;
}

/* Brand ─────────────────────────────────────────────────────────── */
.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
  padding: 0 12px;
}

.brand-area {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.brand-logo {
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, var(--primary), #14b8a6);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(13, 148, 136, 0.25);
  transition: var(--transition);
}

.brand-area:hover .brand-logo {
  transform: scale(1.05) rotate(-5deg);
}

.brand-name {
  font-weight: 800;
  font-size: 1.25rem;
  color: var(--text-main);
  letter-spacing: -0.02em;
}

.brand-color {
  color: var(--primary);
}

/* Nav ───────────────────────────────────────────────────────────── */
.nav-label {
  margin: 24px 0 8px 16px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-light);
}

.reab-nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin-bottom: 4px;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  color: var(--text-muted);
  border-radius: var(--radius-md);
  transition: var(--transition);
}

.reab-nav-link i {
  font-size: 1.1rem;
  width: 20px;
  text-align: center;
}

.reab-nav-link:hover {
  background: var(--primary-soft);
  color: var(--primary);
  transform: translateX(4px);
}

.reab-nav-link.active {
  background: var(--primary);
  color: white;
  box-shadow: 0 4px 12px rgba(13, 148, 136, 0.2);
}

.reab-nav-link.active i {
  color: white;
}

/* Logout ────────────────────────────────────────────────────────── */
.btn-logout {
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  background: transparent;
  border: 1.5px solid var(--danger-soft);
  border-radius: var(--radius-md);
  color: var(--danger);
  transition: var(--transition);
}

.btn-logout:hover {
  background: var(--danger-soft);
  border-color: var(--danger);
}

/* Logout modal ──────────────────────────────────────────────────── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  padding: 18px;
}
.modal-card {
  width: 90%;
  max-width: 480px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 25px 80px rgba(15, 23, 42, 0.28);
  border: 1px solid rgba(15, 23, 42, 0.08);
  overflow: hidden;
  position: relative;
  animation: popIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(16px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 22px;
  border-bottom: 1px solid #e5e7eb;
}
.modal-head h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: #b91c1c;
}
.close-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  color: #94a3b8;
  font-size: 28px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.2s,
    color 0.2s;
}
.close-btn:hover {
  background: #f1f5f9;
  color: #475569;
}
.modal-body {
  padding: 18px 22px;
  color: #475569;
  font-size: 15px;
  line-height: 1.7;
}
.modal-body p {
  margin: 0;
}
.modal-foot {
  display: flex;
  justify-content: flex-end;
  gap: 14px;
  padding: 18px 22px 22px;
}
.btn-cancel {
  width: 120px;
  height: 48px;
  border-radius: 12px;
  border: 1.5px solid #e2e8f0;
  background: #fff;
  color: #0f172a;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-cancel:hover {
  background: #f8fafc;
  transform: translateY(-1px);
}
.btn-confirm-logout {
  width: 140px;
  height: 48px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: #fff;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
  box-shadow: 0 10px 25px rgba(239, 68, 68, 0.25);
}
.btn-confirm-logout:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 14px 35px rgba(239, 68, 68, 0.32);
}
.btn-confirm-logout:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
