const { Router } = require("express");
const router = Router();

const upload = require("../middleware/upload.middleware");
const {
  uploadPdf,
} = require("../controller/ai.controller");

router.post( "/upload", upload.single("pdf"),uploadPdf);

module.exports = router;

//npm install pdf-parse ==> pdf read krne ke liye text
//npm install pdf-parse@1.1.1


//pm install @google/generative-ai ai se connect ho raha h