import cloudinary from '../Configs/cloudinary.js';
    import streamifier from "streamifier"



const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file provided' });
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'image' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed', details: error.message });
  }
};

export default uploadImage