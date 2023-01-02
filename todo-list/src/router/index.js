import axios from "axios";
import { createRouter, createWebHistory } from "vue-router";
import { HomeView, AboutView, CalendarView, CheckoutView } from "../pages";
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
      path: "/calendar",
      name: "calendar",
      component: CalendarView,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CheckoutView,
    },
  ],
});

export default router;
