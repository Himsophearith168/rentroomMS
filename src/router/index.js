import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authentication";

// Layout
import UserDashboardLayout from "@/layouts/UserDashboardLayout.vue";

// Views
import DashboardView from "@/views/dashboard/DashboardView.vue";

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
      path: "/dashboard",
      component: UserDashboardLayout,
      meta: { requiresAuth: false }, // Set to false to allow viewing without login as requested
      children: [
        {
          path: "", 
          name: "Dashboard",
          component: DashboardView,
        },
        {
          path: "all-tasks",
          name: "AllTasks",
          component: DashboardView,
        },
        {
          path: "category/:name",
          name: "Category",
          component: DashboardView,
        },
      ],
    },
  ], 
});

// Simple navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // If we had a login page, we'd redirect here
    // For now, let's just proceed or redirect to dashboard
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
