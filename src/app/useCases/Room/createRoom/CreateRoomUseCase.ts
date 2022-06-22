import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { IRoomsRepository } from "../../../../database/repositories/IRoomRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { IRoom } from "../../../schemas/Room";

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
    const userAlredyExists = await this.roomsRepository.findByLocation(
      location
    );

    if (userAlredyExists) {
      throw new AppError("This room alredy exists", 409);
    }
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
