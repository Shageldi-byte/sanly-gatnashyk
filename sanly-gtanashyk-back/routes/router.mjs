import express from 'express';
import { adminRouter } from './admin/admin.mjs';

const router = express.Router();

router.use('/admin',adminRouter);

export {router}