import { inject, injectable } from "tsyringe";

import { IRoomsRepository } from "../../../../database/repositories/IRoomRepository";
import { deleteFile } from "../../../../utils/file";

interface IRequest {
  room_id: string;
  images: string[];
}

@injectable()
class UpdateRoomImageUseCase {
  constructor(
    @inject("RoomsRepository")
    private roomsRepository: IRoomsRepository
  ) {}

  async execute({ room_id, images }: IRequest): Promise<void> {
    await this.roomsRepository.updateRoomImages(room_id, images);
  }
}

export { UpdateRoomImageUseCase };
