import { IRental, Rental } from "../../../app/schemas/Rental";
import { ICreateRentalDTO, IRentalsRepository } from "../IRentalRepository";

class RentalRepositoryInMemory implements IRentalsRepository {
  async create({
    user_id,
    room_id,
    start_date,
    expected_return_date,
    total,
  }: ICreateRentalDTO): Promise<IRental> {
    const rental = new Rental({
      user_id,
      room_id,
      start_date,
      expected_return_date,
      total,
    });

    return rental;
  }
}

export { RentalRepositoryInMemory };
