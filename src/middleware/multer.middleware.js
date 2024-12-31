import multer from "multer";
import path from "path";
import fs from "fs";

// Resolve directory path for file storage
const __dirname = path.resolve(); // Get the current working directory

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the path for storing images
    const uploadPath = path.join(__dirname, "public/images");
    
    // Ensure the directory exists or create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath); // Set the destination directory
  },
  filename: (req, file, cb) => {
    const uniqueFilename = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueFilename);

    const filepath = path.join(__dirname, "public/images", uniqueFilename); // Full path for the stored file

    console.log("--> Filepath:", filepath);

    try {
      // Check if the file exists and delete it if necessary
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
        console.log("File deleted successfully!");
      }
    } catch (err) {
      console.error("An error occurred during file deletion:", err);
    }
  },
});

// Export Multer instance
export const upload = multer({ storage });
