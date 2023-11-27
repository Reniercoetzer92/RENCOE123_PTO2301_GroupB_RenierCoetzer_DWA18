import { useEffect, useState } from 'react';
import { supabase } from '../Helpers/Supabase_client';
import './Components.css/FavouriteCarousel.css';

/**
 * FavouriteCarousel component for displaying a list of favorite images.
 *
 * @returns {JSX.Element} - A React component representing the FavouriteCarousel.
 */
export default function FavouriteCarousel() {
  const [favoriteImages, setFavoriteImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchFavoriteImages = async () => {
      try {
        const { data, error } = await supabase
          .from('shows')
          .select('image_url');

        if (error) {
          console.error('Error fetching favorite images:', error);
          return;
        }

        // Extract image URLs from the fetched data
        const images = data.map((item) => item.image_url);

        setFavoriteImages(images);

        // Start the interval after data is fetched
        const intervalId = setInterval(() => {
          setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        }, 2000);

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
      } catch (error) {
        console.error('Error fetching favorite images:', error);
      }
    };

    // Trigger fetching images
    fetchFavoriteImages();
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="FavouriteCarousel">
      <h3>My Favorites:</h3>
      <sl-carousel
        autoplay
        mouse-dragging
        infinite
        navigation
        pagination
        slides-per-page="4"
        slides-per-move="2"
        slides-to-scroll="1" // Set this to control how many slides are scrolled at a time
        current-slide={currentSlide}
      >
        {favoriteImages.map((image, index) => (
          <sl-carousel-item key={index}>
            <img
              src={image}
              alt={`Favorite ${index}`}
            />
          </sl-carousel-item>
        ))}
      </sl-carousel>
    </div>
  );
}
