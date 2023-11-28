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
    const fetchAndSetFavoriteImages = async () => {
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
        setCurrentSlide(0); // Reset the current slide to 0 when updating images
      } catch (error) {
        console.error('Error fetching favorite images:', error);
      }
    };

    // Fetch and set favorite images initially
    fetchAndSetFavoriteImages();

    // Set up an interval to fetch and update favorite images every 2000 milliseconds (2 seconds)
    const intervalId = setInterval(() => {
      fetchAndSetFavoriteImages();
      setCurrentSlide((prevSlide) => (prevSlide + 1) % favoriteImages.length);
    }, 2000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [favoriteImages.length]); // Dependency on favoriteImages.length to prevent unnecessary interval restarts

  return (
    <div>
      <h3>My Favorites:</h3>
      {favoriteImages.length > 0 && (
        <sl-carousel
          autoplay
          mouse-dragging
          infinite
          navigation
          pagination
          slides-per-page="3"
          slides-per-move="1"
          current-slide={currentSlide}
          direction={currentSlide % 2 === 0 ? 'horizontal' : 'horizontal-reverse'}
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
      )}
    </div>
  );
}
