﻿const express = require('express');
const router = express.Router();
const users = require('../services/users');

// routes
router.post('/signup', registerUser)
router.post('/signup/password/', upPassWord)
router.post('/signin', authenticate)
router.patch('/:id', upUser)
router.get('/:id', getUser)
module.exports = router

function registerUser(req, res, next) {
    users.register(req.body)
        .then((user) => res.status(201).send({
            response: "Success",
            data: user
        }))
        .catch(err => next(err))
}

function upPassWord(req, res, next) {
    users.upPassWord(req.body)
        .then((user) => res.status(201).send({
            response: "Success",
            data: user
        }))
        .catch(err => next(err))
}

function authenticate(req, res, next) {
    users.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Usuário ou senha incorretos' }))
        .catch(err => next(err))
}

function upUser(req, res) {
    users.upUser(req.params.id, req.body)
    .then((test) => res.status(200).send(
        { response: "Success", status: 200, data: test }))
    .catch(error => { throw error })
}

function getUser(req, res) {
    users.getById(req.params.id)
        .then((tests) => res.status(200).send(
            { status: 200, data: tests }))
        .catch(error => { throw error})
}