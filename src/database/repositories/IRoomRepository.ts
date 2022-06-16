import { IRoom } from "../../app/schemas/Room";

interface ICreateRoomDTO {
  name: string;
  description: string;
  location: string;
  couplebed_amount: number;
  singlebed_amount: number;
  daily_price: number;
  images?: string[];
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
  findById(id: string): Promise<IRoom>;
  updateAvailable(id: string, available: boolean): Promise<void>;
  updateRoomImages(id: string, images: string[]): Promise<void>;
}

export { ICreateRoomDTO, IRoomsRepository };
