import { createRouter, createWebHistory } from "vue-router";
import AuthView from "../pages/auth/AuthView.vue";
import AppView from "../pages/AppView.vue";
import UsersView from "../pages/users/UsersView.vue";
import ProductsView from "../pages/products/ProductsView.vue";
import StatisticsView from "../pages/statistic/StatisticsView.vue";
import BannerView from "../pages/banners/BannerView.vue";
import _404 from "../pages/_404.vue";
import ProductModelsView from "../pages/product-models/ProductModelsView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: AuthView,
    },
    {
      path: "/",
      name: "Dashboard",
      component: AppView,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
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
        {
          path: "banners",
          name: "Banners",
          component: BannerView,
        },
        {
          path: "models",
          name: "Models",
          component: ProductModelsView,
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

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem("texnoBazaar");

  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else if (to.path === "/login" && token) {
    next("/");
  } else {
    next();
  }
});

export default router;
