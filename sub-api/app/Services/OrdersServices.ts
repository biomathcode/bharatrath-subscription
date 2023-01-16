import { OrderStatus } from 'Contracts/enums'
import Order from 'App/Models/Order'
import { DateTime } from 'luxon'
import Database from '@ioc:Adonis/Lucid/Database'
import { format, getDay } from 'date-fns'

export default class OrderService {
  /**
   * getOrders
   */
  public static async getOrders() {
    const orders = await Order.query().preload('products')

    const getAllquantity = await Database.query().from('order_products').select('*')

    return { orders, quantity: getAllquantity }
  }

  public static dayMatch(days, day) {
    const daysArr = days.map((el) => el.value)

    if (daysArr.includes(getDay(day))) return true
  }

  public static dateMatch(dates, date) {
    const datesArr = dates.map((el) => format(new Date(el.date.toString()), 'yyyy-MM-dd'))

    if (datesArr.includes(date)) return true
  }

  /**
   * createOrder
   */

  public static async createOrder(body: any) {
    const createOrder = await Order.create({
      status: 'arriving',
      deliveryDate: DateTime.fromISO(body.date),
      userId: '1',
      amount: body.amount,
      deliveryCharge: 20,
      quantity: '2',
      // address: body.address,
    })

    let newProductObject = {}

    body.products.map((product) => {
      const id = product.id

      newProductObject[id] = {
        quantity: product.ProductSubscription[0].quantity,
      }
    })

    await createOrder.related('products').attach(newProductObject)

    return createOrder
  }
}
