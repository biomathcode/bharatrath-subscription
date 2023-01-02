import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class UsersController {
  public async index(ctx: HttpContextContract) {
    return await User.all()
  }
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    console.log(body)
    return User.create({
      amount: body.amount,
      customerid: body.customerid,
      address: body.address,
    })
  }
  public async show({ params }: HttpContextContract) {
    return User.find(params.id)
  }
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()

    if (body.image) {
      return User.updateOrCreate(
        { id: params.id },
        {
          image: body.image,
        }
      )
    }

    if (body.amount) {
      return User.updateOrCreate(
        { id: params.id },
        {
          amount: body.amount,
        }
      )
    }

    return User.findOrFail(params.id)
  }
  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    return user.delete()
  }
}
