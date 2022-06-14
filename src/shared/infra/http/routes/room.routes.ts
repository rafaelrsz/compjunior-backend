import { Router } from "express";

import { CreateRoomController } from "../../../../app/useCases/createRoom/CreateRoomController";
import { ListAvailableRoomController } from "../../../../app/useCases/listAvailableRoom/ListAvailableRoomController";

const listAvailableRoomController = new ListAvailableRoomController();
const createRoomController = new CreateRoomController();

const roomRoutes = Router();

roomRoutes.get("/", listAvailableRoomController.handle);

roomRoutes.post("/", createRoomController.handle);

export { roomRoutes };
