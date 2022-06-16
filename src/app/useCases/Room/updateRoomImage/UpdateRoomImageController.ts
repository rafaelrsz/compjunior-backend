import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateRoomImageUseCase } from "./UpdateRoomImageUseCase";

class UpdateRoomImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    const myfiles = JSON.parse(JSON.stringify(request.files));

    const images = [];

    myfiles.forEach((image) => {
      images.push(image.filename);
    });

    const updateRoomImageUseCase = container.resolve(UpdateRoomImageUseCase);

    await updateRoomImageUseCase.execute({ room_id: id as string, images });

    return response.status(204).send();
  }
}

export { UpdateRoomImageController };
