import { model, Schema } from "mongoose";

const studentSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    borrowedBooks: [{ type: Schema.Types.ObjectId, ref: "BorrowedBook" }],
    penaltyAmount: { type: Number, default: 0 },
    role: { type: String, default: "student" } 
  },
  { timestamps: true }
);

const Student = model("Student", studentSchema);
export default Student;
