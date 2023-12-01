import PropTypes from 'prop-types';
import './Components.css/HamburgerMenu.css';

/**
 * HamburgerMenu component for rendering a hamburger-style menu button.
 *
 * @param {Object} props - The component's props.
 * @param {Function} props.onSettingsClick - Callback function to handle menu button click.
 * @param {boolean} props.isButtonEnabled - Indicates whether the button is enabled or disabled.
 * @param {boolean} props.isMenuOpen - Indicates whether the menu is open or closed.
 * @param {Function} props.resetHamburger - Callback function to reset the hamburger menu.
 *
 * @returns {JSX.Element} - A React component representing the HamburgerMenu.
 */
export default function HamburgerMenu({ onSettingsClick, isButtonEnabled, isMenuOpen, resetHamburger }) {
  /**
   * Handles the click event on the menu button. If the button is enabled,
   * it can either open the settings menu or reset the hamburger menu state.
   */
  const handleMenuClick = () => {
    if (isButtonEnabled) {
      if (isMenuOpen) {
        resetHamburger();
      }
      if (onSettingsClick) {
        onSettingsClick();
      }
    }
  };

  // Apply a CSS class to the button to style it as grayed-out if it's disabled.
  const buttonClass = isButtonEnabled ? '' : 'grayed-out';

  return (
    <div>
      {/* Container for the hamburger menu button */}
      <div className={`container ${isMenuOpen ? 'change' : ''} ${buttonClass}`} onClick={handleMenuClick}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    </div>
  );
}

// Prop type validation for component props
HamburgerMenu.propTypes = {
  onSettingsClick: PropTypes.func,
  isButtonEnabled: PropTypes.bool,
  isMenuOpen: PropTypes.bool,
  resetHamburger: PropTypes.func,
};
