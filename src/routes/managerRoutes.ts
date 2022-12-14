import { Router } from 'express';
import managerController from "../controllers/ManagerController";

const managerRoutes = Router();

managerRoutes.post('/signup-manager', managerController.create);

export default managerRoutes;