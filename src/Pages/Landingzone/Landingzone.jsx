import { Link } from 'react-router-dom';
import './Landingzone.css';
import { Footer } from '../../Helpers/Index_Components';

function LandingPage() {
  return (
     <div className='Landing_zone'>
        <h1>Welcome to Rc Studio</h1>
        
          <Link to="/login">
            <button className='Login_button'>Log In</button>
          </Link>
          <Link to="/signup">
            <button className='Signup_button'>Sign Up</button>
          </Link>
        
        <section className="Footer">
          <Footer />
        </section>
      </div>
    
  );
}

export default LandingPage;
