import PropTypes from 'prop-types';
import "./Components.css/Modal.css"

/**
 * A modal component that displays content when open.
 *
 * @param {Object} props - The component's properties.
 * @param {boolean} props.isOpen - A flag indicating whether the modal is open or not.
 * @param {Function} props.onClose - A function to handle closing the modal.
 * @param {ReactNode} props.children - The content to be displayed within the modal.
 *
 * @returns {JSX.Element|null} - The rendered modal or `null` if not open.
 */
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
