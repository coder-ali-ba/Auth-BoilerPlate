import multer from "multer";

const storage = multer.memoryStorage(); // temporary in-memory storage
const upload = multer({ storage });

export default upload