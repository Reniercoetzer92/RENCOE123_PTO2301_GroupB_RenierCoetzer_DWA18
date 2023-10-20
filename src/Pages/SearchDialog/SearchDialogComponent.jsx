import PropTypes from 'prop-types';
import SearchDialog from './SearchDialog'; 

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
  isSearchDialogOpen: PropTypes.bool.isRequired,
  closeSearchDialog: PropTypes.func.isRequired, 
  searchData: PropTypes.array.isRequired, 
};
