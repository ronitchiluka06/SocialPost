import React, { useState } from "react";
import { Send } from "lucide-react";

import { commentPost } from "../services/api";

const CommentSection = ({
  post,
  onCommentAdded,
}) => {

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);


  const handleComment = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      return;
    }

    try {

      setLoading(true);

      const response = await commentPost(
        post._id,
        text.trim()
      );

      onCommentAdded(
        post._id,
        response.data.comment
      );

      setText("");

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="comments-section">

      <div className="comments-list">

        {post.comments?.length === 0 && (
          <p className="no-comments">
            No comments yet.
          </p>
        )}

        {post.comments?.map((comment, index) => (

          <div
            className="comment"
            key={comment._id || index}
          >

            <div className="comment-avatar">
              {comment.username?.charAt(0).toUpperCase()}
            </div>

            <div className="comment-content">

              <strong>
                {comment.username}
              </strong>

              <p>
                {comment.text}
              </p>

            </div>

          </div>

        ))}

      </div>


      <form
        className="comment-form"
        onSubmit={handleComment}
      >

        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
        >
          <Send size={19} />
        </button>

      </form>

    </div>
  );
};

export default CommentSection;