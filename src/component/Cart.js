import { useDispatch, useSelector } from "react-redux";
import FoodItem from "./FoodItem";
import { clearCart } from "../util/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const clear = () => {
    dispatch(clearCart());
  };
  console.log(cartItems);
  return (
    <>
      <div className="cart-info">
        <h1 className="cart">Cart Items</h1>
        <button className="cart-btn" onClick={() => clear()}>
          Clear Items
        </button>
      </div>
      {cartItems.map((items) => (
        <FoodItem key={items?.id} item={items} />
      ))}
    </>
  );
};

export default Cart;
