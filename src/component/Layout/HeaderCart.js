import { useContext } from "react";
import Cartcontext from "../../store/cart-context";
import CartIcon from "./Carticon";
import style from "./headercart.module.css";

const HeaderCart = (props) => {
  const cartctx = useContext(Cartcontext);

  const nbrofbadge = cartctx.items.reduce((currentnbr, item) => {
    return currentnbr + item.amount;
  }, 0);
  return (
    <button className={style.button} onClick={props.onShow}>
      <span className={style.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={style.badge}>{nbrofbadge}</span>
    </button>
  );
};
export default HeaderCart;
