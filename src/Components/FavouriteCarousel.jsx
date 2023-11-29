import { useEffect, useState } from 'react';
import { supabase } from '../Helpers/Supabase_client';
import { FavoriteDialog } from '../Helpers/Index_Pages'; 
import '../Components/Components.css/FavouriteCarousel.css';

export default function FavouriteCarousel() {
  const [favoriteShows, setFavoriteShows] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    const fetchAndSetFavoriteShows = async () => {
      try {
        const { data, error } = await supabase
          .from('shows')
          .select('id, image_url');

        if (error) {
          console.error('Error fetching favorite shows:', error);
          return;
        }

        setFavoriteShows(data);
        setCurrentSlide(0);
      } catch (error) {
        console.error('Error fetching favorite shows:', error);
      }
    };

    fetchAndSetFavoriteShows();

    const intervalId = setInterval(() => {
      fetchAndSetFavoriteShows();
      setCurrentSlide((prevSlide) => (prevSlide + 1) % favoriteShows.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [favoriteShows.length]);



  const handleShowClick = async (show) => {
    try {
      const response = await fetch(`https://podcast-api.netlify.app/id/${show.id}`);
      const data = await response.json();
      console.log('Fetched Show Information:', data);

      // Check if the clicked show is already a favorite
      const isFavorite = favoriteShows.some((favShow) => favShow.id === show.id);

      // If it's not a favorite, add it; if it's already a favorite, do nothing
      if (!isFavorite) {
        await supabase.from('shows').upsert([{ id: show.id }]);
      }

      setSelectedShow(data);
    } catch (error) {
      console.error('Error fetching show information:', error);
    }
  };

  const handleDialogClose = () => {
    setSelectedShow(null);
  };

  return (
    <div>
      <h3>My Favorites:</h3>
      {favoriteShows.length > 0 && (
        <div>
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
            {favoriteShows.map((show, index) => (
              <sl-carousel-item key={index} onClick={() => handleShowClick(show)}>
                <img src={show.image_url} alt={`Favorite ${index}`} />
              </sl-carousel-item>
            ))}
          </sl-carousel>
        </div>
      )}
      {selectedShow && (
        <FavoriteDialog show={selectedShow} onClose={handleDialogClose} />
      )}
    </div>
  );
}
