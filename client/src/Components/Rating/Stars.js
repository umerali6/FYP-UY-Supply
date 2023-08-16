import React from "react";

const Star = ({ selected = false, onClick = f => f }) => (
  <div className={selected ? "star selected" : "star"} onClick={onClick} />
);

const StarRating = ({ totalStars, starsSelected = 0, onRate = f => f }) => (
  <div className="star-rating">
    {[...Array(totalStars)].map((n, i) => (
      <Star
        key={i}
        selected={i < starsSelected}
        onClick={() => onRate(i + 1)}
      />
    ))}
    <p>
      {starsSelected} of {totalStars} stars
    </p>
  </div>
);

export default StarRating;
