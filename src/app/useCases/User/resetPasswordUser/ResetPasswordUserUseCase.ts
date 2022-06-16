import { hash } from "bcrypt";
import { verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../../../database/repositories/IUserRepository";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest {
  token: string;
  password: string;
}

interface IPayload {
  sub: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ token, password }: IRequest): Promise<void> {
    try {
      const { sub: user_id } = verify(
        token,
        "86a270a74dd36082d129dbc67da00c36"
      ) as IPayload;

      const user = await this.usersRepository.findById(user_id);

      if (!user) {
        throw new AppError("User does not exists!", 401);
      }

      user.password = await hash(password, 8);

      await this.usersRepository.updatePassword(user_id, user.password);
    } catch {
      throw new AppError("Invalid token!", 401);
    }
  }
}

export { ResetPasswordUserUseCase };
