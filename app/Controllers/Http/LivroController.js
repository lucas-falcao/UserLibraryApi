'use strict'

const Livro = use('App/Models/Livro')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with livros
 */
class LivroController {
  /**
   * Show a list of all livros.
   * GET livros
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
      const livros = await Livro.all()

      return livros
  }


  /**
   * Create/save a new livro.
   * POST livros
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const { id } = auth.user
    const data = request.only([
      'title',
      'author'
    ])
    const livro = await Livro.create({...data, user_id:id})
    return livro
  }

  /**
   * Display a single livro.
   * GET livros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response, auth }) {
    const livro = await Livro.findOrFail(params.id)
    if(livro.user_id !== auth.user.id){
        response.status(401).send({error:"Not authorized"})
    }
    return livro
  }


  /**
   * Update livro details.
   * PUT or PATCH livros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
      const livro = await Livro.findOrFail(params.id)
      if(livro.user_id !== auth.user.id){
        response.status(401).send({error :" Not Authorized "})
      }
      const data = request.only([
        'title',
        'author'
      ])
      livro.merge(data)
      await livro.save()
      return livro
  }

  /**
   * Delete a livro with id.
   * DELETE livros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response, auth }) {
    const livro = await Livro.findOrFail(params.id)
    if(livro.user_id !== auth.user.id){
      response.status(401).send({error :"Not Authorized"})
    }
    await livro.delete()
  }
}

module.exports = LivroController
