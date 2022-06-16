import { container } from "tsyringe";

import { RentalRepository } from "../../database/repositories/implementations/RentalRepository";
import { RoomRepository } from "../../database/repositories/implementations/RoomRepository";
import { UserRepository } from "../../database/repositories/implementations/UserRepository";
import { IRentalsRepository } from "../../database/repositories/IRentalRepository";
import { IRoomsRepository } from "../../database/repositories/IRoomRepository";
import { IUsersRepository } from "../../database/repositories/IUserRepository";

container.registerSingleton<IRoomsRepository>(
  "RoomsRepository",
  RoomRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UserRepository
);

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalRepository
);
