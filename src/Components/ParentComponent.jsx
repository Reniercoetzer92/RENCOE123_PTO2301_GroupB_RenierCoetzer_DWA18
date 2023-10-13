import { useState } from 'react';
import Navbar from './Navbar';
import SearchDialog from './SearchDialog';
import ShowData, { fetchShowDataById } from './ShowData';
import Modal from './Modal.jsx';

/**
 * Represents the parent component that manages a search dialog and show data.
 *
 * @returns {JSX.Element} - The rendered component.
 */
export default function ParentComponent() {
  const [isSearchDialogOpen, setSearchDialogOpen] = useState(false);
  const [searchData, setSearchData] = useState([]);

  /**
   * Opens the search dialog and fetches show data.
   */
  const openSearchDialog = async () => {
    try {
      const allData = await Promise.all(showId => fetchShowDataById(showId));
      setSearchData(allData);
      setSearchDialogOpen(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  /**
   * Closes the search dialog.
   */
  const closeSearchDialog = () => {
    setSearchDialogOpen(false);
  };

  return (
    <div>
      <Navbar onSearchClick={openSearchDialog} />
      <ShowData />
      <Modal isOpen={isSearchDialogOpen} onClose={closeSearchDialog}>
        <SearchDialog onClose={closeSearchDialog} showData={searchData} />
      </Modal>
    </div>
  );
}

