import { IUser } from "../../app/schemas/User";

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  id?: string;
  avatar?: string;
  admin?: boolean;
}

interface IUsersRepository {
  create({
    name,
    email,
    password,
    avatar,
    id,
    admin,
  }: ICreateUserDTO): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;
  findById(id: string): Promise<IUser>;
  updateAvatar(id: string, avatar_file: string): Promise<void>;
  deleteUser(id: string): Promise<void>;
  updatePassword(id: string, password: string): Promise<void>;
}

export { ICreateUserDTO, IUsersRepository };
