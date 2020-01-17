const Projects = require('../helpers/projectModel');

function validateProjectId(req, res, next) {
    Projects
        .get(req.params.id)
        .then(project => {
            if (project) {
                req.project = project;
                next()
            } else {
                res.status(404).json({ errorMessage: "A project with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "There was an error while looking up that ID." })
        })
};

module.exports = validateProjectId;