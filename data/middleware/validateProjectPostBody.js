function validateProjectPostBody(req, res, next) {
    if (!req.body.name) {
        res.status(400).json({ errorMessage: "Your project must include a name." })
    } else if (!req.body.description) {
        res.status(400).json({ errorMessage: "Your project must include a description." })
    } else {
        next()
    }
};

module.exports = validateProjectPostBody;