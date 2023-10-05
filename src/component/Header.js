import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cart_img from "../image/cart-shopping-solid.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons"; // Import the desired icon
import { useState } from "react";
import food_img from "../image/food-image.jpg";

const Title = () => {
  return (
    <div className="logo">
      <img src={food_img} alt="" />
    </div>
  );
};

const Header = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const [showNav, setshowNav] = useState(false);

  return (
    <>
      <div className="header">
        <Title />
        <div className="hamburger-menu">
          <FontAwesomeIcon
            onClick={() => setshowNav(!showNav)}
            style={{ fontSize: "45px" }}
            icon={faBars}
          />
        </div>
      </div>
      <div className={showNav ? "mobile-nav-items" : "nav-items"}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <div className="cart-head">
            <li>
              <Link to="/cart">
                <img className="cart-img" src={cart_img} alt="" />
                {cartItems.length}
              </Link>
            </li>
          </div>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
