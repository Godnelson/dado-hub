import { PrismaClient } from '@prisma/client';
import express from 'express';
import { router } from './routes';

const app = express()
app.use(express.json())
app.use(express.static("storage"))
app.use("/client", express.static("client"))
const prisma = new PrismaClient()

app.use("/", router)

app.get("/", async (req, res) => {
    res.status(200).json("Hello World")
})

app.listen(8080, () => console.log("running on 8080"))
