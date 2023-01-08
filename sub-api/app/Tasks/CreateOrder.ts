import Database from '@ioc:Adonis/Lucid/Database'
import { BaseTask } from 'adonis5-scheduler/build'
import ProductSubscription from 'App/Models/ProductSubscription'
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

    const ActiveSubscriptions = await Subscription.query()
      .where('status', 'active')
      .preload('products')
      .preload('dates')
      .preload('days')

    ActiveSubscriptions.forEach(async (sub) => {
      let newObject = {}

      const newProductObject = await Promise.all(
        sub.products.map(async (product) => {
          const quantitys = await ProductSubscription.query()
            .where('subscription_id', sub.id)
            .where('product_id', product.id)

          const id = product.toJSON().id

          const jsonProduct = product.toJSON()

          console.log('product', product.toJSON())

          console.log('this is quantity', quantitys[0].quantity)
          newObject[id] = {
            quantity: quantitys[0].quantity,
          }

          return {
            ...jsonProduct,
            quantity: quantitys[0].quantity,
          }
        })
      )

      const amount = newProductObject.reduce((prev, curr) => prev + curr.quantity * curr.price, 0)

      const newOrders = await OrderService.createOrder({
        date: '2023-01-04T05:10:20.739Z',
        amount: amount,
        quantity: [2, 20],
        products: newObject,
      })

      console.log(newOrders.toJSON())
    })
  }
}
