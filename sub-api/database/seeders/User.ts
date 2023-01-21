import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.create({
      name: 'Pratik Sharma',
      customerid: 'skldmfas',
      address: 'E mahavir enclave 3 Dwarka ',
      image:
        'https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1621680626975%2FDf9DaCPLu.jpeg%3Fw%3D500%26h%3D500%26fit%3Dcrop%26crop%3Dfaces%26auto%3Dcompress%2Cformat%26format%3Dwebp&w=3840&q=75',
    })
    // Write your database queries inside the run method
  }
}
