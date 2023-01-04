import { useContext } from "react";
import Cartcontext from "../../../store/cart-context";
import Mealform from "./Mealform";
import style from "./mealitem.module.css";

const Mealitem = (props) => {
  const ctx = useContext(Cartcontext);
  const addtocarthandler = (amount) => {
    ctx.additem({
      id: props.id,
      amount: amount,
      name: props.name,
      price: props.price,
    });
  };
  return (
    <li className={style.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={style.description}>{props.description}</div>
        <div className={style.price}>${props.price.toFixed(2)}</div>
      </div>
      <div>
        <Mealform id={props.id} onAddtocart={addtocarthandler} />
      </div>
    </li>
  );
};

export default Mealitem;
