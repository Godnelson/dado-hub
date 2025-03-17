import { PrismaClient } from "@prisma/client";
import { Router } from "express";

export const tagRoutes = Router()

const prisma = new PrismaClient()

tagRoutes.get("/", async (req, res) =>{
    try{
        const tags = await prisma.tag.findMany()
        res.status(200).json(tags)
    }
    catch(e){
        res.status(400).send(e)
    }
})

tagRoutes.get("/:id", async (req, res) =>{
    try{
        const tag = await prisma.tag.findUnique({where:{id: Number(req.params.id)}})
        if (tag != null) {
            res.status(200).json(tag)
            return
        }
        res.status(404).json()
    }
    catch(e){
        res.status(400).send(e)
    }
})

tagRoutes.post("/", async (req, res) => {
    try{
        const tag = await prisma.tag.create({data: req.body})
        res.status(201).json(tag)
    }catch(e){
        res.status(400).send(e)
    }
})

tagRoutes.put("/:id", async (req, res) => {
    try{
        const tag = await prisma.tag.update({where: {id: Number(req.params.id)}, data: req.body})
        res.status(200).json(tag)
    }
    catch(e){
        res.status(400).send(e)
    }
})

tagRoutes.delete("/:id", async (req, res) => {
    try{
        await prisma.tag.delete({where: {id: Number(req.body)}})
        res.status(204).send()
    }
    catch(e){
        res.status(400).send(e)
    }
})
