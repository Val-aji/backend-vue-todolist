import express from "express";
import { deleteData, insertData, getData, selesai } from "../controllers/todolistControllers.js";
import { cekAuth } from "../middleware/middleware.js";

const router = express.Router()

router.post("/getData", cekAuth, getData)
router.post("/todolist", cekAuth, insertData)
router.post("/selesai", cekAuth, selesai)
router.delete("/todolist", cekAuth, deleteData)

export default router