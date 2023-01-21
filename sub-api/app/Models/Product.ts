import { DateTime } from 'luxon'
import {
  BaseModel,
  belongsTo,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Subscription from './Subscription'
import Order from './Order'
import ProductSubscription from './ProductSubscription'
import AddOnProductSubscription from './AddOnProductSubscription'

export default class Product extends BaseModel {
  @manyToMany(() => Order, {
    pivotTable: 'order_products',
  })
  public orders: ManyToMany<typeof Order>

  @hasMany(() => ProductSubscription, {
    foreignKey: 'productId',
  })
  public ProductSubscription: HasMany<typeof ProductSubscription>

  @hasMany(() => AddOnProductSubscription)
  public addOn: HasMany<typeof AddOnProductSubscription>

  @manyToMany(() => Subscription, {
    pivotTable: 'product_subscriptions',
  })
  public subscriptions: ManyToMany<typeof Subscription>

  @column({ isPrimary: true })
  public id: number
  @column()
  public name: string

  @column()
  public description: string

  @column()
  public price: number

  @column()
  public image: string

  @column()
  public stock: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
