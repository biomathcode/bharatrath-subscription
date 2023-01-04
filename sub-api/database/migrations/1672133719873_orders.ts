import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { OrderStatus } from 'Contracts/enums'

export default class extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.enum('status', Object.values(OrderStatus)).defaultTo(OrderStatus.ARRIVING)
      table.decimal('delivery_charge').defaultTo(20)
      table.dateTime('delivery_date')
      table.string('quantity').nullable()
      table.string('user_id')
      table.decimal('amount')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
