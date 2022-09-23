const express = require("express");
const router = express.Router();

const uploadController = require("../controllers/upload.controller");
const uploadExcel = require("../middlewares/uploadExcel");

router.post("/", uploadExcel.single("file"), uploadController.create);

module.exports = router;
