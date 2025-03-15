import { Router } from 'express';
import { userRoutes } from './routes/user';
export const router = Router()


router.use("/user", userRoutes)
