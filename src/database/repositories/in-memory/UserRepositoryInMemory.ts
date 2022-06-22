import { IUser, User } from "../../../app/schemas/User";
import { ICreateUserDTO, IUsersRepository } from "../IUserRepository";

class UserRepositoryInMemory implements IUsersRepository {
  users: IUser[] = [];
  async create({ name, email, password }: ICreateUserDTO): Promise<IUser> {
    const user = new User({ name, email, password });

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<IUser> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<IUser> {
    return this.users.find((user) => user.id === id);
  }

  async updateAvatar(id: string, avatar_file: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async deleteUser(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async updatePassword(id: string, password: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { UserRepositoryInMemory };
