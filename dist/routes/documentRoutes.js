"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const documentController_1 = require("../controllers/documentController");
const multer_1 = require("../middlewares/multer");
const router = (0, express_1.Router)();
// Route to upload PDF
router.post('/upload', multer_1.upload.single('pdf'), documentController_1.uploadDocument);
// Route to update placeholder coordinates
router.put('/:id/placeholders', documentController_1.updatePlaceholders);
// Route to fill the document and sign (with optional signature image)
router.put('/:id/sign', multer_1.upload.single('signature'), documentController_1.fillAndSign);
// Route to list all documents
router.get('/all', documentController_1.getDocuments);
// Route to list signed documents
router.get('/signed', documentController_1.getSignedDocuments);
exports.default = router;
