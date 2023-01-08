import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Subscription from './Subscription'

export default class Day extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public value: number

  @column()
  public label: string

  @column()
  public subscriptionId: string

  @belongsTo(() => Subscription, {
    localKey: 'subscription_id',
  })
  public subscription: BelongsTo<typeof Subscription>
}
