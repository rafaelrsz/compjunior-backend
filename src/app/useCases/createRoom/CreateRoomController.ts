import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRoomUseCase } from "./CreateRoomUseCase";

class CreateRoomController {
  opa(request: Request, response: Response): Response {
    return response.send();
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const createRoomUseCase = container.resolve(CreateRoomUseCase);
    const {
      name,
      description,
      couplebed_amount,
      singlebed_amount,
      daily_price,
      location,
    } = request.body;

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
