import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'
import OrderService from 'App/Services/OrdersServices'

//TODO: refactor and create services
//TODO: Create Wallet
//TODO: Transaction to order relationship

export default class OrdersController {
  public async index({ params }: HttpContextContract) {
    const data = await OrderService.getOrders()
    return data
  }
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const data = OrderService.createOrder(body)
    return data
  }
  public async show({ params }: HttpContextContract) {
    return Order.find(params.id)
  }
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()

    return body
  }
  public async destroy({ params }: HttpContextContract) {
    const order = await Order.findOrFail(params.id)
    return order.delete()
  }
}
