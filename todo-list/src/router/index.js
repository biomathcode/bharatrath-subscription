import axios from "axios";
import { createRouter, createWebHistory } from "vue-router";
import { HomeView, AboutView, SubscriptionsView, CheckoutView } from "../pages";
import { store } from "../stores/store";

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
      component: SubscriptionsView,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CheckoutView,
    },
  ],
});

export default router;
