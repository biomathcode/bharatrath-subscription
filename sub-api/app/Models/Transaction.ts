import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { TransactionStatus, TransactionType } from 'Contracts/enums'
import Subscription from './Subscription'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public status: TransactionStatus

  @column()
  public amount: number

  @column()
  public type: TransactionType

  @belongsTo(() => User, {
    localKey: 'userId',
  })
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
