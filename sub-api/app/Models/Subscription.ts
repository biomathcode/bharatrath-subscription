import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import { RecurrenceStatus, SubscriptionStatus } from 'Contracts/enums'
import User from './User'

// end date
// subscription type

export default class Subscription extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @manyToMany(() => Product, {
    pivotTable: 'product_subscriptions',
  })
  public products: ManyToMany<typeof Product>

  @belongsTo(() => User, {
    localKey: 'userId',
  })
  public user: BelongsTo<typeof User>

  @column()
  public userId?: number

  @column.dateTime()
  public startDate: DateTime

  @column()
  public totalAmount: number

  @column()
  public status: SubscriptionStatus

  @column()
  public endDate: string

  @column()
  public days: string

  @column()
  public recurrence: RecurrenceStatus

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
