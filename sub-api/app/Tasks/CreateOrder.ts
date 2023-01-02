import { BaseTask } from 'adonis5-scheduler/build'
import Order from 'App/Models/Order'
import Subscription from 'App/Models/Subscription'

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
    // get all subscriptions
    // create orders
    const ActiveSubscriptions = await Subscription.query().where('status', 'active')

    // create Orders

    const newOrders = ActiveSubscriptions.map((el) => {})

    const createdOrders = Order.createMany({})

    console.log('this is working')
  }
}
