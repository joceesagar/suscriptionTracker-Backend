import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => res.send({ message: 'GET all users' }))
userRouter.get("/:id", (req, res) => res.send({ message: 'GET user details' }))
userRouter.post("/", (req, res) => res.send({ message: 'CREATE new user' }))
userRouter.put("/:id", (req, res) => res.send({ message: 'UPDATE user details' }))
userRouter.delete("/:id", (req, res) => res.send({ message: 'DELETE user details' }))

export default userRouter;