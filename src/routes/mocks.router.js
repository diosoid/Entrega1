// src/routes/mocks.router.js
import { Router } from 'express'
import { generateMockUsers } from '../mocks/mockingUsers.js'
import { generateMockPet } from '../mocks/mockingPets.js'
import { UserModel } from '../models/User.js'
import { PetModel } from '../models/Pet.js'

const router = Router()

// GET /mockingusers → genera 50 usuarios falsos y los devuelve
router.get('/mockingusers', (req, res) => {
  try {
    const users = generateMockUsers(50)
    res.json({ status: 'success', users })
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message })
  }
})

// Mockingpets → solo de prueba
router.get('/mockingpets', (req, res) => {
  res.json({ message: 'Endpoint /mockingpets funcionando correctamente' })
})

// src/routes/mocks.router.js
router.post('/generateData', async (req, res) => {
  try {
    let { users = 10, pets = 10 } = req.body

    // Validación de tipos y valores
    users = parseInt(users)
    pets = parseInt(pets)

    if (isNaN(users) || users < 0 || isNaN(pets) || pets < 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Los valores de "users" y "pets" deben ser números enteros positivos.'
      })
    }

    const mockUsers = generateMockUsers(users)
    const createdUsers = await UserModel.insertMany(mockUsers)

    const mockPets = []
    for (let i = 0; i < pets; i++) {
      const owner = createdUsers[Math.floor(Math.random() * createdUsers.length)]._id
      mockPets.push(generateMockPet(owner))
    }

    const createdPets = await PetModel.insertMany(mockPets)

    // Asociar mascotas a usuarios
    for (const pet of createdPets) {
      await UserModel.findByIdAndUpdate(pet.owner, { $push: { pets: pet._id } })
    }

    res.status(201).json({
      status: 'success',
      message: 'Datos generados correctamente',
      users: createdUsers.length,
      pets: createdPets.length
    })
  } catch (err) {
    res.status(500).json({ error: 'Error al generar datos', details: err.message })
  }
})


// POST /api/mocks/addpet/:uid → agrega una mascota a un usuario existente
router.post('/addpet/:uid', async (req, res) => {
  try {
    const { uid } = req.params
    const { name, type, age } = req.body

    // Validar que todos los campos estén presentes
    if (!name || !type || !age) {
      return res.status(400).json({
        status: 'error',
        message: 'Faltan datos: name, type y age son obligatorios'
      })
    }

    // Buscar el usuario
    const user = await UserModel.findById(uid)
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Usuario no encontrado'
      })
    }

    // Crear la nueva mascota con el owner asignado
    const newPet = await PetModel.create({
      name,
      type,
      age,
      owner: user._id
    })

    // Agregar la referencia de la mascota al usuario y guardar
    user.pets.push(newPet._id)
    await user.save()

    res.json({
      status: 'success',
      message: 'Mascota agregada al usuario correctamente',
      pet: newPet
    })
  } catch (err) {
    console.error('Error al agregar mascota:', err)
    res.status(500).json({
      status: 'error',
      message: 'Error interno al agregar mascota',
      details: err.message
    })
  }
})



export default router
