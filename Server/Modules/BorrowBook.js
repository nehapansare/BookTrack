import { model, Schema } from "mongoose";

const borrowBookSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
    dueDate: { type: Date, required: true },
    penalty: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const BorrowBook = model("BorrowedBook", borrowBookSchema);
export default BorrowBook;
