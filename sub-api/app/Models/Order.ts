import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { OrderStatus } from 'Contracts/enums'
import Product from './Product'
import User from './User'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public status: OrderStatus

  @column.dateTime()
  public delieveryDate: DateTime

  @column()
  public userId: string

  @column()
  public quantity: string

  @column()
  public totalAmount: number
  @hasMany(() => Product, {
    foreignKey: 'id',
  })
  public products: HasMany<typeof Product>

  @column()
  public deliveryCharge: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
