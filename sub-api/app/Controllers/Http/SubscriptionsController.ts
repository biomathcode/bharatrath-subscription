import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subscription from 'App/Models/Subscription'
import User from 'App/Models/User'

export default class SubscriptionsController {
  public async index({ request }: HttpContextContract) {
    const params = request.params()
    const subscription = await Subscription.findBy('user_id', params.user_id)

    const products = await subscription?.related('products').query()
    return { ...subscription, products }
  }
  public async store({ request }: HttpContextContract) {
    const body = request.body()

    const params = request.params()

    console.log(request.params())
    const subscription = await Subscription.create({
      userId: params.user_id,
      startDate: body.startDate,
      status: body.status,
      totalAmount: body.amount,
    })

    const products = await subscription.related('products').attach(body.products)

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
