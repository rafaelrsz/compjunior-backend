import { IRoom, Room } from "../../../app/schemas/Room";
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

  async findById(id: string): Promise<IRoom> {
    const room = await Room.findOne({ id });

    return room;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await Room.findOneAndUpdate({ id, available });
  }

  async updateRoomImages(id: string, images: string[]): Promise<void> {
    await Room.findOneAndUpdate(
      { id },
      {
        $set: {
          images,
        },
      },
      { new: true }
    );
  }
}

export { RoomRepository };
