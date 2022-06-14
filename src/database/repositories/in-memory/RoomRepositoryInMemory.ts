import { Document } from "mongoose";

import { IRoom, Room } from "../../../app/schemas/rooms";
import { ICreateRoomDTO, IRoomsRepository } from "../IRoomRepository";

class RoomRepositoryInMemory implements IRoomsRepository {
  rooms: IRoom[] = [];

  async create({
    name,
    description,
    couplebed_amount,
    singlebed_amount,
    daily_price,
    location,
  }: ICreateRoomDTO): Promise<IRoom> {
    const room = new Room({
      name,
      description,
      couplebed_amount,
      singlebed_amount,
      daily_price,
      location,
    });

    this.rooms.push(room);

    return room;
  }
  async findByLocation(location: string): Promise<IRoom> {
    return this.rooms.find((room) => room.location === location);
  }

  async findAvailable(
    couplebed_amount?: number,
    singlebed_amount?: number
  ): Promise<IRoom[]> {
    const allRooms = this.rooms.filter((room) => {
      if (
        room.available === true ||
        (couplebed_amount && room.couplebed_amount === couplebed_amount) ||
        (singlebed_amount && room.singlebed_amount === singlebed_amount)
      ) {
        return room;
      }
      return null;
    });

    return allRooms;
  }
}

export { RoomRepositoryInMemory };
