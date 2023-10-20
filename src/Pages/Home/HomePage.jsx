import React from 'react';
import HomePreviewSection from "../../Components/HomePreviewSection"
import Footer from '../../Components/Footer.jsx';
import Navbar from '../../Components/Navbar.jsx';
import SearchDialog from '../SearchDialog/SearchDialog.jsx';
import "./HomePage.css"

/**
 * The main component representing the home page of the application.
 *
 * @component
 */
export default function HomePage() {
  const [shows, setShows] = React.useState([]);
  const [selectedShowId, setSelectedShowId] = React.useState(null);
  const [searchData, setSearchData] = React.useState([]);
  const [isSearchDialogOpen, setSearchDialogOpen] = React.useState(false);

  /**
   * Open the search dialog.
   */
  const openSearchDialog = () => {
    setSearchDialogOpen(true);
  };

  /**
   * Close the search dialog.
   */
  const closeSearchDialog = () => {
    setSearchDialogOpen(false);
  };

  React.useEffect(() => {
    // Fetch data and set the states
    fetch('https://podcast-api.netlify.app/')
      .then((response) => response.json())
      .then((data) => {
        setShows(data);
        setSearchData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  /**
   * Handle the click on a show card.
   * @param {string} showId - The ID of the selected show.
   */
  const handleShowClick = (showId) => {
    setSelectedShowId(showId);
  };

  return (
    <div>
      <section className="Navbar">
        <Navbar onSearchClick={openSearchDialog} />
      </section>
      <section className="HomePreview">
      <HomePreviewSection shows={shows} selectedShowId={selectedShowId} handleShowClick={handleShowClick} />
      </section>
      <section className="Footer">
        <Footer />
      </section>
      <section className="SearchDialog">
      {isSearchDialogOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-scrollable-content">
              <SearchDialog isOpen={isSearchDialogOpen} onClose={closeSearchDialog} showData={searchData} />
            </div>
          </div>
        </div>
      )}
      </section>
    </div>
  );
}
