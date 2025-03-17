import { PrismaClient } from "@prisma/client";
import { Router } from "express";

export const userRoutes = Router()

const prisma = new PrismaClient()

userRoutes.get("/", async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    }
    catch(e){
        res.status(400).send(e)
    }
})

userRoutes.get("/:id", async (req, res) => {
    try {
        const user = await prisma.user.findUnique({where:{id: Number(req.params.id)}})
        if (user != null) {
            res.status(200).json(user)
            return
        }
        res.status(404).json()
    }
    catch(e){
        res.status(400).send(e)
    }
})

userRoutes.post("/", async (req, res) => {
    try{
        const user = await prisma.user.create({data: req.body})
        res.status(201).json(user)
    }
    catch(e){
        res.status(400).send(e)
    }
})

userRoutes.put("/:id", async (req, res) => {
    try{
        const user = await prisma.user.update({where:{id: Number(req.params.id)}, data: req.body})
        res.status(200).json(user)
    }
    catch(e){
        res.status(400).send(e)
    }
})

userRoutes.delete("/:id", async (req, res) => {
    try{
        await prisma.user.delete({where: {id: Number(req.params.id)}})
        res.status(204).send()
    }
    catch(e){
        res.status(400).send(e)
    }
})
