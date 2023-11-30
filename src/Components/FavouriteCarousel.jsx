import { useEffect, useState } from 'react';
import { supabase } from '../Helpers/Supabase_client';
import { FavoriteDialog } from '../Helpers/Index_Pages';
import '../Components/Components.css/FavouriteCarousel.css';
import { format } from 'date-fns'; // Import the date-fns library for date formatting

export default function FavouriteCarousel() {
  const [favoriteShows, setFavoriteShows] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedShow, setSelectedShow] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedAlphabet, setSelectedAlphabet] = useState(null);
  const [hoveredShow, setHoveredShow] = useState(null); // New state for tracking hover status

  const handleRemoveFromFavorites = async (showId) => {
    try {
      // Remove the show from favorites in Supabase
      await supabase.from('shows').upsert([{ id: showId, isFavourite: false, date_added: new Date() }]); // Use the current date
    } catch (error) {
      console.error('Error removing show from favorites:', error);
    }
  };

  useEffect(() => {
    const fetchAndSetFavoriteShows = async () => {
      try {
        const { data, error } = await supabase.from('shows').select('id, image_url, title, date_added');

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
      const isFavorite = favoriteShows.some((favShow) => favShow.id === show.id);

      if (!isFavorite) {
        await supabase.from('shows').upsert([{ id: show.id, date_added: new Date() }]); // Use the current date
      }

      setSelectedShow(data);
    } catch (error) {
      console.error('Error fetching show information:', error);
    }
  };

  const handleDialogClose = () => {
    setSelectedShow(null);
  };

  const handleAlphabetClick = (alphabet) => {
    setSelectedAlphabet(alphabet === 'All' ? null : alphabet);
  };

  const filterShowsByAlphabet = () => {
    if (!selectedAlphabet) {
      return favoriteShows; // No alphabet selected, return all favorite shows
    }
    return favoriteShows.filter((s) => s.title.toLowerCase().startsWith(selectedAlphabet.toLowerCase()));
  };

  const filteredFavoriteShows = filterShowsByAlphabet();

  return (
    <div>
      <h3>My Favorites:</h3>

      <div className="alphabet-buttons">
        <button
          onClick={() => handleAlphabetClick('All')}
          className={selectedAlphabet === null ? 'selected' : ''}
        >
          All Favourites
        </button>
        {Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i)).map((letter) => (
          <button
            key={letter}
            onClick={() => handleAlphabetClick(letter)}
            className={selectedAlphabet === letter ? 'selected' : ''}
          >
            {letter}
          </button>
        ))}
      </div>

      {filteredFavoriteShows.length > 0 ? (
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
            {filteredFavoriteShows.map((show, index) => (
              <sl-carousel-item
                key={index}
                onClick={() => handleShowClick(show)}
                onMouseEnter={() => setHoveredShow(show)}
                onMouseLeave={() => setHoveredShow(null)}
              >
                <img src={show.image_url} alt={`Favorite ${index}`} />
                {hoveredShow && hoveredShow.id === show.id && (
                  <div className="tooltip">
                    {`Added to favorites on ${format(new Date(show.date_added), 'yyyy-MM-dd HH:mm:ss')}`}
                  </div>
                )}
              </sl-carousel-item>
            ))}
          </sl-carousel>
        </div>
      ) : (
        <p>There is nothing in your favorites.</p>
      )}

      {selectedShow && (
        <FavoriteDialog
          show={selectedShow}
          onClose={handleDialogClose}
          onRemoveFromFavorites={handleRemoveFromFavorites}
          isFavorited={isFavorited}
          toggleFavorite={() => setIsFavorited((prev) => !prev)}
        />
      )}
    </div>
  );
}
