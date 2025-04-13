
import { faker } from '@faker-js/faker'

// Generador de una mascota vinculada a un usuario
export const generateMockPet = (ownerId) => ({
  name: faker.animal.dog(),
  type: faker.helpers.arrayElement(['dog', 'cat', 'hamster']),
  age: faker.number.int({ min: 1, max: 15 }),
  owner: ownerId
})
