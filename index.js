import express from "express";
import cors from "cors";
import clientRouter from "./routes/clientRouter.js";
import keyboardRouter from "./routes/keyboardRouter.js"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import todolistRouter from "./routes/todolistRouter.js"


const app = express();

app.use(cors())
app.use(cookieParser())
app.use(fileUpload())

app.use("/client",clientRouter)
app.use("/", todolistRouter)
app.use("/keyboard", keyboardRouter)

app.get("/tes", (req, res) => {
    res.send("Server success running")
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("server runing in localhost:" + port.toString() + " ...")
})



