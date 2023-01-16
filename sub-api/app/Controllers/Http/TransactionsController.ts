import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transaction from 'App/Models/Transaction'

export default class TransactionsController {
  public async index({ request }: HttpContextContract) {
    const params = request.params()
    const transaction = await Transaction.findBy('user_id', params.user_id)

    return transaction
  }
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const params = request.params()

    const newTransaction = Transaction.create({
      userId: params.user_id,
      amount: body.amount,
      type: body.type,
    })

    return newTransaction
  }
  public async show({ params }: HttpContextContract) {
    const transaction = await Transaction.find(params.id)

    return transaction
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()

    const status = body.status

    return Transaction.updateOrCreate(
      { id: params.id },
      {
        status: status,
        amount: body.amount,
      }
    )
  }
  public async destroy({ params }: HttpContextContract) {
    const sub = await Transaction.findOrFail(params.id)
    return sub.delete()
  }
}
