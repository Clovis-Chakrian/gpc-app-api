import { Router } from "express";
import eventsController from "../controllers/EventsController";

const eventsRoutes = Router();

eventsRoutes.post('/event', eventsController.create);
eventsRoutes.patch('/event/:id', eventsController.update);
eventsRoutes.get('/events', eventsController.index);
eventsRoutes.delete('/event/:id', eventsController.delete);

export default eventsRoutes;