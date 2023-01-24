import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AddOnProductSubscription from 'App/Models/AddOnProductSubscription'
import Date from 'App/Models/Date'
import Day from 'App/Models/Day'
import ProductSubscription from 'App/Models/ProductSubscription'
import Subscription from 'App/Models/Subscription'
import SubscriptionServices from 'App/Services/SubscriptionsServices'
import { DateTime } from 'luxon'

export default class SubscriptionsController {
  public async index({ request }: HttpContextContract) {
    const params = request.params()
    return SubscriptionServices.getSubsByUser(params.user_id)
  }

  public async store({ request }: HttpContextContract) {
    const body = request.body()

    const params = request.params()

    const sortedDates = body.dates.sort(function compare(a: any, b: any) {
      return a < b ? -1 : a > b ? 1 : 0
    })

    console.log(sortedDates)

    console.log('end dates', sortedDates[0], sortedDates[sortedDates.length - 1])

    const startDate = body.type === 'custom' ? sortedDates[0] : body.startDate

    const endDate = body.type === 'custom' ? sortedDates[sortedDates.length - 1] : body.endDate

    const subscription = await Subscription.create({
      userId: params.user_id,
      startDate: startDate,
      endDate: endDate,
      status: body.status,
      totalAmount: body.amount,
      recurrence: body.type,
    })

    const newDays = body.days.map((el) => ({
      value: el.value,
      label: el.label,
      subscriptionId: subscription.id,
    }))

    const newDates = body.dates.map((el) => {
      console.log(el)
      return {
        date: DateTime.fromISO(el),
        subscriptionId: subscription.id,
      }
    })

    if (body.type === 'everyday' || body.type === 'everyweek') {
      await subscription.related('days').createMany(newDays)
    }
    if ((body.type = 'custom')) {
      await subscription.related('dates').createMany(newDates)
    }

    console.log('this are timeslot', body.timeSlot)

    if (body.timeSlot) {
      await subscription.related('timeSlot').create(body.timeSlot)
    }

    const products = await subscription.related('subProducts').createMany(body.products)

    return { subscription, products }
  }
  public async show({ params }: HttpContextContract) {
    const id = params.id

    return SubscriptionServices.getSubsById(id)
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()

    const subscription = await Subscription.find(params.id)

    console.log('body', body)

    if (!subscription) throw Error('Subscription not found')

    if (body.customProducts) {
      console.log(body.customProducts)
      await subscription.related('addOn').createMany(body.customProducts)
    }

    if (body.status) {
      await Subscription.updateOrCreate(
        { id: params.id },
        {
          status: body.status,
        }
      )
    }

    if (body.products) {
      await ProductSubscription.query().where('subscription_id', subscription.id).delete()

      const newProducts = body.products.map((el) => ({
        productId: el.id,
        subscriptionId: subscription.id,
        quantity: el.quantity,
      }))

      await subscription.related('subProducts').createMany(newProducts)
    }

    if (body.type === 'everyday') {
      return await Subscription.updateOrCreate(
        {
          id: params.id,
        },
        {
          endDate: body.endDate,
        }
      )
    } else if (body.type === 'everyweek') {
      /**
       * Delete every old days related to subscription
       * Create new days
       */
      await Day.query().where('subscription_id', subscription.id).delete()
      const newDays = body.days.map((el) => ({
        value: el.value,
        label: el.label,
        subscriptionId: subscription.id,
      }))

      console.log(newDays)

      const subs = await subscription.related('days').createMany(newDays)

      console.log(subs)
      const newSub = await Subscription.query()
        .where('id', params.id)
        .preload('dates')
        .preload('days')

      return newSub
    } else if (body.type === 'custom') {
      /**
       * Delete every old dates related to subscription
       * Create new dates
       */
      await Date.query().where('subscription_id', subscription.id).delete()

      const newDates = body.dates.map((el) => {
        console.log(el)
        return {
          date: DateTime.fromISO(el),
          subscriptionId: subscription.id,
        }
      })

      await subscription.related('dates').createMany(newDates)

      const newSub = await Subscription.query()
        .where('id', params.id)
        .preload('dates')
        .preload('days')
        .preload('products')

      return newSub
    }
  }
  public async destroy({ params }: HttpContextContract) {
    const sub = await Subscription.findOrFail(params.id)
    return sub.delete()
  }
}
