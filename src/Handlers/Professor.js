const Professor = require('../Models/Professor')
const validator = require('validator')

exports.registerProfessor = async ({ firstName, lastName, email, password }) => {
  if (firstName.length === 0 ||
            lastName.length === 0 ||
            email.length === 0 ||
            password.length === 0) {
    return new Error('Missing fields')
  }

  if (password.length < 8) {
    return new Error('Password is too short!')
  };

  if (password.length > 32) {
    return new Error('Password is too long')
  };

  if (validator.isEmail(email) === false) {
    return new Error('Invalid Email')
  };

  if (await Professor.findOne({ email })) {
    return new Error('This email is already in use')
  };

  const professor = new Professor({ firstName, lastName, email, password })
  try {
    await professor.save()
    await professor.generateToken()
    return {
      firstName: professor.firstName,
      lastName: professor.lastName,
      _id: professor._id,
      tokens: professor.tokens
    }
  } catch (e) {
    return new Error(e)
  }
}
