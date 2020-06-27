const express = require("express");
const router = express.Router();
const sharp = require("sharp");
//blog model
const blog = require("../database/model/blog");
//middlewares
const auth = require("../middlewares/auth");
const upauth = require("../middlewares/image");

router.get("/blogs", (req, res) => {
  if (!(req.cookies.user && req.cookies["coo-key"])) return res.render("404");
  res.render("blog");
});

router.get("/blogs/post", (req, res) => {
  if (!(req.cookies.user && req.cookies["coo-key"])) return res.render("404");
  res.render("post");
});

//get all blog  , this is the route for pagination
router.get("/blog", auth, async (req, res) => {
  try {
    // await req.user.populate("allblogs").execPopulate();
    // res.status(200).send(req.user.allblogs);
    const blogs = await blog.find()
    res.send(blogs)
  } catch (error) {
    res.status(404).send(error);
  }
});

//get blog by id
router.get("/blog/:id", auth, async (req, res) => {
  try {
    const post = await blog.findById(req.params.id);
    res.send(post);
  } catch (error) {
    res.status(404).send(error);
  }
});

//get image by id
router.get("/blog/image/:id", async (req, res) => {
  try {
    let img = await blog.findById(req.params.id);
    if (!img || !img.pic) {
      throw new Error();
    }
    img = img.pic;
    res.set("Content-Type", "image/png");
    res.send(img);
  } catch (error) {
    res.status(404).send(error);
  }
});

//adding post
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
        postowner : req.user.name,
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
