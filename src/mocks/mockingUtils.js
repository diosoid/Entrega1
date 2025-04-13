import bcrypt from 'bcrypt'
import { faker } from '@faker-js/faker'

export const generateMockUsers = (num) => {
  const users = []
  const hashedPassword = bcrypt.hashSync('coder123', 10)

  for (let i = 0; i < num; i++) {
    users.push({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 65 }),
      password: hashedPassword,
      role: Math.random() > 0.5 ? 'user' : 'admin',
      pets: [],
    })
  }

  return users
}
