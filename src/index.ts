import express from 'express';

const app = express()

app.get("/", (req, res) => {
    res.status(200).json("Hello World")
})

app.listen(8080, () => console.log("running on 8080"))
