'use strict'
const User = use('App/Models/User')
class AuthController {

  async register({ request }) {
    const data = request.only(['username', 'email', 'password'])

    const user = await User.create(data)
    return user
  }
  async login({ request, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)
    return token
  }
  async logout({ auth, response }) {
    // const user = await auth.getUser()
    // const refreshToken = await user.tokens().fetch() // get it from user

    // await auth
    //   .authenticator('jwt')
    //   .revokeTokens([refreshToken], true)
    const apiToken = auth.getAuthHeader()

    await auth
      .authenticator('api')
      .revokeTokens([apiToken])
  }
  async me({ request, response, auth }) {
    try {
      const user = await auth.getUser()
      return await user

    } catch (error) {
      response.send('You are not logged in')
    }
  }
  async getLivros({ auth }) {
    const user = await auth.getUser()
    const livros = await user.livros().fetch()
    return livros
  }

}

module.exports = AuthController
