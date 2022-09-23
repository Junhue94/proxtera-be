const uploadService = require("../services/upload.service");

async function create(req, res, next) {
    try {
        if (req.file === undefined) {
            return res.status(400).send("No excel file found.");
        }
        return res.json(await uploadService.create(req.file));
    } catch (err) {
        console.error(`Error while upload`, err.message);
        next(err);
    }
}

module.exports = {
    create,
};
