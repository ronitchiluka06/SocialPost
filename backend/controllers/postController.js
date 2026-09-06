const Post = require("../models/post");
const User = require("../models/user");


// CREATE POST
const createPost = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text?.trim() && !req.file) {
            return res.status(400).json({
                message: "Please enter text or select an image"
            });
        }

        const user = await User.findById(req.user);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const postData = {
            userId: user._id,
            username: user.username,
            text: text?.trim() || ""
        };

        // If image was uploaded
        if (req.file) {
            postData.image = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

        const post = await Post.create(postData);

        res.status(201).json({
            message: "Post created successfully",
            post
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create post",
            error: error.message
        });
    }
};



// GET ALL POSTS
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .select("-image.data")
            .populate("userId", "username")
            .populate("likes.userId", "username")
            .populate("comments.userId", "username")
            .sort({ createdAt: -1 });

        res.status(200).json(posts);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch posts"
        });
    }
};

// GET POST IMAGE
const getPostImage = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post || !post.image || !post.image.data) {
            return res.status(404).send("Image not found");
        }

        res.set("Content-Type", post.image.contentType);

        res.send(post.image.data);

    } catch (error) {
        console.error(error);

        res.status(500).send("Failed to load image");
    }
};


// LIKE / UNLIKE POST
const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const user = await User.findById(req.user);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check if user already liked
        const alreadyLiked = post.likes.some(
            like => like.userId.toString() === user._id.toString()
        );

        if (alreadyLiked) {

            // Unlike
            post.likes = post.likes.filter(
                like => like.userId.toString() !== user._id.toString()
            );

            await post.save();

            return res.status(200).json({
                message: "Post unliked",
                likes: post.likes.length
            });
        }

        // Like
        post.likes.push({
            userId: user._id,
            username: user.username
        });

        await post.save();

        res.status(200).json({
            message: "Post liked",
            likes: post.likes.length
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// COMMENT ON POST
const commentPost = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                message: "Comment text is required"
            });
        }

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const user = await User.findById(req.user);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        post.comments.push({
            userId: user._id,
            username: user.username,
            text: text.trim()
        });

        await post.save();

        const newComment =
            post.comments[post.comments.length - 1];

        res.status(201).json({
            message: "Comment added successfully",
            comment: newComment
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    createPost,
    getAllPosts,
    getPostImage,
    likePost,
    commentPost
};