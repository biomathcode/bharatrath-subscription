// one to many products
// one to many subscriptions
import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Subscription from './Subscription'

export default class ProductSubscription extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public quantity: number

  @column()
  public productId: number

  @column()
  public subscriptionId: number

  @hasOne(() => Product, {
    localKey: 'product_id',
  })
  public Product: HasOne<typeof Product>

  @hasOne(() => Subscription, {
    localKey: 'subscription_id',
  })
  public Subscription: HasOne<typeof Subscription>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
