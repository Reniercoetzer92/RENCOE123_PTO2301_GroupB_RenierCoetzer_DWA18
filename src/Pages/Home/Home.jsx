import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Navbar from '../../Components/Navbar';

export default function HomePage() {
  return (
    <div>
      <section className="Navbar">
        <Navbar />
      </section>
      <section className="Header">
        <Header />
      </section>
      <section className="Footer">
        <Footer />
      </section>
    </div>
  );
}
