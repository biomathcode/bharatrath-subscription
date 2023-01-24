import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {
  public async index({}: HttpContextContract) {
    return await Product.all()
  }
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    console.log(body)
    return Product.create({
      name: body.name,
      description: body.description,
      price: body.price,
      stock: body.stock,
      image: body.image,
    })
  }
  public async show({ params }: HttpContextContract) {
    return Product.find(params.id)
  }
  public async update({ params }: HttpContextContract) {
    return Product.updateOrCreate(
      { id: params.id },
      {
        //createdAt: DateTime.local(),
        //amount: body.amount,
      }
    )
  }
  public async destroy({ params }: HttpContextContract) {
    const product = await Product.findOrFail(params.id)
    return product.delete()
  }
}
