import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { IRentalsRepository } from "../../../../database/repositories/IRentalRepository";
import { IRoomsRepository } from "../../../../database/repositories/IRoomRepository";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IRental } from "../../../schemas/Rental";

interface IRequest {
  user_id: string;
  room_id: string;
  start_date: Date;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("RoomsRepository")
    private roomsRepository: IRoomsRepository
  ) {}

  async execute({
    user_id,
    room_id,
    start_date,
    expected_return_date,
  }: IRequest): Promise<IRental> {
    const room = await this.roomsRepository.findById(room_id);

    if (!room.available) {
      throw new AppError("Room is not available!");
    }

    const compare = this.dateProvider.compareInDays(
      start_date,
      expected_return_date
    );

    if (expected_return_date < start_date) {
      throw new AppError("Invalid return time!");
    }

    const total = compare * room.daily_price;

    const rental = await this.rentalsRepository.create({
      user_id,
      room_id,
      start_date,
      expected_return_date,
      total,
    });

    await this.roomsRepository.updateAvailable(room_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
