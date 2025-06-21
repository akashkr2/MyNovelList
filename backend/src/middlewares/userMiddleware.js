import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/covers/");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname.split(" ").join("_");
    cb(null, unique);
  },
});

export const uploadLocal = multer({ storage });

