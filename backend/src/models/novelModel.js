import mongoose from "mongoose";

const novelSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      default: "Unknown",
    },
    category: {
      type: String,
      default: "Uncategorized",
    },
    description: {
      type: String,
    },
    cover: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    novelStatus: {
      type: String,
      enum: ["Ongoing", "Completed"],
      default: "Ongoing",
    },
    readingStatus: {
      type: String,
      enum: ["Reading", "Planned", "Finished", "On Hold", "Dropped"],
      default: "Planned",
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    isBookmarked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate bookId from title and author if not provided
novelSchema.pre("validate", function (next) {
  if (!this.bookId && this.title && this.author) {
    const formattedTitle = this.title.toLowerCase().replace(/\s+/g, "-").trim();
    const formattedAuthor = this.author
      .toLowerCase()
      .replace(/\s+/g, "-")
      .trim();
    this.bookId = `${formattedTitle}-${formattedAuthor}`;
  }
  next();
});

const Novel = mongoose.model("Novel", novelSchema);
export default Novel;
