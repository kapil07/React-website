import { restaurantList } from "../constant";
import { IMG_CDN_URL } from "../constant";

const RestaurantCard = ({
  name,
  cuisines,
  totalRatingsString,
  cloudinaryImageId,
  avgRating,
  costForTwo,
}) => {
  return (
    <>
      <div className="cards">
        <img src={IMG_CDN_URL + cloudinaryImageId} />
        <h3 className="title">{name}</h3>
        <h4>{cuisines.join(", ")}</h4>
        <div className="cards-info">
          <h3 className="rate">{avgRating}</h3>
          <h3 className="descrip dot">{totalRatingsString}</h3>
          <h3 className="descrip dot">{costForTwo}</h3>
        </div>
      </div>
    </>
  );
};
export default RestaurantCard;
