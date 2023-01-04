import { useContext } from "react";
import Cartcontext from "../../store/cart-context";
import Modal from "../UI/Modal";
import style from "./cart.module.css";
import CartItem from "./CartItem";
const Cart = (props) => {
  const crtctx = useContext(Cartcontext);
  const totalamount = `$${crtctx.totalamount.toFixed(2)}`;
  const itemlen = crtctx.items.length > 0;
  const cartitemremovehandler = (id) => {
    crtctx.removeitem(id);
  };
  const cartitemaddhandler = (item) => {
    crtctx.additem({ ...item, amount: 1 });
  };
  return (
    <Modal onClose={props.onClose}>
      <ul className={style["cart-items"]}>
        {crtctx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartitemremovehandler.bind(null, item.id)}
            onAdd={cartitemaddhandler.bind(null, item)}
          />
        ))}
      </ul>
      <div className={style.total}>
        <span>Total Amount</span>
        <span>{totalamount}</span>
      </div>
      <div className={style.actions}>
        <button className={style["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {itemlen && <button className={style.button}>Order</button>}
      </div>
    </Modal>
  );
};
export default Cart;
