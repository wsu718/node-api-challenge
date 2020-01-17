const express = require('express');
const router = express.Router();
const Projects = require('../helpers/projectModel');
const Actions = require('../helpers/actionModel');

const validateProjectId = require('../middleware/validateProjectId');
const validateProjectPostBody = require('../middleware/validateProjectPostBody');
const validateHasBody = require('../middleware/validateHasBody');
const validateActionPostBody = require('../middleware/validateActionPostBody');
const validateDescriptionLength = require('../middleware/validateDescriptionLength');
const validateCompletedIsBoolean = require('../middleware/validateCompletedIsBoolean');

router.get('/', (req, res) => {
    Projects
        .get()
        .then(projectList => {
            res.status(200).json(projectList);
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'The projects information could not be retrieved.' })
        })
})

router.get('/:id', validateProjectId, (req, res) => {
    req.project
        ? res.status(200).json(req.project)
        : res.status(500).json({ errorMessage: 'The project information could not be retrieved.' })
})

router.get('/:id/actions', validateProjectId, (req, res) => {
    Projects
        .getProjectActions(req.params.id)
        .then(actions => res.status(200).json(actions))
        .catch(error => {
            res.status(500).json({ errorMessage: 'The actions information could not be retrieved.' })
        })
});

router.delete('/:id', validateProjectId, (req, res) => {
    Projects
        .remove(req.params.id)
        .then(id => {
            res.status(200).json({ message: `You have successfully deleted project #${req.params.id}.`, id })
        })
        .catch(() => {
            res.status(500).json({ errorMessage: 'The project could not be removed.' })
        })
});

router.post('/', validateHasBody, validateProjectPostBody, (req, res) => {
    Projects
        .insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'The project could not be created.' })
        })
});

router.post('/:id/actions', validateProjectId, validateHasBody, validateActionPostBody, validateDescriptionLength, validateCompletedIsBoolean, (req, res) => {
    Actions
        .insert({ ...req.body, project_id: req.params.id })
        .then(action => {
            res.status(201).json(action)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: 'The action could not be created.' })
        })
});

router.put('/:id', validateProjectId, validateHasBody, (req, res) => {
    Projects
        .update(req.params.id, req.body)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: 'The project could not be modified.' })
        })
});



module.exports = router;

