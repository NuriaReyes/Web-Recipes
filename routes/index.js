var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Recipe = require('../Recipe.model')
var User = require('../Users.model')
var db = 'mongodb://localhost/myRecipes'
//Auth
var passport = require('passport');

// GET login page
router.get('/', (req, res, next) => {
  res.render('login')
})

/* Log-in to the system TODO:DB-connection */
router.post('/login', passport.authenticate('local', { failureRedirect: '/error' }), function(req, res, next) {
  res.redirect('/home')
})

// GET signup page
router.get('/signup', (req, res, next) => {
  res.render('signup')
})

// Save new user
router.post('/signup', (req, res, next) => {
  var username = req.body.username
  var password = req.body.password
  var check = req.body.passCheck

  if ( password !== check ) {
    res.render('signup', {error: 'La contraseña y confirmación no coinciden'});
  } else {
    User.register(new User({ username : username }), password, function(err, account){
      if (err){
        return res.render('signup', { error: "El usuario que intenta ingresar ya está registrado" })
      }
      console.log(account);
      return res.render('login', { success: "Usuario registrado con éxito"})
    });
  }
})

// If credentials are incorrect
router.get('/error', (req, res, next) => {
  res.render('login', { error: 'Credenciales incorrectas, intente de nuevo'})
})

// Log-in to the system
// router.post('/login', (req, res, next) => {
//   if(req.body.username == 'Nuria' && req.body.password == '123') res.redirect('/home')
//   res.redirect('/error')
// })

// Log-out of the system
router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/')
})

// GET main page
router.get('/home', (req, res, next) => {
  res.render('home')
})

// GET new page
router.get('/recipe/new', (req, res, next) => {
  res.render('new')
})

// Save a recipe
router.post('recipe/save', (req, res, next) => {

})

// Update a recipe
router.get('/recipe/update/:id', (req, res, next) => {
  res.render('update')
})

// See a recipe
router.get('recipe/:id', (req, res, next) => {
  res.render('recipe')
})


module.exports = router
