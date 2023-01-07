import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Day from 'App/Models/Day'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Day.createMany([
      {
        value: 0,
        label: 'Sunday',
        id: 0,
      },
      {
        value: 1,
        label: 'Monday',
        id: 1,
      },
      {
        value: 2,
        label: 'Tuesday',
        id: 2,
      },
      {
        value: 3,
        label: 'Wednesday',
        id: 3,
      },
      {
        value: 4,
        label: 'Thurday',
        id: 4,
      },
      {
        value: 5,
        label: 'Friday',
        id: 5,
      },
      {
        value: 6,
        label: 'Saturday',
        id: 6,
      },
    ])
  }
}
