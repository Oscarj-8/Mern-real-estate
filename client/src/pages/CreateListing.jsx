export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="8"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" name="" className="w-5" id="" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="rent" className="w-5" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="parking" className="w-5" id="" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnished"
                className="w-5"
                id="furnished"
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="offer" className="w-5" id="offer" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min="1"
                max="10"
                name="bedrooms"
                required
                className="p-3 border border-gray-300 rounded-lg"
                id="bedrooms"
              />
              <span>Beds</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min="1"
                max="10"
                name="bathrooms "
                id="bathrooms"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <span>Baths</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min="1"
                max="10"
                name="regularPrice"
                id="regularPrice"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <span>Regular price</span>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min="1"
                max="10"
                name="discountedPrice"
                id="discountedPrice"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <span>Discounted price</span>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-xs text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              name="images"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Uplaod
            </button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-80">
            Create List
          </button>
        </div>
      </form>
    </main>
  );
}
