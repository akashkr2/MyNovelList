import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaCamera, FaBookmark, FaStar } from "react-icons/fa";
// import toast from "react-hot-toast";
import axios from "../config/api";
import AddCoverInput from "../components/addNovel/AddCoverInput";

const AddNovelCard = () => {
  const [novelData, setNovelData] = useState({
    title: "",
    author: "",
    novelStatus: "ongoing",
    readingStatus: "reading",
    cover: "",
    description: "",
    category: "",
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovelData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (field) => {
    setNovelData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...novel,
        tags: novelData.tags.split(",").map((t) => t.trim()),
      };
      await axios.post("/api/addNovel", payload);
      //   toast.success("Novel added successfully!");
    } catch (err) {
      console.error(err);
      //   toast.error("Error adding novel");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <motion.div
        className="bg-card text-card-foreground shadow-lg rounded-xl overflow border border-border p-6 hover:shadow-xl transition-all duration-300 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex gap-6">
          {/* <div className="w-32 h-48 bg-muted flex items-center justify-center rounded-lg relative border">
            {novelData.cover ? (
              <img
                src={novelData.cover}
                alt="cover"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <label className="cursor-pointer text-muted-foreground flex flex-col items-center text-center gap-2">
                <FaCamera className="text-2xl" />
                <span className="text-xs">Add Cover URL</span>
                <input
                  type="text"
                  name="cover"
                  value={novelData.cover}
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            )}
          </div> */}

          <AddCoverInput novelData={novelData} setNovelData={setNovelData} />

          <div className="flex flex-col justify-between flex-grow gap-4">
            <div>
              <input
                type="text"
                name="title"
                value={novelData.title}
                onChange={handleChange}
                placeholder="Novel Title"
                className="input input-bordered w-full mb-2 text-lg font-bold"
                required
              />
              <input
                type="text"
                name="author"
                value={novelData.author}
                onChange={handleChange}
                placeholder="Author Name"
                className="input input-bordered w-full mb-2 text-sm"
              />
              <input
                type="text"
                name="category"
                value={novelData.category}
                onChange={handleChange}
                placeholder="Category"
                className="input input-bordered w-full mb-2 text-xs italic"
              />
              <textarea
                name="description"
                value={novelData.description}
                onChange={handleChange}
                placeholder="Description..."
                rows={3}
                className="textarea textarea-bordered w-full text-sm"
              />
              <input
                type="text"
                name="tags"
                value={novelData.tags}
                onChange={handleChange}
                placeholder="Tags (comma-separated)"
                className="input input-bordered w-full mt-2 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Novel Status
                </label>
                <select
                  name="novelStatus"
                  value={novelData.novelStatus}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Reading Status
                </label>
                <select
                  name="readingStatus"
                  value={novelData.readingStatus}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="reading">Currently Reading</option>
                  <option value="finished">Finished Reading</option>
                  <option value="wishlist">Planned to Read</option>
                  <option value="on hold">On Hold</option>
                  <option value="dropped">Dropped</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 bg-primary text-primary-foreground py-2 rounded hover:bg-primary/90 transition"
            >
              Add Novel
            </button>
          </div>
        </div>
      </motion.div>
    </form>
  );
};

export default AddNovelCard;
