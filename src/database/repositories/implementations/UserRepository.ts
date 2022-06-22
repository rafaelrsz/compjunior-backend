import { IUser, User } from "../../../app/schemas/User";
import { ICreateUserDTO, IUsersRepository } from "../IUserRepository";

class UserRepository implements IUsersRepository {
  async create({
    name,
    email,
    password,
    avatar,
    id,
    admin,
  }: ICreateUserDTO): Promise<IUser> {
    const user = await User.create({
      name,
      email,
      password,
      avatar,
      id,
      admin,
    });

    return user;
  }

  async findByEmail(email: string): Promise<IUser> {
    const user = await User.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<IUser> {
    const user = await User.findById(id);

    return user;
  }

  async updateAvatar(id: string, avatar_file: string): Promise<void> {
    await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          avatar: avatar_file,
        },
      },
      { new: true }
    );
  }

  async deleteUser(id: string): Promise<void> {
    await User.findOneAndRemove({ _id: id });
  }

  async updatePassword(id: string, password: string): Promise<void> {
    await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          password,
        },
      },
      { new: true }
    );
  }
}

export { UserRepository };
