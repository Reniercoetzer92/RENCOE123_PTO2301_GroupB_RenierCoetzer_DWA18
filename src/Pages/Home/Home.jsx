import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';

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
