import { DateTime } from 'luxon'
import {
  BaseModel,
  belongsTo,
  column,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Subscription from './Subscription'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public name: string

  @column()
  public description: string

  @column()
  public price: number

  @column()
  public image: string

  @column()
  public stock: number

  @manyToMany(() => Subscription, {
    pivotTable: 'product_subscriptions',
  })
  public subscriptions: ManyToMany<typeof Subscription>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
