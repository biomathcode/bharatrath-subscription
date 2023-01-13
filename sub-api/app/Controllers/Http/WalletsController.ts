import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Wallet from 'App/Models/Wallet'

export default class WalletsController {
  public async index({ request }: HttpContextContract) {
    const params = request.params()
    const wallet = await Wallet.findBy('userId', params.user_id)

    return wallet
  }
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const params = request.params()

    const newWallet = Wallet.create({
      userId: params.user_id,
      amount: body.amount,
    })

    return newWallet
  }
  public async show({ params }: HttpContextContract) {
    const wallet = await Wallet.find(params.id)

    return wallet
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()

    const amount = body.amount

    return Wallet.updateOrCreate(
      { id: params.id },
      {
        amount,
      }
    )
  }
  public async destroy({ params }: HttpContextContract) {
    const sub = await Wallet.findOrFail(params.id)
    return sub.delete()
  }
}
