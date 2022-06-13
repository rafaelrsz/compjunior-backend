import { container } from "tsyringe";

import { RoomRepository } from "../../database/repositories/implementations/RoomRepository";
import { IRoomsRepository } from "../../database/repositories/IRoomRepository";

container.registerSingleton<IRoomsRepository>(
  "RoomsRepository",
  RoomRepository
);
