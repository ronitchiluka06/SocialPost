import React from "react";

const FeedFilters = ({
  activeFilter,
  setActiveFilter,
}) => {

  const filters = [
    {
      id: "all",
      label: "All Posts",
    },
    {
      id: "liked",
      label: "Most Liked",
    },
    {
      id: "commented",
      label: "Most Commented",
    },
  ];

  return (
    <div className="feed-filters">

      {filters.map((filter) => (

        <button
          key={filter.id}
          className={
            activeFilter === filter.id
              ? "filter active"
              : "filter"
          }
          onClick={() => setActiveFilter(filter.id)}
        >
          {filter.label}
        </button>

      ))}

    </div>
  );
};

export default FeedFilters;