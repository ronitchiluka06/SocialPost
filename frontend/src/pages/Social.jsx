import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import CreatePost from "../components/CreatePost";
import PostTabs from "../components/PostTabs";
import FeedFilters from "../components/FeedFilters";
import PostCard from "../components/PostCard";
import BottomNav from "../components/BottomNav";

import { getPosts } from "../services/api";

const Social = () => {

  const [posts, setPosts] = useState([]);

  const [search, setSearch] = useState("");

  const [activeTab, setActiveTab] = useState("all");

  const [activeFilter, setActiveFilter] =
    useState("all");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // GET POSTS

  const fetchPosts = async () => {

    try {

      setLoading(true);

      const response = await getPosts();

      setPosts(response.data);

      setError("");

    } catch (error) {

      console.log(error);

      setError("Failed to load posts.");

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchPosts();

  }, []);


  // NEW POST CREATED

  const handlePostCreated = (newPost) => {

    setPosts((previousPosts) => [
      newPost,
      ...previousPosts,
    ]);

  };


  // SEARCH

  const filteredPosts = posts.filter((post) => {

    const searchText = search.toLowerCase();

    return (
      post.username
        ?.toLowerCase()
        .includes(searchText) ||

      post.text
        ?.toLowerCase()
        .includes(searchText)
    );

  });


  // FILTERS

  let displayedPosts = [...filteredPosts];


  if (activeFilter === "liked") {

    displayedPosts.sort(
      (a, b) =>
        (b.likes?.length || 0) -
        (a.likes?.length || 0)
    );

  }


  if (activeFilter === "commented") {

    displayedPosts.sort(
      (a, b) =>
        (b.comments?.length || 0) -
        (a.comments?.length || 0)
    );

  }


  return (
    <div className="social-page">

      <Navbar />


      <SearchBar
        search={search}
        setSearch={setSearch}
      />


      <PostTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />


      <CreatePost
        onPostCreated={handlePostCreated}
      />


      <FeedFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />


      <main className="feed">

        {loading && (
          <div className="loading">
            Loading posts...
          </div>
        )}


        {error && (
          <div className="error-message">
            {error}
          </div>
        )}


        {!loading &&
          !error &&
          displayedPosts.length === 0 && (

            <div className="empty-feed">

              <h3>
                No posts yet
              </h3>

              <p>
                Be the first person to create a post!
              </p>

            </div>

          )}


        {!loading &&
          displayedPosts.map((post) => (

            <PostCard
              key={post._id}
              post={post}
              onPostUpdated={fetchPosts}
            />

          ))}

      </main>


      <BottomNav />

    </div>
  );
};

export default Social;