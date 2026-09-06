import React from "react";

const PostTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="post-tabs">

      <h2>Create Post</h2>

      <div className="tabs">

        <button
          className={activeTab === "all" ? "active-tab" : ""}
          onClick={() => setActiveTab("all")}
        >
          All Posts
        </button>

        <button
          className={activeTab === "promotions" ? "active-tab" : ""}
          onClick={() => setActiveTab("promotions")}
        >
          Promotions
        </button>

      </div>

    </div>
  );
};

export default PostTabs;