'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/signup').render('auth.signup');
Route.post('/signup', 'UserController.create').validator('CreateUser');

Route.on('/login').render('auth.login');
Route.post('/login', 'UserController.login').validator('LoginUser');
Route.get('/logout', async({ auth, response }) => {
  await auth.logout();
  return response.redirect('/');
});

Route.get('/', 'JobController.home');
Route.group(() => {
  Route.get('/', 'JobController.userIndex');
  Route.get('/delete/:id', 'JobController.delete');
  Route.get('/edit/:id', 'JobController.edit');
  Route.post('/update/:id', 'JobController.update').validator('CreateJob');
  Route.post('/create', 'JobController.create').validator('CreateJob');
}).prefix('/post-a-job');
