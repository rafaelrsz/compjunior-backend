import { IRental, Rental } from "../../../app/schemas/Rental";
import { ICreateRentalDTO, IRentalsRepository } from "../IRentalRepository";

class RentalRepository implements IRentalsRepository {
  async create({
    user_id,
    room_id,
    start_date,
    expected_return_date,
    total,
  }: ICreateRentalDTO): Promise<IRental> {
    const rental = Rental.create({
      user_id,
      room_id,
      start_date,
      expected_return_date,
      total,
    });

    return rental;
  }

  async findById(id: string): Promise<IRental> {
    const rental = await Rental.findOne({ id });

    return rental;
  }
}

export { RentalRepository };
