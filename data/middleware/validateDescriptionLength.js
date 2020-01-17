function validateDescriptionLength(req, res, next) {
    if (req.body.description && req.body.description.length > 128) {
        res.status(400).json({ errorMessage: "Your description must be less than 128 characters long." })
    } else {
        next()
    }
};

module.exports = validateDescriptionLength;