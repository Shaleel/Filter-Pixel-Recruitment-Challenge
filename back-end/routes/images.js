const express = require("express");
const { getImagesFromAWS_S3 } = require("../controllers/images");
const router = express.Router();

router.get("/get-from-aws-S3", getImagesFromAWS_S3);

module.exports = router;
