import { RoomRepositoryInMemory } from "../../../database/repositories/in-memory/RoomRepositoryInMemory";
import { AppError } from "../../../shared/errors/AppError";
import { CreateRoomUseCase } from "./CreateRoomUseCase";

let roomRepositoryInMemory: RoomRepositoryInMemory;
let createRoomUseCase: CreateRoomUseCase;

describe("Create Room", () => {
  beforeEach(() => {
    roomRepositoryInMemory = new RoomRepositoryInMemory();
    createRoomUseCase = new CreateRoomUseCase(roomRepositoryInMemory);
  });
  it("shoud be able to create a room", async () => {
    const room = await createRoomUseCase.execute({
      name: "quarto1",
      description: "description",
      location: "location",
      couplebed_amount: 2,
      singlebed_amount: 2,
      daily_price: 30,
    });

    expect(room).toHaveProperty("_id");
  });

  it("shoud not be able to create a room with same address", async () => {
    expect(async () => {
      await createRoomUseCase.execute({
        name: "quarto1",
        description: "description",
        location: "location",
        couplebed_amount: 2,
        singlebed_amount: 2,
        daily_price: 30,
      });

      await createRoomUseCase.execute({
        name: "quarto2",
        description: "description2",
        location: "location",
        couplebed_amount: 22,
        singlebed_amount: 22,
        daily_price: 302,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
