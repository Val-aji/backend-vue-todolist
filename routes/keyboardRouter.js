import express from "express"
import { cekAuth } from "../middleware/middleware.js"
import { deleteData, insertData, getData } from "../controllers/keyboardControllers.js"

const router = express.Router()

router.post("/insert", cekAuth, insertData)
router.post("/getData", cekAuth, getData)
router.post("/deleteData", cekAuth, deleteData)
export default router;
