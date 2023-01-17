import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Subscription from './Subscription'

export default class Timeslot extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public startTime: string

  @column()
  public endTime: string

  @column()
  public subscriptionId: number

  @belongsTo(() => Subscription, {
    localKey: 'subscriptionId',
  })
  public subscription: BelongsTo<typeof Subscription>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
