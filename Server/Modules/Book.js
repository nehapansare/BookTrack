import { model, Schema } from "mongoose";

const bookSchema = new Schema({
  title: String,
  author: String,
  cover: String,
  language: String,
  rating: Number,
  year: Number,
  availableCopies: Number,
  totalCopies: Number,
  genres: [String] // <-- Added genres as an array of strings
}, { timestamps: true });

const Book = model("Book", bookSchema);
export default Book;
