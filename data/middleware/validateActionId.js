const Actions = require('../helpers/actionModel');

function validateActionId(req, res, next) {
    Actions
        .get(req.params.id)
        .then(action => {
            if (action) {
                req.action = action;
                next()
            } else {
                res.status(404).json({ errorMessage: "An action with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "There was an error while looking up that ID." })
        })
};

module.exports = validateActionId;