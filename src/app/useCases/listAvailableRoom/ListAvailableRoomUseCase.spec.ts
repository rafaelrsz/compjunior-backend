import { RoomRepositoryInMemory } from "../../../database/repositories/in-memory/RoomRepositoryInMemory";
import { ListAvailableRoomUseCase } from "./ListAvailableRoomUseCase";

let roomsRepository: RoomRepositoryInMemory;
let listAvailableRoomUseCase: ListAvailableRoomUseCase;

describe("List Available Rooms", () => {
  beforeEach(() => {
    roomsRepository = new RoomRepositoryInMemory();
    listAvailableRoomUseCase = new ListAvailableRoomUseCase(roomsRepository);
  });

  it("shoud be able to list all available rooms", async () => {
    const room = await roomsRepository.create({
      name: "quarto1",
      description: "description",
      location: "location",
      couplebed_amount: 1,
      singlebed_amount: 1,
      daily_price: 1,
    });

    const rooms = await listAvailableRoomUseCase.execute({});

    expect(rooms).toEqual([room]);
  });

  it("shoud be able to list all available rooms by couple bed amount", async () => {
    const room = await roomsRepository.create({
      name: "quarto2",
      description: "description2",
      location: "location2",
      couplebed_amount: 2,
      singlebed_amount: 2,
      daily_price: 2,
    });

    const rooms = await listAvailableRoomUseCase.execute({
      couplebed_amount: 2,
    });

    expect(rooms).toEqual([room]);
  });

  it("shoud be able to list all available rooms by single bed amount", async () => {
    const room = await roomsRepository.create({
      name: "quarto3",
      description: "description3",
      location: "location3",
      couplebed_amount: 0,
      singlebed_amount: 3,
      daily_price: 3,
    });

    const rooms = await listAvailableRoomUseCase.execute({
      singlebed_amount: 3,
    });

    expect(rooms).toEqual([room]);
  });
});
