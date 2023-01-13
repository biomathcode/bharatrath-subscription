import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Transaction from './Transaction'

export default class Wallet extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public amount: number

  @hasOne(() => User, {
    localKey: 'userId',
  })
  public user: HasOne<typeof User>

  @hasMany(() => Transaction, {
    foreignKey: 'walletId',
  })
  public transactions: HasMany<typeof Transaction>
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
