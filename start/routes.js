'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.get('/', () => {
//   return { greeting: 'Hello world in JSON' }
// })

//ROTAS DE USUARIOS

Route.post('/user/register', 'AuthController.register')
Route.post('/user/login', 'AuthController.login')
Route.get('/user/logout','AuthController.logout')
Route.get('/user/me', 'AuthController.me')
Route.get('/user/livros', 'AuthController.getLivros')
// ROTAS DE LIVROS
Route.resource('book','LivroController').apiOnly().middleware('auth')
