import { BaseTask } from 'adonis5-scheduler/build'
import ProductSubscription from 'App/Models/ProductSubscription'
import Schedular from 'App/Models/Schedular'
import Subscription from 'App/Models/Subscription'
import OrderService from 'App/Services/OrdersServices'
import { DateTime } from 'luxon'
import { addDays, getDay } from 'date-fns'

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
    const ActiveSubscriptions = await Subscription.query()
      .where('status', 'active')
      .preload('products')
      .preload('dates')
      .preload('days')

    ActiveSubscriptions.forEach(async (sub) => {
      if (sub.recurrence === 'everyday') {
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

        await Schedular.create({
          createdAt: DateTime.fromISO('2023-01-10T05:10:20.739Z'),
          updatedAt: DateTime.fromISO('2023-01-10T05:10:20.739Z'),
          subscriptionId: sub.id,
          orderId: newOrders.id,
        })
      }

      if (sub.recurrence === 'everyweek') {
        /**
         * Check if today's day include in days
         * and then make orders
         */
        // test const days = [0, 1, 3, 4, 5, 6]

        const days = sub.days.map((el) => el.value)

        if (sub.endDate === new Date().toString()) {
          return
        }

        const tomorrowDate = addDays(new Date(), 1)

        if (days.includes(getDay(tomorrowDate))) {
          // create orders
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

          const amount = newProductObject.reduce(
            (prev, curr) => prev + curr.quantity * curr.price,
            0
          )

          const newOrders = await OrderService.createOrder({
            date: tomorrowDate.toISOString(),
            amount: amount,
            quantity: [2, 20],
            products: newObject,
          })

          await Schedular.create({
            createdAt: DateTime.fromISO('2023-01-10T05:10:20.739Z'),
            updatedAt: DateTime.fromISO('2023-01-10T05:10:20.739Z'),
            subscriptionId: sub.id,
            orderId: newOrders.id,
          })
        }
      }

      if (sub.recurrence === 'custom') {
        const dates = sub.dates
        const tomorrowDate = addDays(new Date(), 1)

        /**
         * Check if today's date included in dates
         * and then make orders
         */
      }
    })
  }
}
