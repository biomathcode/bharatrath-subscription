import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Order from './Order'

export default class OrderProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public quantity: number

  @column()
  public productId: number

  @column()
  public orderId: number

  @hasOne(() => Product, {
    localKey: 'product_id',
  })
  public product: HasOne<typeof Product>

  @hasOne(() => Order, {
    localKey: 'order_id',
  })
  public Order: HasOne<typeof Order>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
