import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      {/*top*/}
      <div className="flex flex-col gap-6 py-28 px-6 max-w-5xl mx-auto text-center">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-5xl">
          Discover Your <span className="text-slate-500">Dream Home </span>
          Today:
          <br /> Where Every House Tells a Story
        </h1>
        <div
          className="text-gray-500 text-md  
        sm:text-lg
        "
        >
          Welcome to Oscar Estate, where luxury living meets timeless elegance.
          Discover a world of refined sophistication and comfort in our
          meticulously designed homes. Experience the pinnacle of modern luxury
          at Oscar Estate—your destination for elevated living.
        </div>
        <Link
          className="w-[12em] rounded-lg p-3 text-md text-blue-800 font-semibold hover:underline hover:bg-gray-700 hover:text-white transition-colors duration-700 self-center"
          to={"/search"}
        >
          Let&apos;s get started...
        </Link>
      </div>
      {/*swiper*/}
      {/*listing result*/}
    </div>
  );
}
