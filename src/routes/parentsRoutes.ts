import { Router } from 'express';
import parentsController from '../controllers/ParentsController';

const parentsRoutes = Router();

parentsRoutes.post('/signup-parent', parentsController.create);

export default parentsRoutes;