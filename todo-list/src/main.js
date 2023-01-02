import { createApp } from "vue";
import { createPinia } from "pinia";
import VCalendar from "v-calendar";
import App from "./App.vue";
import router from "./router";

import "v-calendar/dist/style.css";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());

app.use(VCalendar, {});

app.use(router);

app.mount("#app");

const _userData = {
  id: "",
  customerId: "",
  walletType: "",
  image: "",
  name: "",
  lastTransation: "",
  createdAt: "",
  updatedAt: "",
  amount: "",
};

const productItem = {
  id: "",
  name: "",
  description: "",
  image: "",
  price: "",
  stockAvailable: "",
};

const cartItem = [
  {
    id: "",
    price: "",
    image: "",
    quantity: "",
  },
];
