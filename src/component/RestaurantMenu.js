import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import {
  MENU_ITEM_TYPE_KEY,
  swiggy_menu_api_URL,
  RESTAURANT_TYPE_KEY,
  IMG_CDN_URL,
  ITEM_IMG_CDN_URL,
} from "../constant";
import { useDispatch } from "react-redux";
import { addItem } from "../util/cartSlice";

const RestaurantMenu = () => {
  const params = useParams();
  const { id } = params;
  const [restaurant, setRestaurant] = useState(null);
  const [menuItem, setMenuItem] = useState([]);
  const dispatch = useDispatch();

  const addFoodItem = (item) => {
    dispatch(addItem(item));
  };

  useEffect(() => {
    getRestaurantMenu();
  }, []);

  async function getRestaurantMenu() {
    try {
      const response = await fetch(swiggy_menu_api_URL + id);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Fetched data:", data);

      //restaurant data
      const restaurantData =
        data?.data?.cards
          ?.map((x) => x.card)
          ?.find((x) => x && x.card["@type"] === RESTAURANT_TYPE_KEY)?.card
          ?.info || null;

      setRestaurant(restaurantData);
      console.log(restaurantData);

      //menu item data
      const menuItem =
        data?.data?.cards
          .find((x) => x.groupedCard)
          ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((x) => x.card?.card)
          ?.filter((x) => x["@type"] == MENU_ITEM_TYPE_KEY)
          ?.map((x) => x.itemCards)
          .flat()
          .map((x) => x.card?.info) || [];

      const uniqueMenuItems = [];
      menuItem.forEach((item) => {
        if (!uniqueMenuItems.find((x) => x.id === item.id)) {
          uniqueMenuItems.push(item);
        }
      });

      setMenuItem(uniqueMenuItems);
      console.log(uniqueMenuItems);
    } catch (error) {
      setMenuItem([]);
      setRestaurant(null);
      console.error("Error fetching data:", error);
    }
  }
  return !restaurant ? (
    <Shimmer />
  ) : (
    <>
      <div className="restaurant-menu">
        <img
          className="restaurant-img"
          src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
          alt={restaurant?.name}
        ></img>
        <div className="restaurant-details">
          <h1>{restaurant.name}</h1>
          <h3>{restaurant.cuisines.join(" ,  ")}</h3>
          <div className="restaurant-summary">
            <h2 className="rate">{restaurant.avgRatingString}</h2>
            <h1 className="vline">{restaurant.sla.deliveryTime + " Km"}</h1>
            <h1 className="vline">{restaurant.costForTwoMessage}</h1>
          </div>
        </div>
      </div>

      <div className="menu-content">
        <div className="menu-length">
          <h1>Recommended</h1>
          <h2>{menuItem.length + " ITEMS"}</h2>
        </div>

        <div className="menu-items-list">
          {menuItem.map((item) => (
            <div className="menu-item-details" key={item?.id}>
              <div className="menu-items">
                <h1>{item?.name}</h1>
                <p className="item-cost">
                  {item?.price > 0
                    ? new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(item?.price / 100)
                    : " "}
                </p>
                <h2>{item?.description}</h2>
              </div>

              <div className="img-wrapper">
                {item?.imageId && (
                  <img
                    src={ITEM_IMG_CDN_URL + item?.imageId}
                    alt={item?.name}
                  ></img>
                )}
                <button onClick={() => addFoodItem(item)}>ADD +</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RestaurantMenu;
