import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Subscription from './Subscription'

export default class Date extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public date: DateTime

  @column()
  public subscriptionId: number

  @belongsTo(() => Subscription, {
    localKey: 'subscriptionId',
  })
  public subscription: BelongsTo<typeof Subscription>
}
