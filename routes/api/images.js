const router = require("express").Router();
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
const { GridFsStorage } = require('multer-gridfs-storage');
const imagesController = require("../../controllers/imagesController");

const mongoURI = process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/chefskiss";

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    console.log(file);
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        console.log(filename);
        const fileInfo = {
          filename: filename,
          originalname: file.originalname,
          metadata: "test",
          bucketName: 'files'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

// Matches with "/api/images/"
router.route("/")
  .get(imagesController.findAll)
  // .post(upload.single('image'), imagesController.upload);
  .post(upload.array('images'), imagesController.upload);
  // 'images' must match the name of the file in the FormData object -> formData.append('image', image);

// Matches with "/api/images/:id"
router.route("/:filename")
  .get(imagesController.findById)
  .delete(imagesController.remove);

module.exports = router;