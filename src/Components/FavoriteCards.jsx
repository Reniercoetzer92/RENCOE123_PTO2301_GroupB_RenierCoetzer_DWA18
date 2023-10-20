import { useState } from 'react';
import "./Components.css/FavoriteCards.css";

export default function FavoriteCards() {
  const [slides, setSlides] = useState([ "Favorite 1"]);

  const addSlide = () => {
    const newSlide = `Favorite ${slides.length + 1}`;
    setSlides([...slides, newSlide]);
  };

  const removeSlide = () => {
    if (slides.length > 1) {
      const newSlides = [...slides];
      newSlides.pop();
      setSlides(newSlides);
    }
  };

  return (
    <div className="dynamic-carousel">
      <sl-carousel
        navigation
        pagination
        slides-per-page="3"
        slides-per-move="2"
        style={{ maxWidth: "100%" }}
      >
        {slides.map((slide, index) => (
          <sl-carousel-item key={index}>
            <div style={{  backgroundColor: '#19ac76' }}>
              {slide}
            </div>
          </sl-carousel-item>
        ))}
      </sl-carousel>
      
      <div className="carousel-options">
        <button id="dynamic-add" onClick={addSlide}>
          Add slide
        </button>
        <button id="dynamic-remove" onClick={removeSlide} disabled={slides.length <= 1}>
          Remove From Favorites
        </button>
      </div>
    </div>
  );
}
