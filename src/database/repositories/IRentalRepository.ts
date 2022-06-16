import { IRental } from "../../app/schemas/Rental";

interface ICreateRentalDTO {
  user_id: string;
  room_id: string;
  start_date: Date;
  expected_return_date: Date;
  total: number;
}

interface IRentalsRepository {
  create({
    user_id,
    room_id,
    start_date,
    expected_return_date,
    total,
  }: ICreateRentalDTO): Promise<IRental>;
  findById(id: string): Promise<IRental>;
}

export { ICreateRentalDTO, IRentalsRepository };
