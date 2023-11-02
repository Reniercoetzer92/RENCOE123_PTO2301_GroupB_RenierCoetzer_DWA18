import PropTypes from 'prop-types';
import SearchDialog from './SearchDialog';

/**
 * Represents a higher-level component that conditionally renders a search dialog.
 *
 * @param {object} props - The component's props.
 * @param {boolean} props.isSearchDialogOpen - Indicates whether the search dialog is open.
 * @param {function} props.closeSearchDialog - A function to close the search dialog.
 * @param {array} props.searchData - An array of search data to display in the search dialog.
 * @returns {JSX.Element} - The rendered component.
 */
export default function SearchDialogComponent({ isSearchDialogOpen, closeSearchDialog, searchData }) {
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

/**
 * PropTypes for the SearchDialogComponent.
 */
SearchDialogComponent.propTypes = {
  isSearchDialogOpen: PropTypes.bool.isRequired,
  closeSearchDialog: PropTypes.func.isRequired,
  searchData: PropTypes.array.isRequired,
};
