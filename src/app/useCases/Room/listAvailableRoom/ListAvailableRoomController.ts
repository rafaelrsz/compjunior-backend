/* eslint-disable radix */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableRoomUseCase } from "./ListAvailableRoomUseCase";

class ListAvailableRoomController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { singlebed_amount, couplebed_amount } = request.query;

    const intsinglebed_amount = singlebed_amount
      ? parseInt(singlebed_amount as string)
      : 0;
    const intcouplebed_amount = couplebed_amount
      ? parseInt(couplebed_amount as string)
      : 0;

    const listAvailableRoomsUseCase = container.resolve(
      ListAvailableRoomUseCase
    );

    const availableRooms = await listAvailableRoomsUseCase.execute({
      singlebed_amount: intsinglebed_amount,
      couplebed_amount: intcouplebed_amount,
    });

    return response.status(200).json(availableRooms);
  }
}

export { ListAvailableRoomController };
