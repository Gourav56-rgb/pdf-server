import { Router } from 'express';
import {
  uploadDocument,
  updatePlaceholders,
  fillAndSign,
  getDocuments,
  getSignedDocuments,
} from '../controllers/documentController';
import { upload } from '../middlewares/multer';

const router = Router();

// Route to upload PDF
router.post('/upload', upload.single('pdf'), uploadDocument);

// Route to update placeholder coordinates
router.put('/:id/placeholders', updatePlaceholders);

// Route to fill the document and sign (with optional signature image)
router.put('/:id/sign', upload.single('signature'), fillAndSign);

// Route to list all documents
router.get('/all', getDocuments);

// Route to list signed documents
router.get('/signed', getSignedDocuments);

export default router;
