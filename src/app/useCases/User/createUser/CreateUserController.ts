import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password, email } = request.body;

    // eslint-disable-next-line prefer-const
    let avatar_file = null;

    if (request.file) {
      avatar_file = request.file.filename;
    }

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({ name, password, email, avatar_file });

    return response.status(201).send();
  }
}

export { CreateUserController };
