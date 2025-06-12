import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaBookmark, FaStar } from "react-icons/fa";

const NovelTemplate = ({
  title,
  author,
  novelStatus,
  readingStatus,
  cover,
  description,
  category,
  tags = [],
  favorite = false,
  bookmarked = false,
}) => {
  const [isFavorited, setIsFavorited] = useState(favorite);
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);

  const formatReadingStatus = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "Finished Reading";
      case "reading":
        return "Currently Reading";
      case "planned":
      case "wishlist":
        return "Planned to Read";
      case "on hold":
        return "On Hold";
      case "dropped":
        return "Dropped";
      default:
        return status;
    }
  };

  return (
    <motion.div
      className="bg-card text-card-foreground shadow-lg rounded-xl overflow border border-border p-4 hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex gap-4">
        {cover ? (
          <img
            src={cover}
            alt={title}
            className="w-28 h-40 object-cover rounded-lg border"
          />
        ) : (
          <div className="w-28 h-40 bg-muted flex items-center justify-center rounded-lg">
            <FaBookOpen className="text-2xl text-muted-foreground" />
          </div>
        )}

        <div className="flex flex-col justify-between flex-grow">
          <div>
            <h2 className="text-lg font-bold mb-1">{title}</h2>
            <p className="text-sm text-muted-foreground mb-1">by {author}</p>
            <p className="text-xs mb-2 text-muted-foreground italic">
              {category}
            </p>
            <p className="text-sm mb-2 line-clamp-3">{description}</p>

            <div className="flex flex-wrap gap-2 text-xs mt-1">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-muted text-muted-foreground px-2 py-0.5 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm">
            <div className="flex flex-col gap-1">
              <span className="text-primary font-semibold capitalize">
                Status: {novelStatus}
              </span>
              <span className="text-muted-foreground capitalize">
                Reading Progress: {formatReadingStatus(readingStatus)}
              </span>
            </div>

            <div className="flex gap-3">
              <div className="relative">
                <button
                  onClick={() => setIsFavorited((prev) => !prev)}
                  className={`peer ${
                    isFavorited ? "text-yellow-500" : "hover:text-yellow-500"
                  }`}
                >
                  <FaStar />
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 rounded bg-black/60 text-white text-xs opacity-0 peer-hover:opacity-100 transition-opacity z-10">
                  {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={() => setIsBookmarked((prev) => !prev)}
                  className={`peer ${
                    isBookmarked ? "text-blue-500" : "hover:text-blue-500"
                  }`}
                >
                  <FaBookmark />
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 rounded bg-black/60 text-white text-xs opacity-0 peer-hover:opacity-100 transition-opacity z-10">
                  {isBookmarked ? "Remove Bookmark" : "Bookmark this"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NovelTemplate;
