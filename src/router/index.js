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
import UsersView from "@/views/dashboard/UsersView.vue";
import RoomAssignView from "@/views/dashboard/RoomAssignView.vue";
import UtilityView from "@/views/dashboard/UtilityView.vue";
import UtilityMeterView from "@/views/dashboard/UtilityMeterView.vue";
import UtilityTypeView from "@/views/dashboard/UtilityTypeView.vue";
import BillDetailView from "@/views/dashboard/BillDetailView.vue";

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
          path: "users",
          name: "Users",
          component: UsersView,
        },
        {
          path: "room",
          name: "Room",
          component: RoomsView,
        },
        {
          path: "tenant",
          name: "Tenant",
          component: TenantsView,
        },
        {
          path: "roomAssign",
          name: "RoomAssign",
          component: RoomAssignView,
        },
        {
          path: "utility",
          name: "Utility",
          component: UtilityView,
        },
        {
          path: "utilityMeter",
          name: "UtilityMeter",
          component: UtilityMeterView,
        },
        {
          path: "utilityType",
          name: "UtilityType",
          component: UtilityTypeView,
        },
        {
          path: "bill",
          name: "Bill",
          component: BillsView,
        },
        {
          path: "billDetail",
          name: "BillDetail",
          component: BillDetailView,
        },
        {
          path: "payment",
          name: "Payment",
          component: PaymentsView,
        },
        {
          path: "invoice",
          name: "Invoice",
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
