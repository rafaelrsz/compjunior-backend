import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { IRoomsRepository } from "../../../database/repositories/IRoomRepository";
import { IRoom } from "../../schemas/rooms";

interface IRequest {
  couplebed_amount?: number;
  singlebed_amount?: number;
}

@injectable()
class ListAvailableRoomUseCase {
  constructor(
    @inject("RoomsRepository")
    private roomsRepository: IRoomsRepository
  ) {}

  async execute({
    couplebed_amount,
    singlebed_amount,
  }: IRequest): Promise<IRoom[]> {
    const rooms = await this.roomsRepository.findAvailable(
      couplebed_amount,
      singlebed_amount
    );

    return rooms;
  }
}

export { ListAvailableRoomUseCase };
