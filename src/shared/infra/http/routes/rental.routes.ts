import { Router } from "express";

import { CreateRentalController } from "../../../../app/useCases/Rental/createRental/CreateRentalController";
import { DevolutionRentalController } from "../../../../app/useCases/Rental/devolutionRental/DevolutionRentalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createRentalController = new CreateRentalController();

const devolutionRentalController = new DevolutionRentalController();

const rentalRoutes = Router();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);

rentalRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
);

export { rentalRoutes };
