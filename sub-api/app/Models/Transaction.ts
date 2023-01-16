import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { TransactionStatus, TransactionType } from 'Contracts/enums'
import Wallet from './Wallet'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public walletId: number

  @column()
  public amount: number

  @column()
  public type: TransactionType

  @belongsTo(() => Wallet, {
    localKey: 'walletId',
  })
  public wallet: BelongsTo<typeof Wallet>

  @belongsTo(() => User, {
    localKey: 'userId',
  })
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
