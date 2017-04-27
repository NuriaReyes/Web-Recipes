var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Recipe = require('../Recipe.model')
var User = require('../Users.model')
var db = 'mongodb://localhost/myRecipes'

// Archive system
var fs = require('fs')

// To handle multipart/form-data, uploading files
var multer = require('multer')
var upload = multer({ dest: 'public/uploads' }) //temp folder to save files

// GET login page
router.get('/', (req, res, next) => {
  res.render('login')
})

// GET register page
router.get('/signup', (req, res, next) => {
  res.render('signup')
})

// Save new user
router.post('/signup', (req, res, next) => {

})

// If credentials are incorrect
router.get('/error', (req, res, next) => {
  res.render('login', { error: 'Credenciales incorrectas, intente de nuevo'})
})

// Log-in to the system
router.post('/login', (req, res, next) => {
  if(req.body.username == 'Nuria' && req.body.password == '123') res.redirect('/home')
  res.redirect('/error')
})

// Log-out of the system
router.get('/logout', (req, res, next) => {
  res.render('login')
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
