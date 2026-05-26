import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authentication";

// Layout
import UserDashboardLayout from "@/layouts/UserDashboardLayout.vue";

// Views
import LoginView from "@/views/Authentication/LoginView.vue";
import DashboardView from "@/views/dashboard/DashboardView.vue";
import RoomsView from "@/views/dashboard/RoomsView.vue";
import TenantsView from "@/views/dashboard/TenantsView.vue";
import BillsView from "@/views/dashboard/BillsView.vue";
import PaymentsView from "@/views/dashboard/PaymentsView.vue";
import InvoicesView from "@/views/dashboard/InvoicesView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: { requiresAuth: false },
    },
    {
      path: "/dashboard",
      component: UserDashboardLayout,
      meta: { requiresAuth: true }, 
      children: [
        {
          path: "", 
          name: "Dashboard",
          component: DashboardView,
        },
        {
          path: "rooms",
          name: "Rooms",
          component: RoomsView,
        },
        {
          path: "tenants",
          name: "Tenants",
          component: TenantsView,
        },
        {
          path: "bills",
          name: "Bills",
          component: BillsView,
        },
        {
          path: "payments",
          name: "Payments",
          component: PaymentsView,
        },
        {
          path: "invoices",
          name: "Invoices",
          component: InvoicesView,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/dashboard",
    },
  ], 
});

// Simple navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.name === "Login" && isAuthenticated) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
