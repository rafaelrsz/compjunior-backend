import dayjs from "dayjs";
import mongoose from "mongoose";

import { RentalRepositoryInMemory } from "../../../../database/repositories/in-memory/RentalRepositoryInMemory";
import { RoomRepositoryInMemory } from "../../../../database/repositories/in-memory/RoomRepositoryInMemory";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { CreateRoomUseCase } from "../../Room/createRoom/CreateRoomUseCase";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let roomRepositoryInMemory: RoomRepositoryInMemory;
let rentalRepositoryInMemory: RentalRepositoryInMemory;
let dateProvider: IDateProvider;
let createRentalUseCase: CreateRentalUseCase;
let createRoomUseCase: CreateRoomUseCase;

describe("Create Rental", () => {
  const dayAdd5Days = dayjs().add(5, "day").toDate();
  const dayAdd2Days = dayjs().add(2, "day").toDate();
  beforeEach(() => {
    roomRepositoryInMemory = new RoomRepositoryInMemory();
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dateProvider,
      roomRepositoryInMemory
    );
    createRoomUseCase = new CreateRoomUseCase(roomRepositoryInMemory);
  });

  afterEach(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  it("should be able to create a new rental", async () => {
    const room = await createRoomUseCase.execute({
      name: "quarto1",
      description: "description",
      location: "location",
      couplebed_amount: 2,
      singlebed_amount: 2,
      daily_price: 30,
    });

    const rental = await createRentalUseCase.execute({
      user_id: "idexample",
      room_id: room.id,
      expected_return_date: dayAdd5Days,
      start_date: dayAdd2Days,
    });

    expect(rental).toHaveProperty("_id");
  });

  it("should not be able to create a new rental if the room is not available", () => {
    expect(async () => {
      const room = await createRoomUseCase.execute({
        name: "quarto1",
        description: "description",
        location: "location",
        couplebed_amount: 2,
        singlebed_amount: 2,
        daily_price: 30,
      });

      await createRentalUseCase.execute({
        user_id: "idexample",
        room_id: room.id,
        expected_return_date: dayAdd5Days,
        start_date: dayAdd2Days,
      });

      await createRentalUseCase.execute({
        user_id: "exampleid",
        room_id: room.id,
        expected_return_date: dayAdd5Days,
        start_date: dayAdd2Days,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", () => {
    expect(async () => {
      const room = await createRoomUseCase.execute({
        name: "quarto1",
        description: "description",
        location: "location",
        couplebed_amount: 2,
        singlebed_amount: 2,
        daily_price: 30,
      });

      await createRentalUseCase.execute({
        user_id: "idexample",
        room_id: room.id,
        expected_return_date: dayAdd2Days,
        start_date: dayAdd5Days,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
