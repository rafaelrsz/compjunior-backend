import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRoomUseCase } from "./CreateRoomUseCase";

class CreateRoomController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      couplebed_amount,
      singlebed_amount,
      daily_price,
      location,
    } = request.body;

    const createRoomUseCase = container.resolve(CreateRoomUseCase);

    const room = await createRoomUseCase.execute({
      name,
      description,
      couplebed_amount,
      singlebed_amount,
      daily_price,
      location,
    });

    return response.status(201).json(room);
  }
}

export { CreateRoomController };
