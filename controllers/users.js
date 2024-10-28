const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({})
    response.json(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/:id', async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id)

    if (!user) {
      response.status(404).end()
    }
    response.send(user)
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {
  const { email, firstName, lastName, password } = request.body
  try {
    const userObject = new User({ email, firstName, lastName, password })
    const savedUser = await userObject.save()
    response.status(201).send(savedUser)
  } catch (error) {
    next(error)
  }
})

usersRouter.put('/:id', async (request, response, next) => {
  const { email, firstName, lastName, password } = request.body

  try {
    const updatedUser = await User.findByIdAndUpdate(
      request.params.id,
      { email, firstName, lastName, password },
      { new: true }
    )

    response.status(201).send(updatedUser)
  } catch (error) {
    next(error)
  }
})


usersRouter.delete('/:id', async (request, response, next) => {
  try {
    await User.findByIdAndDelete(request.params.id)
    response.status(204).end() 
  } catch (error) {
    next(error)
  }
})


module.exports = usersRouter