import { Router } from "express";
import usersRouter from "./users.route";
import moviesrouter from "./movies.route";

const router = Router();
router.use("/users", usersRouter);
router.use("/movies", moviesrouter);

export default router;
