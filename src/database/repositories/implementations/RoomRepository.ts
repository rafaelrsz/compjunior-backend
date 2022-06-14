import { IRoom, Room } from "../../../app/schemas/rooms";
import { ICreateRoomDTO, IRoomsRepository } from "../IRoomRepository";

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

  async findByLocation(location: string): Promise<IRoom> {
    const room = await Room.findOne({ location });

    return room;
  }

  async findAvailable(
    couplebed_amount?: number,
    singlebed_amount?: number
  ): Promise<IRoom[]> {
    const rooms = await Room.find({
      ...(couplebed_amount ? { couplebed_amount } : {}),
      ...(singlebed_amount ? { singlebed_amount } : {}),
    })
      .where("available")
      .equals("true")
      .exec();

    return rooms;
  }
}

export { RoomRepository };
