import { BaseTask } from 'adonis5-scheduler/build'
import ProductSubscription from 'App/Models/ProductSubscription'
import Schedular from 'App/Models/Schedular'
import Subscription from 'App/Models/Subscription'
import OrderService from 'App/Services/OrdersServices'
import { DateTime } from 'luxon'
import { addDays, format, getDay } from 'date-fns'

//TODO: Pause the subscription 😅  ✅
// * start date, end date & custom date

//TODO: Fixed number of days, Fixed amount is required to start subscription ✅
//TODO: deduct wallet amount when order is created ✅

//TODO: Refund, Recharge, ✅

//TODO: Notify the user 5 days before charge end, 1 day and on cancelling subscription

// Cancel request, refund the user

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
        const tomorrowDate = addDays(new Date(), 1)

        const newProductObject = await Promise.all(
          sub.products.map(async (product) => {
            const quantitys = await ProductSubscription.query()
              .where('subscription_id', sub.id)
              .where('product_id', product.id)

            const id = product.toJSON().id

            const jsonProduct = product.toJSON()

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
          date: tomorrowDate.toISOString(),
          amount: amount,
          quantity: [2, 20],
          products: newObject,
        })

        await Schedular.create({
          createdAt: DateTime.fromISO(new Date().toISOString()),
          updatedAt: DateTime.fromISO(new Date().toISOString()),
          subscriptionId: sub.id,
          orderId: newOrders.id,
        })
      } else if (sub.recurrence === 'everyweek') {
        /**
         * Check if today's day include in days
         * and then make orders
         */
        // test const days = [0, 1, 3, 4, 5, 6]

        const days = sub.days.map((el) => el.value)

        if (format(new Date(sub.endDate), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')) {
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
            createdAt: DateTime.fromISO(new Date().toISOString()),
            updatedAt: DateTime.fromISO(new Date().toISOString()),
            subscriptionId: sub.id,
            orderId: newOrders.id,
          })
        }
      } else if (sub.recurrence === 'custom') {
        /**
         * Check if today's date included in dates
         * and then make orders
         */

        // test
        // const dates = ['2023-01-10']

        const dates = sub.dates.map((el) => format(new Date(el.date.toString()), 'yyyy-MM-dd'))

        console.log('this are date', dates)

        const tomorrowDate = format(addDays(new Date(), 1), 'yyyy-MM-dd')

        if (dates.includes(tomorrowDate)) {
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
            date: addDays(new Date(), 1).toISOString(),
            amount: amount,

            quantity: [2, 20],
            products: newObject,
          })

          await Schedular.create({
            createdAt: DateTime.fromISO(new Date().toISOString()),
            updatedAt: DateTime.fromISO(new Date().toISOString()),
            subscriptionId: sub.id,
            orderId: newOrders.id,
          })
        }
      }
    })
  }
}
