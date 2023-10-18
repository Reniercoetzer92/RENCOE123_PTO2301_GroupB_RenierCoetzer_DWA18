import PropTypes from 'prop-types';
import './Components.css/HamburgerMenu.css';

function HamburgerMenu({ onSettingsClick, isButtonEnabled, isMenuOpen, resetHamburger }) {
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

  const buttonClass = isButtonEnabled ? '' : 'grayed-out';

  return (
    <div>
      <div className={`container ${isMenuOpen ? 'change' : ''} ${buttonClass}`} onClick={handleMenuClick}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    </div>
  );
}

HamburgerMenu.propTypes = {
  onSettingsClick: PropTypes.func,
  isButtonEnabled: PropTypes.bool,
  isMenuOpen: PropTypes.bool,
  resetHamburger: PropTypes.func,
};

export default HamburgerMenu;
