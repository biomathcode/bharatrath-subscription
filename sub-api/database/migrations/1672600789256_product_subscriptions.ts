import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'product_subscriptions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('product_id').unsigned().references('id').inTable('products')
      table.integer('subscription_id').unsigned().references('id').inTable('subscriptions')
      table.integer('quantity').unsigned().defaultTo(1)
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
