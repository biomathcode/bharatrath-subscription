import { OrderStatus } from 'Contracts/enums'
import Order from 'App/Models/Order'
import { DateTime } from 'luxon'
import Database from '@ioc:Adonis/Lucid/Database'

export default class OrderService {
  /**
   * getOrders
   */
  public static async getOrders() {
    const orders = await Order.query().preload('products')

    const getAllquantity = await Database.query().from('order_products').select('*')

    return { orders, quantity: getAllquantity }
  }

  /**
   * createOrder
   */

  public static async createOrder(body) {
    const createOrder = await Order.create({
      status: 'arriving',
      deliveryDate: DateTime.fromISO(body.date),
      userId: '1',
      amount: body.amount,
      deliveryCharge: 20,
      quantity: '2',
      // address: body.address,
    })

    let productsObject = {}

    body.products.forEach((key, i) => (productsObject[key.id] = { quantity: key.quantity }))

    const addProduct = await createOrder.related('products').attach(productsObject)

    return { createOrder, addProduct }
  }
}
