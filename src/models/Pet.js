import mongoose from 'mongoose'

const petSchema = new mongoose.Schema({
  name: String,
  type: String,
  age: Number,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

export const PetModel = mongoose.model('Pet', petSchema)