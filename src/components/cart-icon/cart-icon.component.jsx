import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bad.svg";
import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";
const CartIcon = () => {
  const { showCartItems, setShowCartItems, cartCount } =
    useContext(CartContext);

  return (
    <div
      className="cart-icon-container"
      onClick={() => setShowCartItems(!showCartItems)}
    >
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
