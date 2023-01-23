import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import { RecurrenceStatus, SubscriptionStatus } from 'Contracts/enums'
import User from './User'
import Date from './Date'
import Day from './Day'
import Schedular from './Schedular'
import Timeslot from './Timeslot'
import AddOnProductSubscription from './AddOnProductSubscription'
import ProductSubscription from './ProductSubscription'

// end date
// subscription type

export default class Subscription extends BaseModel {
  @hasMany(() => Date)
  public dates: HasMany<typeof Date>

  @hasMany(() => Day)
  public days: HasMany<typeof Day>

  @hasMany(() => Schedular)
  public schedular: HasMany<typeof Schedular>

  @hasOne(() => Timeslot)
  public timeSlot: HasOne<typeof Timeslot>

  @hasMany(() => Product)
  public products: HasMany<typeof Product>

  @hasMany(() => ProductSubscription)
  public subProducts: HasMany<typeof ProductSubscription>

  @hasMany(() => AddOnProductSubscription)
  public addOn: HasMany<typeof AddOnProductSubscription>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column({ isPrimary: true })
  public id: number

  @column()
  public userId?: number

  @column()
  public startDate: string

  @column()
  public totalAmount: number

  @column()
  public status: SubscriptionStatus

  @column()
  public endDate: string // array of strings

  @column()
  public recurrence: RecurrenceStatus

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
