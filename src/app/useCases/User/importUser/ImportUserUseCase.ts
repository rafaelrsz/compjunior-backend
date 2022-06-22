import { hash } from "bcryptjs";
import { parse as csvParse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../../../database/repositories/IUserRepository";

interface IImportUser {
  name: string;
  password: string;
  email: string;
  admin: boolean;
}

@injectable()
class ImportUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  loadUsers(file: Express.Multer.File): Promise<IImportUser[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const users: IImportUser[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, password, email, admin] = line;
          users.push({
            name,
            password,
            email,
            admin,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(users);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const users = await this.loadUsers(file);

    users.map(async (user) => {
      const { name, password, email, admin } = user;

      const passwordHash = await hash(password, 8);

      const userExits = await this.usersRepository.findByEmail(email);

      if (!userExits) {
        await this.usersRepository.create({
          name,
          password: passwordHash,
          email,
          admin,
        });
      }
    });
  }
}

export { ImportUserUseCase };
