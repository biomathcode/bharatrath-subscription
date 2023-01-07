import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Date extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public date: DateTime
}
