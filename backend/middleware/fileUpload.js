const multer = require('multer');
const { v1: uuidv1 } = require('uuid');
const path = require('path');

// Define supported image mime types
const IMAGE_MIME_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];

const fileUpload = multer({
  limits: {
    fileSize: 50000000, // 50MB limit
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'backend/uploads/images');
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, uuidv1() + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (IMAGE_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const error = new Error('Invalid file type! Only image and PDF files are allowed.');
      error.status = 400;
      cb(error);
    }
  },
});

module.exports = fileUpload;
