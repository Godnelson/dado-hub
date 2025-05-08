import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import multer from "multer"
import { uploadFile } from "../helpers/uploadFile";

export const projectRoutes = Router()

const upload = multer()

const prisma = new PrismaClient()

//CRUD

projectRoutes.get("/", async (req, res) => {
    try {
        const projects = await prisma.project.findMany({
            include: {
                tags: true,
            },
        })
        res.status(200).json(projects)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

projectRoutes.get("/:id", async (req, res) => {
    try {
        const project = await prisma.project.findUnique({ where: { id: Number(req.params.id) }, include: { tags: true } })
        if (project != null) {
            res.status(200).json(project)
            return
        }
        res.status(404).json()
    }
    catch (e) {
        res.status(400).send(e)
    }
})

projectRoutes.post("/", async (req, res) => {
    try {
        const project = await prisma.project.create({ data: req.body })
        res.status(201).json(project)
    } catch (e) {
        res.status(400).send(e)
    }
})

projectRoutes.put("/:id", async (req, res) => {
    try {
        const project = await prisma.project.update({ where: { id: Number(req.params.id) }, data: req.body, include: { tags: true } })
        res.status(200).json(project)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

projectRoutes.delete("/:id", async (req, res) => {
    try {
        await prisma.project.delete({ where: { id: Number(req.body) } })
        res.status(204).send()
    }
    catch (e) {
        res.status(400).send(e)
    }
})

//BIND TAG

projectRoutes.put("/bind_tag/:id/:tagId", async (req, res) => {
    try {
        const project = await prisma.project.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                tags: {
                    create: [
                        {
                            tag: {
                                connect: { id: Number(req.params.tagId) }
                            }
                        }
                    ]
                }
            },
            include: { tags: true }
        })
        res.status(200).json(project)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

//UNBIND TAG

projectRoutes.put("/unbind_tag/:id/:tagId", async (req, res) => {

    try {
        const project = await prisma.tagAssignedForProjects.delete({
            where: {
                projectId_tagId: {
                    projectId: Number(req.params.id),
                    tagId: Number(req.params.tagId)
                }
            }
        })
        res.status(200).json(project)
    }
    catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

//UPLOAD BANNER

projectRoutes.post("/upload_banner", upload.single("banner"), async (req, res) => {
    try {
        if (!req.file) throw Error("There's no file uploaded with key 'banner'")
        if (!req.body.projectId) throw Error("There's no projectId on request body")
        if (req.file.mimetype.split("/")[0] != "image") throw Error("'banner' is not a image")
        const filePath = await uploadFile(req.file?.buffer, `/banners/${req.body.projectId}_banner.${req.file.mimetype.split("/")[1]}`)
        const project = await prisma.project.update({ where: { id: Number(req.body.projectId) }, data: { banner: filePath } })
        res.status(200).json(project)
    } catch (e) {
        res.status(400).send(e)
    }
})

//REMOVE BANNER

projectRoutes.put("/remove_banner/:id", async (req, res) => {
    try {
        const project = await prisma.project.update({ where: { id: Number(req.params.id) }, data: { banner: null } })
        res.status(200).json(project)
    } catch (e) {
        res.status(400).send(e)
    }
})
