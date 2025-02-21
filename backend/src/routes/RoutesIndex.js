import express from 'express';
import { getOperationCode, processData } from '../controller/ControllerIndex.js';
const router = express.Router();

// GET Endpoint
router.get('/bajaj', getOperationCode);

// POST Endpoint
router.post('/bajaj', processData);

export default router;
