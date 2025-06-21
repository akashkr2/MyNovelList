import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/api";
// import toast from "react-hot-toast";

const AddNovel = () => {
  const navigate = useNavigate();

  const [novelData, setNovelData] = useState({
    title: "",
    author: "",
    status: "ongoing",
    readingStatus: "reading",
    cover: "",
    description: "",
    tags: "",
    favorite: false,
    bookmarked: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNovelData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...novelData,
        tags: novelData.tags.split(",").map((t) => t.trim()), // comma-separated
      };

      const res = await axios.post("/api/novels", payload);
    //   toast.success("Novel added!");
      navigate("/"); // redirect to homepage
    } catch (err) {
      console.error(err);
    //   toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-6 text-primary">Add a New Novel</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={novelData.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={novelData.author}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Cover Image URL</label>
          <input
            type="url"
            name="cover"
            value={novelData.cover}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={novelData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows="4"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={novelData.tags}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Novel Status</label>
            <select
              name="status"
              value={novelData.status}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Reading Status</label>
            <select
              name="readingStatus"
              value={novelData.readingStatus}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="reading">Currently Reading</option>
              <option value="finished">Finished Reading</option>
              <option value="wishlist">Want to Read</option>
              <option value="on-hold">On-Hold</option>
              <option value="dropped">Dropped</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="label cursor-pointer gap-2">
            <input
              type="checkbox"
              name="favorite"
              checked={novelData.favorite}
              onChange={handleChange}
              className="checkbox"
            />
            <span className="label-text">Mark as Favorite</span>
          </label>

          <label className="label cursor-pointer gap-2">
            <input
              type="checkbox"
              name="bookmarked"
              checked={novelData.bookmarked}
              onChange={handleChange}
              className="checkbox"
            />
            <span className="label-text">Add to Bookmarks</span>
          </label>
        </div>

        <button
          type="submit"
          className="bg-primary text-primary-foreground px-6 py-2 rounded hover:bg-primary/90 transition"
        >
          Add Novel
        </button>
      </form>
    </div>
  );
};

export default AddNovel;
