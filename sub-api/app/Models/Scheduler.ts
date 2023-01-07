import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Subscription from './Subscription'
import Product from './Product'

// one to many order
// one to many subscription
//

export default class Scheduler extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Subscription, {
    foreignKey: 'id',
  })
  public subscriptions: HasMany<typeof Subscription>

  @hasMany(() => Product, {
    foreignKey: 'id',
  })
  public products: HasMany<typeof Product>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
