import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  User,
} from "lucide-react";

import { likePost } from "../services/api";
import CommentSection from "./CommentSection";

const PostCard = ({
  post,
  onPostUpdated,
}) => {

  const [showComments, setShowComments] = useState(false);
  const [liking, setLiking] = useState(false);


  const handleLike = async () => {

    if (liking) {
      return;
    }

    try {

      setLiking(true);

      const response = await likePost(post._id);

      const updatedPost = {
        ...post,
        likes:
          response.data.likes === 0
            ? []
            : [
                ...(post.likes || []),
                {
                  userId: localStorage.getItem("userId"),
                },
              ],
      };

      /*
        Instead of trying to guess the complete likes array,
        refresh the posts from backend through the parent.
      */

      onPostUpdated();

    } catch (error) {

      console.log(error);

    } finally {

      setLiking(false);

    }
  };


  const handleCommentAdded = (
    postId,
    newComment
  ) => {

    onPostUpdated();
  };


  return (
    <article className="post-card">

      {/* POST HEADER */}

      <div className="post-header">

        <div className="user-info">

          <div className="post-avatar">
            <User size={28} />
          </div>

          <div>

            <div className="username-row">

              <h3>
                {post.username}
              </h3>

            </div>

            <p>
              @{post.username}
            </p>

            <small>
              {new Date(post.createdAt).toLocaleString()}
            </small>

          </div>

        </div>


        <button className="more-button">
          <MoreHorizontal size={24} />
        </button>

      </div>


      {/* POST TEXT */}

      {post.text && (
        <div className="post-content">

          <p>
            {post.text}
          </p>

        </div>
      )}


      {/* POST IMAGE */}

      {post.image && (
        <div className="post-image-container">

           <img
            src={`http://localhost:5000/api/posts/${post._id}/image`}
            alt="Post"
            className="post-image"
            />

        </div>
      )}


      {/* ACTIONS */}

      <div className="post-actions">

        <button
          onClick={handleLike}
          disabled={liking}
        >

          <Heart size={23} />

          <span>
            {post.likes?.length || 0}
          </span>

        </button>


        <button
          onClick={() =>
            setShowComments(!showComments)
          }
        >

          <MessageCircle size={23} />

          <span>
            {post.comments?.length || 0}
          </span>

        </button>

      </div>


      {/* COMMENTS */}

      {showComments && (
        <CommentSection
          post={post}
          onCommentAdded={handleCommentAdded}
        />
      )}

    </article>
  );
};

export default PostCard;