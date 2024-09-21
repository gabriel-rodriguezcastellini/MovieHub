import { Router } from "express";
import usersRouter from "./users.route";
import moviesrouter from "./movies.route";
import showtimerouter from "./showtimes.route";
import theatersRouter from "./theaters.route";
import ticketsRouter from "./tickets.route";

const router = Router();
router.use("/users", usersRouter);
router.use("/movies", moviesrouter);
router.use("/showtimes", showtimerouter);
router.use("/theaters", theatersRouter);
router.use("/tickers", ticketsRouter);

export default router;
