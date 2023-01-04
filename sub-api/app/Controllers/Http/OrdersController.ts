import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'
import Product from 'App/Models/Product'
import { OrderStatus } from 'Contracts/enums'
import { DateTime, from } from 'luxon'

export default class OrdersController {
  public async index({ params }: HttpContextContract) {
    const order = await Order.query().preload('products')

    return order
  }
  public async store({ request }: HttpContextContract) {
    // create order
    const body = request.body()

    const createOrder = await Order.create({
      status: OrderStatus.ARRIVING,
      deliveryDate: DateTime.fromISO(body.date),
      userId: '1',
      amount: body.amount,
      deliveryCharge: 20,
      quantity: body.quantity,
      // address: body.address,
    })

    let productsObject = {}

    body.products.forEach((key, i) => (productsObject[key.id] = { quantity: key.quantity }))

    const addProduct = await createOrder.related('products').attach(productsObject)

    return { createOrder, addProduct }
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
