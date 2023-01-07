import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import { OrderStatus } from 'Contracts/enums'
import Product from './Product'

//TODO: Wallet
//

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public status: OrderStatus

  @column.dateTime()
  public deliveryDate: DateTime

  @column()
  public userId: string

  @column()
  public quantity: string

  @column()
  public amount: number

  @manyToMany(() => Product, {
    pivotTable: 'order_products',
  })
  public products: ManyToMany<typeof Product>

  @column()
  public address: string

  @column()
  public deliveryCharge: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
