import mongoose from "mongoose";

interface IRental {
  room_id: string;
  user_id: string;
  start_date: Date;
  expected_return_date: Date;
  total?: number;
  created_at?: Date;
  updated_at?: Date;
  id?: string;
}

const RentalSchema = new mongoose.Schema<IRental>(
  {
    room_id: {
      type: String,
      ref: "Rooms",
    },
    user_id: {
      type: String,
      ref: "Users",
    },
    start_date: {
      type: Date,
      required: true,
    },
    expected_return_date: {
      type: Date,
      required: true,
    },
    total: {
      type: Number,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Rental = mongoose.model("Rentals", RentalSchema);

export { Rental, IRental };
