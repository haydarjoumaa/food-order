import { useRef, useState } from "react";
import Input from "../../UI/Input";
import style from "./mealform.module.css";

const Mealform = (props) => {
  const amountinputref = useRef();
  const [amountisvalid, setamountisvalid] = useState(true);
  const submithandler = (event) => {
    event.preventDefault();
    const enteredamount = +amountinputref.current.value;
    if (
      amountinputref.current.value.trim().length === 0 ||
      enteredamount < 0 ||
      enteredamount > 5
    ) {
      setamountisvalid(false);
      return;
    }
    props.onAddtocart(enteredamount);
  };
  return (
    <form className={style.form} onSubmit={submithandler}>
      <Input
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
        ref={amountinputref}
      />
      <button>+ Add</button>
      {!amountisvalid && <p>Enter a valid amount</p>}
    </form>
  );
};
export default Mealform;
