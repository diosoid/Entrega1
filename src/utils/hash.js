// src/utils/hash.js
import bcrypt from 'bcrypt'

export const createHash = (password) => {
  return bcrypt.hashSync(password, 10)
}

export const isValidPassword = (userPassword, hashedPassword) => {
  return bcrypt.compareSync(userPassword, hashedPassword)
}
