import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import { RecurrenceStatus, SubscriptionStatus } from 'Contracts/enums'
import User from './User'
import Date from './Date'
import Day from './Day'

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

  @column()
  public startDate: string

  @column()
  public totalAmount: number

  @column()
  public status: SubscriptionStatus

  @hasMany(() => Date, {
    foreignKey: 'subscription_id',
  })
  public dates: HasMany<typeof Date>

  @hasMany(() => Day, {
    foreignKey: 'subscription_id',
  })
  public days: HasMany<typeof Day>

  @column()
  public endDate: string // array of strings

  @column()
  public recurrence: RecurrenceStatus

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
