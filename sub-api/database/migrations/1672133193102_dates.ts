import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'dates'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.dateTime('date')
      table.integer('subscription_id').references('id').inTable('subscriptions')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
