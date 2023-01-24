import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Subscription from './Subscription'

export default class AddOnProductSubscription extends BaseModel {
  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

  @belongsTo(() => Subscription)
  public subscription: BelongsTo<typeof Subscription>

  @column({ isPrimary: true })
  public id: number

  @column()
  public productId: number

  @column()
  public subscriptionId: number

  @column()
  public quantity: number

  @column()
  public specificDate: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
