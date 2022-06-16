import mongoose from "mongoose";

import { UserRepositoryInMemory } from "../../../../database/repositories/in-memory/UserRepositoryInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepository: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    usersRepository = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  afterEach(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  it("should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
      name: "testname",
      email: "test@email.com",
      password: "123",
    });

    expect(user).toHaveProperty("_id");
  });

  it("should not be able to create a user with the same email", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "testname",
        email: "test@email.com",
        password: "123",
      });

      await createUserUseCase.execute({
        name: "testname2",
        email: "test@email.com",
        password: "1233",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
