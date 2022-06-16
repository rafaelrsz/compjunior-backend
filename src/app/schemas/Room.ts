import { mongoose } from "../../database";

interface IRoom {
  name: string;
  description: string;
  location: string;
  couplebed_amount: number;
  singlebed_amount: number;
  daily_price: number;
  images?: string[];
  available?: boolean;
  created_at?: Date;
  updated_at?: Date;
  id?: string;
}

const RoomSchema = new mongoose.Schema<IRoom>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    couplebed_amount: {
      type: Number,
      required: true,
    },
    singlebed_amount: {
      type: Number,
      required: true,
    },
    daily_price: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Room = mongoose.model("Rooms", RoomSchema);

export { Room, IRoom };
