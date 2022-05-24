import express from "express";
import { getAllIrds, getIrdById } from "../controllers/irds.js";

const router = express.Router();

router.get('/', getAllIrds);
router.get('/:id', getIrdById);

export default router;