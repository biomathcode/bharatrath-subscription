import { BaseTask } from 'adonis5-scheduler/build'
import Schedular from 'App/Models/Schedular'
import Subscription from 'App/Models/Subscription'
import OrderService from 'App/Services/OrdersServices'
import { DateTime } from 'luxon'
import { addDays } from 'date-fns'

export default class CreateOrder extends BaseTask {
  public static get schedule() {
    return '00 00 21 * * *' // run 9 in the night every day
  }
  /**
   * Set enable use .lock file for block run retry task
   * Lock file save to `build/tmpTaskLock`
   */
  public static get useLock() {
    return false
  }

  public async handle() {
    const tomorrowDate = addDays(new Date(), 1)

    const ActiveSubscriptions = await Subscription.query()
      .where('status', 'active')
      .preload('products', (product) => {
        product.preload('subProducts')
      })
      .preload('dates')
      .preload('days')

    for await (let sub of ActiveSubscriptions) {
      if (sub.recurrence === 'everyday') {
        const amount = sub.products.reduce(
          (prev, curr) => prev + curr.price * curr.subProducts[0].quantity,
          0
        )

        const newOrders = await OrderService.createOrder({
          date: tomorrowDate.toISOString(),
          amount: amount,
          quantity: [2, 20],
          products: sub.products,
        })

        await Schedular.create({
          createdAt: DateTime.fromISO(new Date().toISOString()),
          updatedAt: DateTime.fromISO(new Date().toISOString()),
          subscriptionId: sub.id,
          orderId: newOrders.id,
        })
      } else if (sub.recurrence === 'everyweek' && OrderService.dayMatch(sub.days, tomorrowDate)) {
        const amount = sub.products.reduce(
          (prev, curr) => prev + curr.price * curr.subProducts[0].quantity,
          0
        )
        const newOrders = await OrderService.createOrder({
          date: tomorrowDate.toISOString(),
          amount: amount,
          quantity: [2, 20],
          products: sub.products,
        })

        await Schedular.create({
          createdAt: DateTime.fromISO(new Date().toISOString()),
          updatedAt: DateTime.fromISO(new Date().toISOString()),
          subscriptionId: sub.id,
          orderId: newOrders.id,
        })
      } else if (sub.recurrence === 'custom' && OrderService.dateMatch(sub.dates, tomorrowDate)) {
        const amount = sub.products.reduce(
          (prev, curr) => prev + curr.price * curr.subProducts[0].quantity,
          0
        )
        const newOrders = await OrderService.createOrder({
          date: addDays(new Date(), 1).toISOString(),
          amount: amount,
          quantity: [2, 20],
          products: sub.products,
        })

        await Schedular.create({
          createdAt: DateTime.fromISO(new Date().toISOString()),
          updatedAt: DateTime.fromISO(new Date().toISOString()),
          subscriptionId: sub.id,
          orderId: newOrders.id,
        })
      }
    }
  }
}
