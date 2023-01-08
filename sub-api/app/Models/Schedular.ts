import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Subscription from './Subscription'
import Order from './Order'

// one to many order
// one to many subscription
//

export default class Schedular extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public subscriptionId: number

  @column()
  public orderId: number

  @belongsTo(() => Subscription, {
    localKey: 'subscriptionId',
  })
  public subscriptions: BelongsTo<typeof Subscription>

  @belongsTo(() => Order, {
    localKey: 'orderId',
  })
  public orders: BelongsTo<typeof Order>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
