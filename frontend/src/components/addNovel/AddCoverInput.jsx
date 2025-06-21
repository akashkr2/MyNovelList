import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";

const AddCoverInput = ({ novelData, setNovelData }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show image preview
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);

    setNovelData((prev) => ({
      ...prev,
      cover: file, // used for uploading later
    }));
  };

  return (
    <div className="relative w-32 h-48 bg-muted border rounded-lg overflow-hidden">
      {imagePreview ? (
        <img
          src={imagePreview}
          alt="cover"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
          No Cover Selected
        </div>
      )}

      <label className="absolute bottom-1 right-1 bg-black/60 hover:bg-black/80 text-white p-1 rounded-full cursor-pointer">
        <FaCamera />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default AddCoverInput;
