import { inject, injectable } from "tsyringe";

import { IRoomsRepository } from "../../database/repositories/IRoomRepository";
import { IRoom } from "../schemas/rooms";

interface IRequest {
  name: string;
  description: string;
  couplebed_amount: number;
  singlebed_amount: number;
  daily_price: number;
  location: string;
}

@injectable()
class CreateRoomUseCase {
  constructor(
    @inject("RoomsRepository")
    private roomsRepository: IRoomsRepository
  ) {}

  async execute({
    name,
    description,
    couplebed_amount,
    singlebed_amount,
    daily_price,
    location,
  }: IRequest): Promise<IRoom> {
    const room = await this.roomsRepository.create({
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

export { CreateRoomUseCase };
