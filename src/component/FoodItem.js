import { ITEM_IMG_CDN_URL } from "../constant";
import { useDispatch } from "react-redux";
import { removeSpecificItem } from "../util/cartSlice";

const FoodItem = (item) => {
  const dispatch = useDispatch();

  const handleRemoveItemClick = () => {
    // Dispatch the action to remove the specific item from the cart
    dispatch(removeSpecificItem(item.item)); // Assuming item.id is the unique identifier of the item
  };
  return (
    <div className="menu-items-list menu-content">
      <div className="menu-item-details">
        <div className="menu-items">
          <h1>{item?.item?.name}</h1>
          {/* {console.log(1 + 1)}
          {console.log(item)}
          {console.log(item?.item?.name)} */}
          <p className="item-cost">
            {item?.item?.price > 0
              ? new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(item?.item?.price / 100)
              : " "}
          </p>
          <h2>{item?.item?.description}</h2>
        </div>

        <div className="img-wrapper">
          {item?.item?.imageId && (
            <img
              src={ITEM_IMG_CDN_URL + item?.item?.imageId}
              alt={item?.item?.name}
            ></img>
          )}
          <button onClick={() => handleRemoveItemClick()}>Remove -</button>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
