import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { swiggy_api_URL } from "../constant";
import useOnline from "../util/useOnline";

function filterData(searchtext, restaurants) {
  return restaurants.filter((restaurant) =>
    restaurant?.info?.name?.toLowerCase()?.includes(searchtext?.toLowerCase())
  );
}

const Body = () => {
  const isOnline = useOnline();
  const [filteredRestaurants, setfilteredRestaurant] = useState([]);
  const [errorMessage, seterrorMessage] = useState("");
  const [searchtext, setSearchText] = useState("");
  const [allRestaurants, setallRestaurant] = useState([]);

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    try {
      const response = await fetch(swiggy_api_URL);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();

      console.log(json);
      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {
          // initialize checkData for Swiggy Restaurant data
          let checkData =
            json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;

          // if checkData is not undefined then return it
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }
      const resData = await checkJsonData(json);

      setallRestaurant(resData);
      setfilteredRestaurant(resData);

      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  }
  if (!isOnline) {
    return <h1> Please check your interent connection!!</h1>;
  }
  return (
    <>
      <div className="search-conatiner">
        <input
          type="text"
          className="search-input"
          placeholder="Search a restaurant you want....."
          value={searchtext}
          onChange={(e) => setSearchText(e.target.value)}
        ></input>

        <button
          className="search-btn"
          onClick={() => {
            const data = filterData(searchtext, allRestaurants);
            setfilteredRestaurant(data);
          }}
        >
          Search
        </button>
      </div>

      {allRestaurants?.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="container">
          {filteredRestaurants.map((restaurant) => (
            <Link
              key={restaurant?.info?.id}
              to={"/restaurant/" + restaurant?.info?.id}
            >
              <RestaurantCard {...restaurant?.info} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Body;
