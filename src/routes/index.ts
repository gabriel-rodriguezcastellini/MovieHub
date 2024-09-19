import { Router } from "express";
import usersRouter from "./users.route";
import moviesrouter from "./movies.route";
import showtimerouter from "./showtimes.route";

const router = Router();
router.use("/users", usersRouter);
router.use("/movies", moviesrouter);
router.use("/showtimes", showtimerouter);

export default router;
