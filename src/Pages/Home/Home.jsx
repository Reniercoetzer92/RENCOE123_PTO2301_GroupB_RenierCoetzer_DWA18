import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Featured from '../../Components/Featured/Featured';

export default function HomePage() {
  return (
    <div>
      <section className="Header">
        <Header />
      </section>
      <section className="Featured">
        <Featured />
      </section>
      <section className="Footer">
        <Footer />
      </section>
    </div>
  );
}
