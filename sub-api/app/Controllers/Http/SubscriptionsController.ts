import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Date from 'App/Models/Date'
import Day from 'App/Models/Day'
import Subscription from 'App/Models/Subscription'
import SubscriptionServices from 'App/Services/SubscriptionsServices'
import { DateTime } from 'luxon'

export default class SubscriptionsController {
  public async index({ request }: HttpContextContract) {
    const params = request.params()

    const subscriptions = await SubscriptionServices.getSubscriptionsByUser(params.user_id)
    console.log(subscriptions)

    const getAllquantity = await Database.query().from('product_subscriptions').select('*')

    return { subscriptions, quantity: getAllquantity }
  }
  public async store({ request }: HttpContextContract) {
    const body = request.body()

    const params = request.params()

    console.log(body.dates)
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

    let productsObject = {}

    body.products.forEach((key, i) => (productsObject[key] = { quantity: body.quantity[i] }))

    console.log(body.products)

    const products = await subscription.related('products').attach(productsObject)

    return { subscription, products }
  }
  public async show({ params }: HttpContextContract) {
    const subscription = await Subscription.query()
      .where('id', params.id)
      .preload('products', (item) => {
        item.preload('ProductSubscription', (quant) => {
          quant.where('subscription_id', params.id)
        })
      })
      .preload('dates')
      .preload('days')
      .first()

    return subscription
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()

    const subscription = await Subscription.find(params.id)

    if (!subscription) throw Error('Subscription not found')

    if (body.status) {
      return await Subscription.updateOrCreate(
        { id: params.id },
        {
          status: body.status,
        }
      )
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

      await subscription.related('days').createMany(newDays)

      const newSub = await Subscription.query()
        .where('id', params.id)
        .preload('dates')
        .preload('days')
        .preload('products')

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
