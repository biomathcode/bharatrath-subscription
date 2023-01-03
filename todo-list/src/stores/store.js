import { reactive } from "vue";
import { v4 as uuid } from "uuid";
import axios from "axios";

export const store = reactive({
  products: [],
  cart: [],
  user: {
    name: "Pratik Sharma",
    amount: 500,
  },
  getUser(user) {
    this.user = { ...user, name: "Pratik Sharma" };
  },
  subscription: [],
  transaction: [],
  getProducts(products) {
    this.products = [...this.products, ...products];
    console.log("this are products", products);
    console.log(this.products.values);
  },
  getSubscription(subscriptions) {
    this.subscription = [...this.subscription, ...subscriptions];
  },
  getTransactions(transactions) {
    this.transaction = [...this.transactions, ...transactions];
  },

  async startSubscription(SelectedDays, startDate) {
    const newSub = {
      id: uuid(),
      createdAt: new Date(),
      products: this.cart,
      startDate: startDate,
      SelectedDays,
    };
    this.subscription = [...this.subscription, newSub];

    const products = this.cart.map((el) => el.id);

    const totalAmount = store.cart?.reduce(
      (prev, curr) => prev + curr.quantity * curr.price,
      0
    );

    const response = await axios.post(
      "http://localhost:3333/users/1/subscriptions",
      {
        products,
        startDate,
        amount: totalAmount,
        status: "active",
      }
    );
    console.log(response);

    this.cart = [];
  },
  credit(amount) {
    const newTransaction = {
      id: uuid(),
      amount,
      type: "credited",
      date: new Date(),
    };
    this.user = {
      ...this.user,
      amount: Number(amount) + this.user.amount,
    };
    this.transaction = [...this.transaction, newTransaction].sort(function (
      a,
      b
    ) {
      return new Date(b.date) - new Date(a.date);
    });
  },
  addCartItem(item) {
    this.cart = [...this.cart, item];
    console.log(this.cart.length);
  },
  removeCardItem(item) {
    this.cart = this.cart.filter((el) => el !== item);
  },
  addQuantity(id) {
    let updatedItem = this.cart.filter((el) => el.id === id)[0];
    let filteredItem = this.cart.filter((el) => el.id !== id);

    updatedItem.quantity += 1;
    this.cart = [...filteredItem, updatedItem];
  },
  removeQuantity(id) {
    let updatedItem = this.cart.filter((el) => el.id === id)[0];
    let filterItem = this.cart.filter((el) => el.id !== id);

    if (updatedItem.quantity === 1) {
      this.cart = [...filterItem];
    } else {
      updatedItem.quantity -= 1;
      this.cart = [...this.cart, updatedItem];
    }
  },
});
