const express = require('express');
const router = express.Router();
const tests = require('./../services/tests');

// routes
router.post('/', createTest)
router.get('/', getTests)
router.patch('/:id', upTest)
router.put('/:id', mdTest)
module.exports = router

function createTest(req, res, next) {
    tests.register(req.body)
        .then((test) => res.status(201).send(
            { response: "Success", status: 201, data: test }))
        .catch(error => { throw error})
}

function getTests(req, res, next) {
    tests.getTests()
        .then((tests) => res.status(200).send(
            { status: 200, data: tests }))
        .catch(error => { throw error})
}

function upTest(req, res, next) {
    tests.upTest(req.params.id, req.body)
        .then((test) => res.status(200).send(
            { response: "Success", status: 200, data: test }))
        .catch(error => { throw error})
}

function mdTest(req, res, next) {
    tests.mdTest(req.params.id, req.body)
        .then((test) => res.status(200).send(
            { response: "Success", status: 200, data: test }))
        .catch(error => { throw error })
}