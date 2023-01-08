import { BaseTask } from 'adonis5-scheduler/build'
import Order from 'App/Models/Order'
import Subscription from 'App/Models/Subscription'
import User from 'App/Models/User'

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
  
    //
    // const userAddress = await User.find(1)
    // if (!userAddress) throw new Error('USER NOT FOUND')
    ActiveSubscriptions.forEach((sub) => {})
    const createdOrders = await Order.create({
      address: userAddress?.address,
    })
    // const productObject = {
    //   1: {
    //     quantity: 1,
    //   },
    //   2: {
    //     quantity: 3,
    //   },
    // }
    // await createdOrders.related('products').attach(productObject)
  }
}
