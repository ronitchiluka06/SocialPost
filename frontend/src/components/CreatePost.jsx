import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import {
    Camera,
    Smile,
    Image as ImageIcon,
    Send,
} from "lucide-react";

import { createPost } from "../services/api";

const CreatePost = ({ onPostCreated }) => {
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiClick = (emojiData) => {
        setText((prev) => prev + emojiData.emoji);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        // At least text or image is required
        if (!text.trim() && !image) {
            setError("Please enter text or select an image.");
            return;
        }

        try {
            setLoading(true);

            // Create FormData
            const formData = new FormData();

            formData.append("text", text.trim());

            if (image) {
                formData.append("image", image);
            }

            const response = await createPost(formData);

            // Send new post to Social page
            onPostCreated(response.data.post);

            // Clear form
            setText("");
            setImage(null);

            // Reset file input
            document.getElementById("post-image-input").value = "";


        } catch (error) {
            console.log(error);

            setError(
                error.response?.data?.message ||
                "Failed to create post"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="create-post-card">

            <form onSubmit={handleSubmit}>

                <div className="create-post-content">

                    <textarea
                        placeholder="What's on your mind?"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                </div>

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                <div className="image-input">

                    <ImageIcon size={20} />

                    <input
                        id="post-image-input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            setImage(e.target.files[0]);
                        }}
                    />

                </div>

                {/* Selected image name */}
                {image && (
                    <p>
                        Selected: {image.name}
                    </p>
                )}

                <div className="post-tools">

                    <div className="tool-icons">

                        <button
                            type="button"
                            onClick={() =>
                                document.getElementById("post-image-input").click()
                            }
                        >
                            <Camera size={25} />
                        </button>

                        <div className="emoji-container">

                            <button
                                type="button"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            >
                                <Smile size={25} />
                            </button>

                            {showEmojiPicker && (
                                <div className="emoji-picker">
                                    <EmojiPicker
                                        onEmojiClick={handleEmojiClick}
                                    />
                                </div>
                            )}

                        </div>

                    </div>

                    <button
                        type="submit"
                        className="post-button"
                        disabled={loading}
                    >
                        <Send size={20} />

                        {loading ? "Posting..." : "Post"}
                    </button>

                </div>

            </form>

        </section>
    );
};

export default CreatePost;

