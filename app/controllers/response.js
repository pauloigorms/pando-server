const express = require('express');
const router = express.Router();
const response__service = require('../services/response');

// routes
router.post('/', register)
router.put('/:id', mdResponse)
// router.get('/user/:id', getResponseUser)
module.exports = router

function register(req, res, next) {
    response__service.register(req.body)
        .then((response) => res.status(201).send(
            { response: "Success", status: 201, data: response }))
        .catch(err => next(err))
}

function mdResponse(req, res, next) {
    tests.mdResponse(req.params.id, req.body)
        .then((test) => res.status(200).send(
            { response: "Success", status: 200, data: test }))
        .catch(error => { throw error })
}