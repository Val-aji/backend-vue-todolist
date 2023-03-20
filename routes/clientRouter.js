import  express  from "express";
import { editProfile, login, register, cekLogin } from "../controllers/clientControllers.js";
import {cekAuth} from "../middleware/middleware.js"
const router = express.Router()

router.post("/cekLogin", cekLogin)
router.post("/register", register)
router.post("/login", login)
router.post("/changeData", cekAuth ,editProfile)
export default router;