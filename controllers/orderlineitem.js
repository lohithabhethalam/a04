const express = require('express')
const api = express.Router()
const Model = require('../models/orderlineitem.js')
const LOG = require('../utils/logger.js')
const find = require('lodash.find')
const remove = require('lodash.remove')
const notfoundstring = 'orderlineitem'

// RESPOND WITH JSON DATA  --------------------------------------------
//testing
// GET all JSON
api.get('/findall', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const data = req.app.locals.orderLineItems.query
    res.send(JSON.stringify(data))
})

// GET one JSON by ID
api.get('/findone/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const id = parseInt(req.params.id, 10) // base 10
    const data = req.app.locals.orderLineItems.query
    const item = find(data, { _id: id })
    if (!item) { return res.end(notfoundstring) }
    res.send(JSON.stringify(item))
})

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
api.get('/', (req, res) => {
    res.render('orderlineitem/index.ejs')
})

// GET create
api.get('/create', (req, res) => {
    LOG.info(`Handling GET /create${req}`)
    const item = new Model()
    LOG.debug(JSON.stringify(item))
    res.render('orderlineitem/create',
        {
            title: 'Create orderlineitem',
            layout: 'layout.ejs',
            orderlineitem: item
        })
})

// GET /delete/:id
api.get('/delete/:id', (req, res) => {
    LOG.info(`Handling GET /delete/:id ${req}`)
    const id = parseInt(req.params.id, 10) // base 10
    const data = req.app.locals.orderLineItems.query
    const item = find(data, { _id: id })
    if (!item) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR ${JSON.stringify(item)}`)
    return res.render('orderlineitem/delete.ejs',
        {
            title: 'Delete orderlineitem',
            layout: 'layout.ejs',
            orderlineitem: item
        })
})

// GET /details/:id
api.get('/details/:id', (req, res) => {
    LOG.info(`Handling GET /details/:id ${req}`)
    const id = parseInt(req.params.id, 10) // base 10
    const data = req.app.locals.orderLineItems.query
    const item = find(data, { _id: id })
    if (!item) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR ${JSON.stringify(item)}`)
    return res.render('orderlineitem/details.ejs',
        {
            title: 'orderlineitem Details',
            layout: 'layout.ejs',
            orderlineitem: item
        })
})

// GET one
api.get('/edit/:id', (req, res) => {
    LOG.info(`Handling GET /edit/:id ${req}`)
    const id = parseInt(req.params.id, 10) // base 10
    const data = req.app.locals.orderLineItems.query
    const item = find(data, { _id: id })
    if (!item) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR${JSON.stringify(item)}`)
    return res.render('orderlineitem/edit.ejs',
        {
            title: 'orderineitem',
            layout: 'layout.ejs',
            orderlineitem: item
        })
})

// HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

// POST new
api.post('/save', (req, res) => {
    LOG.info(`Handling POST ${req}`)
    LOG.debug(JSON.stringify(req.body))
    const data = req.app.locals.orderLineItems.query
    const item = new Model()
    LOG.info(`NEW ID ${req.body._id}`)
    item._id = parseInt(req.body._id, 10) // base 10
    item.orderId = req.body.orderId
    item.lineNumber = parseInt(req.body.lineNumber,10)
    item.productKey = req.body.productKey
    item.quantity = parseInt(req.body.quantity,10)
    data.push(item)
    LOG.info(`SAVING NEW OrderLineItem ${JSON.stringify(item)}`)
    return res.redirect('/orderlineitem')
}
)

// POST update
api.post('/save/:id', (req, res) => {
    LOG.info(`Handling SAVE request ${req}`)
    const id = parseInt(req.params.id, 10) // base 10
    LOG.info(`Handling SAVING ID=${id}`)
    const data = req.app.locals.orderLineItems.query
    const item = find(data, { _id: id })
    if (!item) { return res.end(notfoundstring) }
    LOG.info(`ORIGINAL VALUES ${JSON.stringify(item)}`)
    LOG.info(`UPDATED VALUES: ${JSON.stringify(req.body)}`)
    item.orderId = req.body.orderId
    item.lineNumber = parseInt(req.body.lineNumber, 10)
    item.productKey = req.body.productKey
    item.quantity = parseInt(req.body.quantity, 10)
    LOG.info(`SAVING UPDATED product ${JSON.stringify(item)}`)
    return res.redirect('/orderlineitem')

})

// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', (req, res) => {
    LOG.info(`Handling DELETE request ${req}`)
    const id = parseInt(req.params.id, 10) // base 10
    LOG.info(`Handling REMOVING ID=${id}`)
    const data = req.app.locals.orderLineItems.query
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
    return res.redirect('/orderlineitem')
})

module.exports = api