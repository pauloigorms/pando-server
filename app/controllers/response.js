const express = require('express');
const router = express.Router();
const response__service = require('../services/response');

// routes
router.post('/', register)
// router.get('/user/:id', getResponseUser)
module.exports = router

function register(req, res, next) {
    response__service.register(req.body)
        .then((response) => res.status(201).send(
            { response: "Success", status: 201, data: response }))
        .catch(err => next(err))
}