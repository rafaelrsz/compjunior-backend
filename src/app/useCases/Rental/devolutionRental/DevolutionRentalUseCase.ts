import { inject, injectable } from "tsyringe";

import { IRentalsRepository } from "../../../../database/repositories/IRentalRepository";
import { IRoomsRepository } from "../../../../database/repositories/IRoomRepository";
import { IRental } from "../../../schemas/Rental";

interface IRequest {
  id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RoomsRepository")
    private roomsRepository: IRoomsRepository,
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute({ id }: IRequest): Promise<IRental> {
    const rental = await this.rentalsRepository.findById(id);

    await this.roomsRepository.updateAvailable(rental.room_id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
