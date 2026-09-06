const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../config/multer");

const {
    createPost,
    getAllPosts,
    getPostImage,
    likePost,
    commentPost
} = require("../controllers/postController");


// CREATE POST
router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    createPost
);


// GET ALL POSTS
router.get("/", getAllPosts);

router.get("/:id/image", getPostImage);

// LIKE / UNLIKE POST
router.post("/:id/like", authMiddleware, likePost);


// COMMENT ON POST
router.post("/:id/comment", authMiddleware, commentPost);


module.exports = router;