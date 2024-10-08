import { Router } from "express";
import usersRouter from "./users.route";
import moviesrouter from "./movies.route";
import showtimerouter from "./showtimes.route";
import screensRouter from "./screens.route";
import ticketsRouter from "./tickets.route";

const router = Router();
router.use("/users", usersRouter);
router.use("/movies", moviesrouter);
router.use("/showtimes", showtimerouter);
router.use("/screens", screensRouter);
router.use("/tickets", ticketsRouter);

export default router;
