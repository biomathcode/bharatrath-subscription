import { reactive, toRaw } from "vue";
import { v4 as uuid } from "uuid";
import axios from "../axios/index";
import { WeekData } from "../utils";

// user
//TODO: refactor to individual stores

export const store = reactive({
  products: [],
  cart: [],
  order: [],
  user: {},
  transactions: [],
  subscription: [],

  getUser(user) {
    console.log("this is user", user);
    this.user = { ...user };
  },
  getProducts(products) {
    this.products = [...this.products, ...products];
    console.log("this are products", products);
    console.log(this.products.values);
  },
  async filterSubs(id) {
    return this.subscription.filter((el) => el.id === id);
  },
  getOrders(orders, quantity) {
    console.log("this is quantiy", quantity);
    const newData = orders.map((element) => {
      const newProduct = element.products.map((pd) => {
        const quant = quantity.filter(
          (el) => el.product_id === pd.id && el.order_id === element.id
        )[0];
        return {
          ...pd,
          quantity: quant.quantity,
        };
      });

      return {
        ...element,
        products: newProduct,
      };
    });

    console.log("this are the orders", newData);

    this.order = [...newData];
  },
  getSubscription(subscriptions) {
    this.subscription = subscriptions;
  },
  getTransactions(transactions) {
    this.transaction = [...this.transactions, ...transactions];
  },
  async updateSubscription(id, payload) {
    const data = this.subscription.filter((el) => el.id === id);
  },

  async startSubscription(startDate, endDate, type, orderToday, Days, dates) {
    const products = toRaw(this.cart.map((el) => el.id));
    const quantity = toRaw(this.cart.map((el) => el.quantity));
    const totalAmount = this.cart?.reduce(
      (prev, curr) => prev + curr.quantity * curr.price,
      0
    );
    const newDays = WeekData.filter((el) => Days.includes(el.value));

    const newSub = {
      createdAt: new Date(),
      products: toRaw(products),
      startDate: startDate,
      endDate: endDate,
      type: type,
      orderToday: orderToday,
      dates,
      days: newDays,
      status: "active",
      quantity,
      amount: totalAmount,
    };

    this.subscription = [...this.subscription, { id: uuid(), ...newSub }];

    const response = await axios.post("/users/1/subscriptions", newSub);
    console.log(response);

    this.cart = [];
  },
  async credit(amount) {
    const newTransaction = {
      id: this.user.transaction.length + 1,
      amount,
      type: "credit",
      date: new Date(),
    };
    await axios.put("/wallets/1", {
      amount: Number(amount) + this.user.wallet.amount,
    });

    await axios.post("/users/1/transactions", {
      amount: amount,
      type: "credit",
    });
    this.user = {
      ...this.user,
      wallet: {
        amount: Number(amount) + this.user.wallet.amount,
      },
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
