import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Day from 'App/Models/Day'
import Subscription from 'App/Models/Subscription'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class SubscriptionsController {
  public async index({ request }: HttpContextContract) {
    const params = request.params()

    const user = await User.find(params.user_id)

    const subscriptions = await user
      ?.related('subscription')
      .query()
      .preload('products')
      .preload('days')
      .preload('dates')

    const el = await Subscription.findBy('user_id', params.user_id)

    // if (!el) throw new Error('SUBSCRIPTION NOT FOUND')

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

    const newData = body.days.map((el) => ({
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
      await subscription.related('days').createMany(newData)
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
    const subscription = await Subscription.find(params.id)

    const products = await subscription?.related('products').query()
    return { subscription, products }
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()

    return Subscription.updateOrCreate(
      { id: params.id },
      {
        //createdAt: DateTime.local(),
        //amount: body.amount,
      }
    )
  }
  public async destroy({ params }: HttpContextContract) {
    const sub = await Subscription.findOrFail(params.id)
    return sub.delete()
  }
}
