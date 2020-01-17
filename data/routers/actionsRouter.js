const express = require('express');
const router = express.Router();
const Actions = require('../helpers/actionModel');

const validateActionId = require('../middleware/validateActionId');
const validateHasBody = require('../middleware/validateHasBody');
const validateDescriptionLength = require('../middleware/validateDescriptionLength');
const validateCompletedIsBoolean = require('../middleware/validateCompletedIsBoolean');

router.get('/', (req, res) => {
    Actions
        .get()
        .then(actionList => {
            res.status(200).json(actionList)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: 'The actions information could not be retrieved.' })
        })
});

router.get('/:id', validateActionId, (req, res) => {
    req.action
        ? res.status(200).json(req.action)
        : res.status(500).json({ errorMessage: 'The action information could not be retrieved.' })
});

router.delete('/:id', validateActionId, (req, res) => {
    Actions
        .remove(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: 'The action could not be removed.' })
        })
});

router.put('/:id', validateActionId, validateHasBody, validateDescriptionLength, validateCompletedIsBoolean, (req, res) => {
    Actions
        .update(req.params.id, req.body)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: 'The action could not be modified.' })
        })
});

module.exports = router;

//  