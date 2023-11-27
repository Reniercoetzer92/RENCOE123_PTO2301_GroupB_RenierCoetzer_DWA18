import { Link } from 'react-router-dom';
import './Landingzone.css';
import { Footer, LandingPageCards} from '../../Helpers/Index_Components';

/**
 * The main component representing the landing page of the application.
 *
 * @component
 */
export default function LandingPage() {
  return (
     <div className='Landing_zone'>
        <h1>Welcome to Rc Studio</h1>
        
          <Link to="/login">
            <button className='Login_button'>Log In</button>
          </Link>
          <Link to="/signup">
            <button className='Signup_button'>Sign Up</button>
          </Link>

        <section className="LandingPageCards">
          <LandingPageCards />
        </section>
        
        <section className="Footer">
          <Footer />
        </section>
      </div>
    
  );
}
