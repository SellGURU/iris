/* eslint-disable react/prop-types */
import  { useRef, useState, useEffect } from "react";
import "./index.css"; // Add your custom styles

const HorizontalSlider = ({ children }) => {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  useEffect(() => {
    updateScrollButtons();
    const handleResize = () => updateScrollButtons();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth / 2;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="horizontal-slider ">
      {canScrollLeft && (
        <button
          className="slider-button left"
          onClick={() => scroll("left")}
          aria-label="Scroll Left"
        >
          &lt;
        </button>
      )}
      <div
        className="slider-container flex flex-row w-full overflow-y-scroll hiddenScrollBar items-center mt-4 justify-between gap-3  py-3 px-4"
        ref={containerRef}
        onScroll={updateScrollButtons}
      >
        {children}
      </div>
      {canScrollRight && (
        <button
          className="slider-button right"
          onClick={() => scroll("right")}
          aria-label="Scroll Right"
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default HorizontalSlider;