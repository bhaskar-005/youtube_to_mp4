import { Router } from "express";
import { formateController } from "../controllers/formateController";

const router = Router();


router.post('/available-formats', formateController);

export default router;