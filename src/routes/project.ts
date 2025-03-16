import { PrismaClient } from "@prisma/client";
import { Router } from "express";

export const projectRoutes = Router()

const prisma = new PrismaClient()

projectRoutes.get("/", async (req, res) =>{
    try{
        const projects = await prisma.project.findMany()
        res.status(200).json(projects)
    }
    catch(e){
        res.status(400).send(e)
    }
})

projectRoutes.get("/:id", async (req, res) =>{
    try{
        const project = await prisma.project.findUnique({where:{id: Number(req.params.id)}})
        if (project != null) {
            res.status(200).json(project)
            return
        }
        res.status(404).json()
    }
    catch(e){
        res.status(400).send(e)
    }
})

projectRoutes.post("/", async (req, res) => {
    try{
        const project = await prisma.project.create({data: req.body})
        res.status(201).json(project)
    }catch(e){
        res.status(400).send(e)
    }
})

projectRoutes.put("/:id", async (req, res) => {
    try{
        const project = await prisma.project.update({where: {id: Number(req.params.id)}, data: req.body})
        res.status(200).json(project)
    }
    catch(e){
        res.status(400).send(e)
    }
})

projectRoutes.delete("/:id", async (req, res) => {
    try{
        await prisma.project.delete({where: {id: Number(req.body)}})
        res.status(204).send()
    }
    catch(e){
        res.status(400).send(e)
    }
})
