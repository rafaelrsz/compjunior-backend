import { IRoom, Room } from "../../app/schemas/rooms";

interface ICreateRoomDTO {
  name: string;
  description: string;
  location: string;
  couplebed_amount: number;
  singlebed_amount: number;
  daily_price: number;
}

interface IRoomsRepository {
  create({
    name,
    description,
    couplebed_amount,
    singlebed_amount,
    daily_price,
    location,
  }: ICreateRoomDTO): Promise<IRoom>;
  findByLocation(location: string): Promise<IRoom>;
  findAvailable(
    couplebed_amount?: number,
    singlebed_amount?: number
  ): Promise<IRoom[]>;
}

export { ICreateRoomDTO, IRoomsRepository };
