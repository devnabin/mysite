const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 1000000, //limits file size in bytes , 1kb = 1024 byte and 1mb = 1024kb
  },

  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new Error("Please upload an image with jpg , jpeg or in png Format !")
      );
    }
    cb(undefined, true);
  },
});

module.exports = upload;
