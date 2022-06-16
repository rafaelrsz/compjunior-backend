import { Router } from "express";
import multer from "multer";

import { CreateRoomController } from "../../../../app/useCases/Room/createRoom/CreateRoomController";
import { ListAvailableRoomController } from "../../../../app/useCases/Room/listAvailableRoom/ListAvailableRoomController";
import { UpdateRoomImageController } from "../../../../app/useCases/Room/updateRoomImage/UpdateRoomImageController";
import uploadConfig from "../../../../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const listAvailableRoomController = new ListAvailableRoomController();
const createRoomController = new CreateRoomController();
const updateRoomImage = new UpdateRoomImageController();

const uploadImages = multer(uploadConfig.upload("./tmp/room_images"));

const roomRoutes = Router();

roomRoutes.get("/", listAvailableRoomController.handle);

roomRoutes.post("/", ensureAuthenticated, createRoomController.handle);

roomRoutes.patch(
  "/images/:id",
  ensureAuthenticated,
  uploadImages.array("images"),
  updateRoomImage.handle
);

export { roomRoutes };
