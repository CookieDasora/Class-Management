const Professor = require('../Models/Professor')
const validator = require('validator')

/**
 * A Class for handling professor-related routes
*/
class ProfessorHandler {
  /**
   * Register a professor into system
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} email
   * @param {string} password
   * @return {(object | Error)} Professor information
   *
*/
  async register ({ firstName, lastName, email, password }) {
    if (firstName.length === 0 ||
            lastName.length === 0 ||
            email.length === 0 ||
            password.length === 0) {
      return new Error('Missing fields')
    }

    if (password.length < 8) {
      return new Error('Password is too short!')
    };

    if (validator.isEmail(email) === false) {
      return new Error('Invalid Email')
    };

    const emailAlreadyExists = await Professor.findOne({ email })

    if (emailAlreadyExists) {
      return new Error('This email is already in use')
    };

    const professor = new Professor({ firstName, lastName, email, password })

    await professor.save()
    await professor.generateToken()
    return {
      firstName: professor.firstName,
      lastName: professor.lastName,
      _id: professor._id,
      tokens: professor.tokens
    }
  }
};

module.exports = ProfessorHandler
