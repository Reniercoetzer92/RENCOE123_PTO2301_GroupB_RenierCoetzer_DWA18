import { useState, useEffect } from "react";
import Slider from "react-slick";
import "./Components.css/LandingPageCards.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/**
 * LandingPageCards component for rendering a carousel of podcast show previews on the landing page.
 *
 * @returns {JSX.Element} - A React component representing the LandingPageCards.
 */
export default function LandingPageCards() {
  // State variables
  const [showPreviews, setShowPreviews] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Fetch show previews
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setShowPreviews(data);
        }
      })
      .catch((error) => console.error("Error fetching show previews:", error));
  }, []);

  // Configuration settings for the Slider component
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  /**
   * Handles the click event on a show preview image. Shows a login modal and automatically hides it after 2 seconds.
   */
  const handleImageClick = () => {
    setShowLoginModal(true);

    // Automatically hide the modal after 2 seconds
    setTimeout(() => {
      setShowLoginModal(false);
    }, 2000);
  };

  return (
    <div>
      {/* Hero description */}
      <div className="hero-description">
        <h4>
          Welcome to RC Studio, your premier destination for captivating podcast videos that combine the power of audio storytelling with visually engaging content. At RC Studio, we have redefined the podcasting experience, bringing you a rich and immersive way to explore the diverse world of podcasts.
        </h4>
      </div>

      {/* Login modal */}
      {showLoginModal && (
        <div className="Landing-Login-modal">
          <h2>Please log in!</h2>
        </div>
      )}

      {/* Show previews carousel */}
      <Slider {...settings}>
        {showPreviews.map((show) => (
          <div key={show.id} onClick={handleImageClick}>
            <img
              src={show.image}
              alt={`Show Preview ${show.id}`}
              style={{ width: "98%", height: "auto", cursor: "pointer" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
