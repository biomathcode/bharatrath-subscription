import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product'

export default class extends BaseSeeder {
  public async run() {
    await Product.createMany([
      {
        image: 'src/assets/milk.jpeg',
        name: 'Mother Dairy Milk',
        description: 'Mother Dairy Milk',
        price: 28,
        stock: 200,
      },
      {
        image: 'src/asserts/dahi.jpeg',
        name: 'Amul Dahi ',
        description: 'Amul Dahi ',
        price: 40,
        stock: 100,
      },
    ])
  }
}
