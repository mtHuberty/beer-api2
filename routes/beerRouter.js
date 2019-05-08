const express = require('express')
const Beer = require('../models/beer')

const beerRouter = express.Router()

beerRouter.post('/', (req, res) => {
    let beer = new Beer()
    beer.name = req.body.name
    beer.rating = req.body.rating
    beer.save((err, document) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.send(`Saved your beer!\n${document}`)
        }
    })
})

beerRouter.get('/', (req, res) => {
    Beer.find((err, documents) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.json(documents)
        }
    })
})

beerRouter.get('/:beer_id', (req, res) => {
    Beer.findById(req.params.beer_id, (err, document) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.json(document)
        }
    })
})

beerRouter.put('/:beer_id', (req, res) => {
    Beer.findById(req.params.beer_id, (err, document) => {
        if (err) {
            res.status(400).send(err)
        } else {
            document.name = req.body.name
            document.rating = req.body.rating

            document.save((saveErr, savedDocument) => {
                if (saveErr) {
                    res.status(400).send(saveErr)
                } else {
                    res.send(`Beer posted!\n${savedDocument}`)
                }
            })
        }
    })
})

beerRouter.delete('/:beer_id', (req, res) => {
    Beer.deleteOne({
        _id: req.params.beer_id
    }, (err) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.send(`You successfully deleted beer: ${req.params.beer_id}`)
        }
    })
})

module.exports = beerRouter