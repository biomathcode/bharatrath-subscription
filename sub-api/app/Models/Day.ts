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
  public subscriptionId?: number

  @belongsTo(() => Subscription, {
    localKey: 'subscriptionId',
  })
  public subscription: BelongsTo<typeof Subscription>
}
