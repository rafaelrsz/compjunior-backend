import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { passwordRoutes } from "./password.routes";
import { rentalRoutes } from "./rental.routes";
import { roomRoutes } from "./room.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/rooms", roomRoutes);

router.use("/users", userRoutes);

router.use("/rentals", rentalRoutes);

router.use("/password", passwordRoutes);

router.use(authenticateRoutes);

export { router };
