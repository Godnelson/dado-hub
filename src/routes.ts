import { Router } from 'express';
import { userRoutes } from './routes/user';
import { projectRoutes } from './routes/project';
import { tagRoutes } from './routes/tag';
export const router = Router()


router.use("/user", userRoutes)
router.use("/project", projectRoutes)
router.use("/tag", tagRoutes)
