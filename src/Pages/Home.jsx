//@ts-check

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Body from "../Components/Body";

export default function HomePage() {
  return <div>
            <section className="Header">
              <Header/>
            </section>
            <section className="Body">
              <Body />
            </section>
            <section className="Footer">
              <Footer/>
            </section>
          </div>
}