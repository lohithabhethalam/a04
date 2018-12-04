 
//   @author Razeena Rao

const express = require('express')
const api = express.Router()
const Model = require('../models/customer.js')
const LOG = require('../utils/logger.js')
const find = require('lodash.find')
const remove = require('lodash.remove')
const notfoundstring = 'customers'

// RESPOND WITH JSON DATA  --------------------------------------------

// GET all JSON
api.get('/findall', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const data = req.app.locals.customers.query
    res.send(JSON.stringify(data))
})

// GET one JSON by ID
api.get('/findone/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const id = parseInt(req.params.id, 10) // base 10
    const data = req.app.locals.customers.query
    const item = find(data, { _id: id })
    if (!item) { return res.end(notfoundstring) }
    res.send(JSON.stringify(item))
})

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
api.get('/', (req, res) => {
    res.render('customer/index.ejs')
})

// GET create
api.get('/create', (req, res) => {
    LOG.info(`Handling GET /create${req}`)
    const item = new Model()
    LOG.debug(JSON.stringify(item))
    res.render('customer/create',
        {
            title: 'Create customer',
            layout: 'layout.ejs',
            customer: item
        })
})

// GET /delete/:id
api.get('/delete/:id', (req, res) => {
    LOG.info(`Handling GET /delete/:id ${req}`)
    const id = parseInt(req.params.id, 10) // base 10
    const data = req.app.locals.customers.query
    const item = find(data, { _id: id })
    if (!item) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR ${JSON.stringify(item)}`)
    return res.render('customer/delete.ejs',
        {
            title: 'Delete customer',
            layout: 'layout.ejs',
            customer: item
        })
})

// GET /details/:id
api.get('/details/:id', (req, res) => {
    LOG.info(`Handling GET /details/:id ${req}`)
    const id = parseInt(req.params.id, 10) // base 10
    const data = req.app.locals.customers.query
    const item = find(data, { _id: id })
    if (!item) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR ${JSON.stringify(item)}`)
    return res.render('customer/details.ejs',
        {
            title: 'Customer Details',
            layout: 'layout.ejs',
            customer: item
        })
})

// GET one
api.get('/edit/:id', (req, res) => {
    LOG.info(`Handling GET /edit/:id ${req}`)
    const id = parseInt(req.params.id, 10) // base 10
    const data = req.app.locals.customers.query
    const item = find(data, { _id: id })
    if (!item) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR${JSON.stringify(item)}`)
    return res.render('customer/edit.ejs',
        {
            title: 'customers',
            layout: 'layout.ejs',
            customer: item
        })
})

// HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

// POST new
api.post('/save', (req, res) => {
    LOG.info(`Handling POST ${req}`)
    LOG.debug(JSON.stringify(req.body))
    const data = req.app.locals.customers.query
    const item = new Model()
    LOG.info(`NEW ID ${req.body._id}`)
    item._id = parseInt(req.body._id, 10) // base 10
    item.name = req.body.name
    item.email = req.body.email
    item.Dob = req.body.Dob
    item.ph_no = req.body.ph_no

    data.push(item)
    LOG.info(`SAVING NEW product ${JSON.stringify(item)}`)
    return res.redirect('/customer')
}
)

// POST update
api.post('/save/:id', (req, res) => {
    LOG.info(`Handling SAVE request ${req}`)
    const id = parseInt(req.params.id, 10) // base 10
    LOG.info(`Handling SAVING ID=${id}`)
    const data = req.app.locals.customers.query
    const item = find(data, { _id: id })
    if (!item) { return res.end(notfoundstring) }
    LOG.info(`ORIGINAL VALUES ${JSON.stringify(item)}`)
    LOG.info(`UPDATED VALUES: ${JSON.stringify(req.body)}`)
    item.name = req.body.name
    item.email = req.body.email
    item.Dob = req.body.Dob
    item.ph_no = req.body.ph_no
    LOG.info(`SAVING UPDATED product ${JSON.stringify(item)}`)
    return res.redirect('/customer')

})

// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', (req, res) => {
    LOG.info(`Handling DELETE request ${req}`)
    const id = parseInt(req.params.id, 10) // base 10
    LOG.info(`Handling REMOVING ID=${id}`)
    const data = req.app.locals.customers.query
    const item = find(data, { _id: id })
    if (!item) {
        return res.end(notfoundstring)
    }
    if (item.isActive) {
        item.isActive = false
        console.log(`Deacctivated item ${JSON.stringify(item)}`)
    } else {
        const item = remove(data, { _id: id })
        console.log(`Permanently deleted item ${JSON.stringify(item)}`)
    }
    return res.redirect('/customer')
})

module.exports = api