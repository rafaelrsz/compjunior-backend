import { Router } from "express";

import { CreateRoomController } from "../../../../app/useCases/CreateRoomController";

const createRoomController = new CreateRoomController();

const roomRoutes = Router();

roomRoutes.get("/", (request, response) => {
  response.json({ message: "hello" });
});

roomRoutes.post("/a", createRoomController.handle);

export { roomRoutes };
