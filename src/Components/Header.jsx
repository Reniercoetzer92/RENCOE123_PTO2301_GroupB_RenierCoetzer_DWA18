import Navbar from "./Navbar"

export default function Header() {
  return <div>
      <Navbar />
      <div  className="feature">
        <sl-carousel pagination>
          <sl-carousel-item>
            <img
              alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
              src="./src/Images/background1.jpg"
            />
          </sl-carousel-item>
          <sl-carousel-item>
            <img
              alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
              src="./src/Images/background1.jpg"
            />
          </sl-carousel-item>
          <sl-carousel-item>
            <img
              alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
              src="./src/Images/background1.jpg"
            />
          </sl-carousel-item>
          <sl-carousel-item>
            <img
              alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
              src="./src/Images/background1.jpg"
            />
          </sl-carousel-item>
          <sl-carousel-item>
            <img
              alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
              src="./src/Images/background1.jpg"
            />
          </sl-carousel-item>
        </sl-carousel>
        </div>
    </div>;
}