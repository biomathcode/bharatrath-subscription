import Database from '@ioc:Adonis/Lucid/Database'
import { BaseTask } from 'adonis5-scheduler/build'
import Subscription from 'App/Models/Subscription'
import OrderService from 'App/Services/OrdersServices'

// every week of the month
// every second week of the month

//TODO schedule_table => many subscription, many orders
//

// +3 days
// check for last order
// lastCreatedOrderDate
// nextOrderCreated
// errorFlag => order creation fails
// orderScheduleDate
// updateSubscription

export default class CreateOrder extends BaseTask {
  public static get schedule() {
    return '* * * * * *' // get it to midnight
  }
  /**
   * Set enable use .lock file for block run retry task
   * Lock file save to `build/tmpTaskLock`
   */
  public static get useLock() {
    return false
  }

  public async handle() {
    console.log('this is running')
    // get all subscriptions
    // create orders
    const ActiveSubscriptions = await Subscription.query()
      .where('status', 'active')
      .preload('products')
      .preload('dates')
      .preload('days')

    const quantity = await Database.query().from('product_subscriptions').select('*')

    console.log(quantity)
    ActiveSubscriptions.map(async (sub) => {
      const createOrders = await OrderService.createOrder({
        date: '2023-01-04T05:10:20.739Z',
        amount: 500,
        quantity: [2, 20],
        products: sub.products,
      })

      console.log(createOrders)
    })
  }
}
