import { Router } from "express";
import noticesController from "../controllers/NoticesController";
import auth from "../middlewares/auth";

const noticesRoutes = Router();

noticesRoutes.post('/create-notice', auth, noticesController.create);
noticesRoutes.get('/notices', noticesController.index);
noticesRoutes.patch('/update-notice/:id', auth, noticesController.update);
noticesRoutes.delete('/delete-notice/:id', auth, noticesController.delete);

export default noticesRoutes;