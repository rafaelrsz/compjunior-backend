import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../../../database/repositories/IUserRepository";
import { deleteFile } from "../../../../utils/file";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    await this.usersRepository.updateAvatar(user_id, avatar_file);
  }
}

export { UpdateUserAvatarUseCase };
