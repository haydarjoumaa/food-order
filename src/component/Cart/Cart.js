import { useContext, useState } from "react";
import Cartcontext from "../../store/cart-context";
import Modal from "../UI/Modal";
import style from "./cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [ischeckout, setischeckout] = useState(false);
  const crtctx = useContext(Cartcontext);
  const totalamount = `$${crtctx.totalamount.toFixed(2)}`;
  const itemlen = crtctx.items.length > 0;
  const cartitemremovehandler = (id) => {
    crtctx.removeitem(id);
  };
  const cartitemaddhandler = (item) => {
    crtctx.additem({ ...item, amount: 1 });
  };
  const alldata = async (data) => {
    await fetch(
      "https://react-http-8cab7-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify({ data, crtctx }),
      }
    );

    alert("Your order on the way");
    crtctx.remove();
    props.onClose();
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
      {ischeckout && <Checkout onCancel={props.onClose} onsubmit={alldata} />}
      {!ischeckout && (
        <div className={style.actions}>
          <button className={style["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          {itemlen && (
            <button
              className={style.button}
              onClick={() => setischeckout((prev) => !prev)}
            >
              Order
            </button>
          )}
        </div>
      )}
    </Modal>
  );
};
export default Cart;
