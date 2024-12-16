const multer = require("multer");
const path = require("path");

// Define storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to "uploads" directory
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Define file filter
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "resume") {
    // Allow only PDFs for resumes
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed for resumes!"), false);
    }
  } else if (file.fieldname === "profilePicture") {
    // Allow only images for profile pictures
    if (["image/jpeg", "image/png"].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG or PNG images are allowed for profile pictures!"), false);
    }
  } else {
    cb(new Error("Unexpected field!"), false);
  }
};

// Define upload middleware
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB size limit
});

module.exports = upload;
