import PropTypes from 'prop-types';
import SearchDialog from './SearchDialog'; // Import the SearchDialog component

export default function YourComponent({ isSearchDialogOpen, closeSearchDialog, searchData }) {
  return (
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
  );
}

YourComponent.propTypes = {
  isSearchDialogOpen: PropTypes.bool.isRequired, // Add PropTypes validation for the "isSearchDialogOpen" prop
  closeSearchDialog: PropTypes.func.isRequired, // Add PropTypes validation for the "closeSearchDialog" prop
  searchData: PropTypes.array.isRequired, // Add PropTypes validation for the "searchData" prop
};
