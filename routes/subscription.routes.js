import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({ message: "GET all suscriptions" }))
subscriptionRouter.get('/:id', (req, res) => res.send({ message: "GET suscriptions details" }))
subscriptionRouter.post('/', (req, res) => res.send({ message: "CREATE suscriptions" }))
subscriptionRouter.put('/:id', (req, res) => res.send({ message: "UPDATE suscriptions" }))
subscriptionRouter.delete('/:id', (req, res) => res.send({ message: "DELETE suscriptions" }))
subscriptionRouter.get('/user/:id', (req, res) => res.send({ message: "GET all user suscriptions" }))
subscriptionRouter.get('/:id/cancel', (req, res) => res.send({ message: "CANCEL user suscriptions" }))
subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({ message: "GET upcoming renewels" }))

export default subscriptionRouter;