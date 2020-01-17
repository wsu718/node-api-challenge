function validateHasBody(req, res, next) {
    if (Object.entries(req.body).length === 0) {
        res.status(400).json({ errorMessage: "Your request must include a body." })
    } else {
        next()
    }
};

module.exports = validateHasBody;