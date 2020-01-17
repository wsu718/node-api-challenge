function validateActionPostBody(req, res, next) {
    if (!req.body.notes) {
        res.status(400).json({ errorMessage: "Your action must include notes." })
    } else if (!req.body.description) {
        res.status(400).json({ errorMessage: "Your action must include a description." })
    } else {
        next()
    }
};

module.exports = validateActionPostBody;