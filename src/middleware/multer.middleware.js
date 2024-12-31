import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Use an absolute path to the public/images directory
      cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
      // Set a unique filename based on current timestamp
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  // Initialize multer with storage configuration
export const upload = multer({ storage });
