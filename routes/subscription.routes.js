import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({ message: "GET all suscriptions" }))
subscriptionRouter.get('/:id', (req, res) => res.send({ message: "GET suscriptions details" }))
subscriptionRouter.post('/', authorize, createSubscription)
subscriptionRouter.put('/:id', (req, res) => res.send({ message: "UPDATE suscriptions" }))
subscriptionRouter.delete('/:id', (req, res) => res.send({ message: "DELETE suscriptions" }))
subscriptionRouter.get('/user/:id', authorize, getUserSubscription)
subscriptionRouter.get('/:id/cancel', (req, res) => res.send({ message: "CANCEL user suscriptions" }))
subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({ message: "GET upcoming renewels" }))

export default subscriptionRouter;