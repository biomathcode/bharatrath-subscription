import Subscription from 'App/Models/Subscription'

export default class SubscriptionServices {
  public static async getSubsByUser(user_id: number) {
    return await Subscription.query()
      .where('user_id', user_id)
      .preload('subProducts', (p) => p.preload('Product'))
      .preload('timeSlot')
      .preload('dates')
      .preload('days')
      .preload('addOn', (q) => q.preload('product'))
  }

  public static async getSubsById(id: number) {
    return await Subscription.query()
      .where('id', id)
      .preload('subProducts', (p) => p.preload('Product'))
      .preload('timeSlot')
      .preload('dates')
      .preload('days')
      .preload('addOn', (q) => q.preload('product'))
      .first()
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
