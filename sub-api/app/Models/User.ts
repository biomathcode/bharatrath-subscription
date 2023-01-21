import { DateTime } from 'luxon'
import {
  afterCreate,
  BaseModel,
  beforeCreate,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Subscription from './Subscription'
import Transaction from './Transaction'
import Order from './Order'
import Wallet from './Wallet'

//https://www.youtube.com/watch?v=NUfpIDMqx2k

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({
    prepare: (value: string) => uuid(),
  })
  public customerid: string

  @column()
  public name: string

  @column()
  public address: string

  @column()
  public image: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Subscription, {
    foreignKey: 'userId',
  })
  public subscription: HasMany<typeof Subscription>

  @hasOne(() => Wallet, {
    foreignKey: 'userId',
  })
  public wallet: HasOne<typeof Wallet>

  @hasMany(() => Transaction, {
    foreignKey: 'userId',
  })
  public transaction: HasMany<typeof Transaction>

  @hasMany(() => Order, {
    foreignKey: 'userId',
  })
  public order: HasMany<typeof Order>

  @afterCreate()
  public static async createWallet(user: User) {
    await user.related('wallet').create({
      amount: 1000,
    })
  }
}
