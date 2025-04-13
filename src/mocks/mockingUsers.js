// src/mocks/mockingUsers.js
import { faker } from '@faker-js/faker'
import { createHash } from '../utils/hash.js'

const generateMockUser = () => ({
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email(),
  password: createHash('coder123'),
  role: faker.helpers.arrayElement(['user', 'admin']),
  pets: []
})

export const generateMockUsers = (num) => {
  const users = []
  for (let i = 0; i < num; i++) {
    users.push(generateMockUser())
  }
  return users
}
