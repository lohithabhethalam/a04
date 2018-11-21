const express = require('express')
const api = express.Router()
const Model = require('../models/product.js')
const LOG = require('../utils/logger.js')
const find = require('lodash.find')
const remove = require('lodash.remove')
const notfoundstring = 'product'

api.get('/', (req, res) => {
	res.render('product/index.ejs');
})

api.get('/create', (req, res) => {
	res.render('product/create.ejs');
})

api.get('/delete/:id', (req, res) => {
	res.render('product/delete.ejs');
})

api.get('/edit/:id', (req, res) => {
	res.render('product/edit.ejs');
})

api.get('/details/:id', (req, res) => {
	res.render('product/details.ejs');
})

module.exports = api