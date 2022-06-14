/* eslint-disable radix */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableRoomUseCase } from "./ListAvailableRoomUseCase";

class ListAvailableRoomController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { singlebed_amount, couplebed_amount } = request.query;

    const intsinglebed_amount = parseInt(singlebed_amount as string);
    const intcouplebed_amount = parseInt(couplebed_amount as string);

    const listAvailableRoomsUseCase = container.resolve(
      ListAvailableRoomUseCase
    );

    const availableRooms = await listAvailableRoomsUseCase.execute({
      singlebed_amount: intsinglebed_amount,
      couplebed_amount: intcouplebed_amount,
    });

    return response.json(availableRooms);
  }
}

export { ListAvailableRoomController };
