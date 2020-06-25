const express = require("express");
const router = express.Router();
const sharp = require("sharp");
//
const blog = require("../database/model/blog");
//middle wares
const auth = require("../middlewares/auth");
const upauth = require("../middlewares/image");

router.get("/blog", (req, res) => {
  // if (!(req.cookies.user && req.cookies['coo-key'])) return res.render("404");
  res.render("blog");
});

router.post(
  "/blog",
  upauth.single("upload"),
  auth,
  async (req, res) => {
    try {
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 500, height: 300 })
        .png()
        .toBuffer();

      const post = await blog({
        heading: req.body.heading,
        description: req.body.description,
        pic: buffer,
        owner: req.user._id,
      });
      post.save();
      res.send(post);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
