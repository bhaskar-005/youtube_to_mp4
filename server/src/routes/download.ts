import { Router } from "express";import { downloadController } from "../controllers/downloadController";

const router = Router();


router.post('/download', downloadController);

export default router;