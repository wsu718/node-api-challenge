function validateCompletedIsBoolean(req, res, next) {
    if (req.body.completed && (typeof req.body.completed !== 'boolean')) {
        res.status(400).json({ errorMessage: "Completed field must be a boolean." })
    } else {
        next()
    }
};

module.exports = validateCompletedIsBoolean;