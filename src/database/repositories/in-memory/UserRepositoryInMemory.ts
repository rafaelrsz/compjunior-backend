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
}

export { UserRepositoryInMemory };
