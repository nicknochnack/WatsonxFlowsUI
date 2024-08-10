import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

const SwipeableCards = ({ docs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentIndex((prev) => Math.min(prev + 1, docs.length - 1)),
    onSwipedRight: () => setCurrentIndex((prev) => Math.max(prev - 1, 0)),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    console.log(docs);
  }, []);

  return (
    <div className="swipeable-cards-wrapper">
      <div className="swipeable-cards-container" {...handlers}>
        {docs.map((doc, index) => (
          <div
            key={index}
            className={`swipeable-card ${
              index === currentIndex ? "active" : ""
            }`}
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
              opacity: index === currentIndex ? 1 : 0,
              transition: "all 0.3s ease",
            }}
          >
            <h3 className="text-lg font-semibold mb-2">
              Document ID: {doc.id}
            </h3>
            <p className="text-sm text-gray-600">{doc.text}</p>
            <p className="distance-sub-text">Distance: {doc.distance}</p>
          </div>
        ))}
      </div>
      <div className="card-indicator">
        {docs.map((_, index) => (
          <span
            key={index}
            className={`indicator-dot ${
              index === currentIndex ? "active" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SwipeableCards;
