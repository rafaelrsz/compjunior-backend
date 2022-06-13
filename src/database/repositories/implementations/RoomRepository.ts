import { singleton } from "tsyringe";

import { IRoom, Room } from "../../../app/schemas/rooms";
import { ICreateRoomDTO, IRoomsRepository } from "../IRoomRepository";

@singleton()
class RoomRepository implements IRoomsRepository {
  async create({
    name,
    description,
    couplebed_amount,
    singlebed_amount,
    daily_price,
    location,
  }: ICreateRoomDTO): Promise<IRoom> {
    const room = await Room.create({
      name,
      description,
      couplebed_amount,
      singlebed_amount,
      daily_price,
      location,
    });

    return room;
  }
}

export { RoomRepository };
