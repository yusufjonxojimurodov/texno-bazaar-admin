import { createRouter, createWebHistory } from "vue-router";
import AuthView from "../pages/auth/AuthView.vue";
import AppView from "../pages/AppView.vue";
import UsersView from "../pages/users/UsersView.vue";
import ProductsView from "../pages/products/ProductsView.vue";
import StatisticsView from "../pages/statistic/StatisticsView.vue";

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
  ],
});

export default router;
