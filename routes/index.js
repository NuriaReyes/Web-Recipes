var express = require('express')
var router = express.Router()
// var mongoose = require('mongoose')
var Recipe = require('../Recipe.model')
var User = require('../Users.model')
// var db = 'mongodb://localhost/myRecipes'
// Auth
var passport = require('passport')

// GET login page
router.get('/', (req, res, next) => {
  res.render('login')
})

/* Log-in to the system TODO:DB-connection */
router.post('/login', passport.authenticate('local', { failureRedirect: '/error' }), function (req, res, next) {
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

  if (password !== check) {
    res.render('signup', {error: 'La contraseña y confirmación no coinciden'})
  } else {
    User.register(new User({ username: username }), password, function (err, account) {
      if (err) {
        return res.render('signup', { error: 'El usuario que intenta ingresar ya está registrado' })
      }
      return res.render('login', {success: 'Usuario registrado con éxito'})
    })
  }
})

// If credentials are incorrect
router.get('/error', (req, res, next) => {
  res.render('login', {error: 'Credenciales incorrectas, intente de nuevo'})
})

// Log-out of the system
router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/')
})

// GET main page
router.get('/home', (req, res, next) => {
  if (req.query.type !== undefined) {
    Recipe.find({owner: req.user._id, type: req.query.type}).exec(function (err, recipes) {
      if (err) {
        res.render('home', { error: 'Ocurrio un error inesperado' })
      } else {
        res.render('home', { recipes })
      }
    })
  } else {
    Recipe.find({owner: req.user._id}).exec(function (err, recipes) {
      if (err) {
        res.render('home', { error: 'Ocurrio un error inesperado' })
      } else {
        res.render('home', { recipes })
      }
    })
  }
})

// GET new page
router.get('/recipe/new', (req, res, next) => {
  res.render('new')
})

// Save a recipe
router.post('/recipe/save', (req, res, next) => {
  if (req.body.name !== '' && req.body.ing !== '' && req.body.step !== '') {
    Recipe.find({name: req.body.name}).exec(function (err, recipes) {
      if (err) {
        res.render('new', {error: 'Hubo un error inesperado'})
      } else {
        User.findById(req.user._id, function (err, user) {
          if (err) {
            res.render('new', {error: 'Hubo un error inesperado'})
          }

          if (recipes.length === 0) {
            var newRecipe = new Recipe()

            newRecipe.name = req.body.name
            newRecipe.type = req.body.type
            newRecipe.link = req.body.link
            newRecipe.ingredients = req.body.ing
            newRecipe.steps = req.body.step
            newRecipe.owner = user

            newRecipe.save(function (err, recipe) {
              if (err) {
                res.render('new', {error: 'No se pudo guardar receta'})
              } else {
                res.render('new', {success: 'Receta guardada con éxito'})
              }
            })
          } else {
            res.render('new', {error: 'La receta que trata de guardar ya existe'})
          }
        })
      }
    })
  } else {
    res.render('new', {error: 'No se puede guardar receta si no pone nombre, ingredientes e instrucciones'})
  }
})

// Search for a recipe
router.post('/recipe/find', (req, res, next) => {
  console.log(req.body.food)
  Recipe.find({owner: req.user._id, $text: {$search: req.body.food}}).exec(function (err, recipes) {
    if (err) {
      res.render('home', {error: 'Ocurrio un error inesperado'})
    }
    console.log(recipes)
    res.render('home', { recipes })
  })
})

router.get('/recipe/update/:id', (req, res, next) => {
  Recipe.findOne({_id: [req.params.id]}).exec(function (err, recipe) {
    if (err) {
      console.log('ocurrio error al cargar pagina')
      console.log(err)
    } else {
      console.log(recipe)
      res.render('update', { recipe })
    }
  })
})

router.post('/recipe/update/:id', function (req, res, next) {
  Recipe.findById([req.params.id], function (err, recipe) {
    if (err) {
      console.log(err)
      res.render('home', {error: 'No se pudo modificar receta'})
    }
    recipe.name = req.body.name
    recipe.type = req.body.type
    recipe.link = req.body.link
    recipe.ingredients = req.body.ing
    recipe.steps = req.body.step

    recipe.save(function (err, upRecipe) {
      if (err) {
        console.log(err)
        console.log('No se pudo guardar receta')
        res.redirect('/home')
      } else {
        console.log(upRecipe)
        console.log('Receta modificada con éxito')
        res.render('home', {success: 'Se modificó con éxito la receta'})
      }
    })
  })
})

module.exports = router
