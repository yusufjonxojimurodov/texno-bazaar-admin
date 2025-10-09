import { createRouter, createWebHistory } from "vue-router";
import AuthView from "../pages/auth/AuthView.vue";
import AppView from "../pages/AppView.vue";
import UsersView from "../pages/users/UsersView.vue";
import ProductsView from "../pages/products/ProductsView.vue";
import StatisticsView from "../pages/statistic/StatisticsView.vue";
import _404 from "../pages/_404.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Login",
      component: AuthView,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: AppView,
      meta: { requiresAuth: true },
      children: [
        {
          path: "users",
          name: "Users",
          component: UsersView,
        },
        {
          path: "products",
          name: "Products",
          component: ProductsView,
        },
        {
          path: "statistics",
          name: "Statistics",
          component: StatisticsView,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: _404,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("texnoBazaar");

  if (to.meta.requiresAuth && !token) {
    next("/");
  } else if (to.path === "/login" && token) {
    next("/dashboard/users");
  } else {
    next();
  }
});

export default router;
