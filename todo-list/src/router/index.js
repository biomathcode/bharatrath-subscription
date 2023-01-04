import { createRouter, createWebHistory } from "vue-router";
import {
  HomeView,
  AboutView,
  SubscriptionView,
  CheckoutView,
  OrderView,
} from "../pages";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,

      // component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
      // component: ProductListView,
    },
    {
      path: "/subscriptions",
      name: "subscriptions",
      component: SubscriptionView,
    },
    {
      path: "/orders",
      name: "orders",
      component: OrderView,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CheckoutView,
    },
  ],
});

export default router;
