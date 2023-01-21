import Subscription from 'App/Models/Subscription'

export default class SubscriptionServices {
  public static async getSubsByUser(user_id: number) {
    return await Subscription.query()
      .where('user_id', user_id)
      .preload('products', (p) => p.preload('ProductSubscription'))
      .preload('timeSlot')
      .preload('dates')
      .preload('days')
      .preload('addOn', (q) => q.preload('product'))
  }
  /**
   * getOrders
   * @param userId: string
   */
  public static async getSubscriptionsByUser(userId: string) {
    const userSubscriptions = Subscription.query()
      .where('user_id', userId)
      .preload('products')
      .preload('dates')
      .preload('days')

    if (!userSubscriptions) throw Error('No user Subscriptions found')

    return userSubscriptions
  }

  /**
   * createOrder
   */

  public static async createSubscription(body) {
    console.log(body.dates, body.type)

    const subscription = await Subscription.create({
      userId: 1,
      startDate: body.startDate,
      endDate: body.endDate,
      status: body.status,
      totalAmount: body.amount,
      recurrence: body.type,
    })

    let productsObject = {}

    body.products.forEach((key, i) => (productsObject[key] = { quantity: body.quantity[i] }))

    const products = await subscription.related('products').attach(productsObject)

    return { subscription, products }
  }

  public static async getSubscription(model, payload) {
    model.create(payload)
  }
}
