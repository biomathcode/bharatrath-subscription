import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Subscription from './Subscription'

export default class AddOnProductSubscription extends BaseModel {
  @hasOne(() => Product, {
    localKey: 'productId',
  })
  public Product: HasOne<typeof Product>

  @hasOne(() => Subscription, {
    localKey: 'subscriptionId',
  })
  public subscription: HasOne<typeof Subscription>

  @column({ isPrimary: true })
  public id: number

  @column()
  public productId: number

  @column()
  public subscriptionId: number

  @column()
  public quantity: string

  @column.dateTime()
  public specificDate: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
