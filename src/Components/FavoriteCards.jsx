/**
 * React component for displaying and managing a carousel of favorite cards.
 * @component
 */
import { useState } from 'react';
import "./Components.css/FavoriteCards.css";

/**
 * Functional component for managing a carousel of favorite cards.
 * @returns {JSX.Element} JSX representation of the component.
 */
export default function FavoriteCards() {
  // State to manage the list of favorite cards
  const [slides, setSlides] = useState(["Favorite 1"]);

  /**
   * Adds a new favorite card to the carousel.
   */
  const addSlide = () => {
    const newSlide = `Favorite ${slides.length + 1}`;
    setSlides([...slides, newSlide]);
  };

  /**
   * Removes the last favorite card from the carousel if there is more than one.
   */
  const removeSlide = () => {
    if (slides.length > 1) {
      const newSlides = [...slides];
      newSlides.pop();
      setSlides(newSlides);
    }
  };

  return (
    <div className="dynamic-carousel">
      {/* React component for the carousel */}
      <sl-carousel
        mouse-dragging
        infinite
        navigation
        pagination
        slides-per-page="3"
        slides-per-move="2"
      >
        {slides.map((slide, index) => (
          <sl-carousel-item key={index}>
            <div style={{ backgroundColor: '#19ac76' }}>
              {slide}
            </div>
          </sl-carousel-item>
        ))}
      </sl-carousel>

      <div className="carousel-options">
        {/* Button to add a new slide */}
        <button className="dynamic-add" onClick={addSlide}>
          Add slide
        </button>
        <br />
        {/* Button to remove the last slide from favorites */}
        <button className="dynamic-remove" onClick={removeSlide} disabled={slides.length <= 1}>
          Remove From Favorites
        </button>
      </div>
    </div>
  );
}
