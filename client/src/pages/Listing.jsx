import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function Listing() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading();
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(error.message);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading ? <p className="text-center text-2xl my-7">Loading ...</p> : ""}
      {error ? (
        <p className="text-center text-2xl my-7">Something went wrong</p>
      ) : (
        ""
      )}
      {listing && !loading && !error && (
        <h1 className="text-2xl">{listing.name}</h1>
      )}
    </main>
  );
}
