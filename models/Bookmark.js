import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  author_id: String,
  guild_id: String,
  url: String,
  desc: String,
  category: String,
});
const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
export { Bookmark };
