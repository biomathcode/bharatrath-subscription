import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { RecurrenceStatus, SubscriptionStatus } from 'Contracts/enums'

export default class extends BaseSchema {
  protected tableName = 'subscriptions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.dateTime('start_date').nullable()
      table.integer('total_amount').unsigned().nullable().defaultTo(500)
      table.enum('recurrence', Object.values(RecurrenceStatus)).defaultTo(RecurrenceStatus.EVERYDAY)

      table.string('days').nullable().defaultTo('')

      table.enum('status', Object.values(SubscriptionStatus)).defaultTo(SubscriptionStatus.ACTIVE)
      // table.
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
