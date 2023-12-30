import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import ListingItem from "../components/ListingItem";
export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

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
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing.name}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center  no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/*listing result*/}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className="div">
              <h2>Recent Offers</h2>
              <Link to={"/search?offer=true"}>Show more offers</Link>
            </div>
            <div className="div">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
