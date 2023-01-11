import Subscription from 'App/Models/Subscription'

export default class OrderService {
  /**
   * getOrders
   */
  public static async getActiveSubscriptions() {
    const ActiveSubscriptions = await Subscription.query()
      .where('status', 'active')
      .preload('products')

    return ActiveSubscriptions
  }

  /**
   * createOrder
   */

  public static async createSubscription(body) {
    console.log(body.dates, body.type)

    // const subscription = await Subscription.create({
    //   userId: 1,
    //   startDate: body.startDate,
    //   endDate: body.endDate,
    //   status: body.status,
    //   totalAmount: body.amount,
    //   recurrence: body.type,
    // })

    // let productsObject = {}

    // body.products.forEach((key, i) => (productsObject[key] = { quantity: body.quantity[i] }))

    // const products = await subscription.related('products').attach(productsObject)

    // return { subscription, products }
  }
}
