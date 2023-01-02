import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OrdersController {
  public async index(ctx: HttpContextContract) {
    return 'GET IT'
  }
  public async store({ request }: HttpContextContract) {
    return 'Post IT' + JSON.stringify(request)
  }
  public async show(ctx: HttpContextContract) {
    return 'SHOW IT'
  }
}
