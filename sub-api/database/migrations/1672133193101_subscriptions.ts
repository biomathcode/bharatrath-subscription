import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'subscriptions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.dateTime('start_date').nullable()
      table.dateTime('end_date').nullable()

      table.integer('total_amount').unsigned().nullable().defaultTo(500)
      table.string('recurrence').defaultTo('everyday')

      table.string('status').defaultTo('active')
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
