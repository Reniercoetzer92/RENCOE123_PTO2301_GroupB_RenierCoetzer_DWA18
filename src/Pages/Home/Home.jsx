import { useEffect, useState } from 'react';
import Hero from '../../Components/Hero';
import Footer from '../../Components/Footer';
import Navbar from '../../Components/Navbar';
import PreviewSeasons from '../../Components/PreviewSeasons';
import PreviewShows from '../../Components/PreviewShows';
import SearchBar from '../../Components/SearchBar'

export default function HomePage() {
  const [shows, setShows] = useState([]);
  const [selectedShowId, setSelectedShowId] = useState(null);
  
  useEffect(() => {
    fetch('https://podcast-api.netlify.app/')
      .then((response) => response.json())
      .then((data) => setShows(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  
  const handleShowClick = (showId) => {
    setSelectedShowId(showId);
  };

  return (
    <div>
      <section className="Navbar">
        <Navbar />
      </section>
      <SearchBar/>
      <div>
        <PreviewShows shows={shows} onShowClick={handleShowClick} />
        {selectedShowId ? (
          <PreviewSeasons showId={selectedShowId} />
        ) : (
          <section className="Navbar">
            <Hero />
          </section>
        )}
      </div>
      <section className="Footer">
        <Footer />
      </section>
    </div>
  );
}

