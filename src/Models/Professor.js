const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const professorSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tokens: [{ token: { type: String, required: true } }
  ]
})

professorSchema.pre('save', async function (next) {
  const professor = this
  if (professor.isModified('password')) {
    professor.password = await bcrypt.hash(professor.password, 15)
  };
  next()
})

professorSchema.methods.generateToken = async function () {
  const professor = this
  const token = jwt.sign({
    _id: professor._id.toString()
  }, process.env.JWT_KEY, { expiresIn: '72h' })
  professor.tokens = professor.tokens.concat({ token })
  await professor.save()
  return token
}

professorSchema.statics.findByToken = async function (token) {
  const Professor = this
  let decoded
  try {
    if (!token) {
      return new Error('Missing token header')
    }
    decoded = jwt.verify(token, process.env.JWT_KEY)
  } catch (e) {
    return e
  }
  return await Professor.findOne({
    _id: decoded._id,
    'tokens.token': token
  })
}

professorSchema.statics.findByCredentials = async function (email, password) {
  const professor = await Professor.findOne({ email })
  if (!professor) {
    throw new Error('Unable to login. User doesn\'t exists')
  };
  const isMatch = await bcrypt.compare(password, professor.password)
  if (!isMatch) {
    throw new Error('Unable to login. Invalid Credentials')
  }
  return professor
}

const Professor = mongoose.model('professor', professorSchema)

module.exports = Professor
