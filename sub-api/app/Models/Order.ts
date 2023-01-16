import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import { OrderStatus } from 'Contracts/enums'
import Product from './Product'
import Schedular from './Schedular'

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
  public amount: number

  @manyToMany(() => Product, {
    pivotTable: 'order_products',
  })
  public products: ManyToMany<typeof Product>

  @hasMany(() => Schedular, {
    foreignKey: 'orderId',
  })
  public Schedular: HasMany<typeof Schedular>

  @column()
  public address: string

  @column()
  public deliveryCharge: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
