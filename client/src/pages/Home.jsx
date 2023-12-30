import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      {/*top*/}
      <div>
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Discover Your <span className="text-slate-500">Dream Home</span>{" "}
          Today:
          <br /> Where Every House Tells a Story
        </h1>
        <div>
          Welcome to Oscar Estate, where luxury living meets timeless elegance.
          Discover a world of refined sophistication and comfort in our
          meticulously designed homes. Experience the pinnacle of modern luxury
          at Oscar Estate—your destination for elevated living.
        </div>
        <Link to={"/search"}>Let&apos;s get started...</Link>
      </div>
      {/*swiper*/}
      {/*listing result*/}
    </div>
  );
}
