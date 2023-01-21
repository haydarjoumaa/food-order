import Cartcontext from "./cart-context";
import { useReducer } from "react";
const defaultcartstate = {
  items: [],
  totalamount: 0,
};

const cartreducer = (state, action) => {
  if (action.type === "Add") {
    const updateamount =
      state.totalamount + action.val.price * action.val.amount;

    const existcartitemindex = state.items.findIndex(
      (item) => item.id === action.val.id
    );
    const existcartitem = state.items[existcartitemindex];

    let updateitems;
    if (existcartitem) {
      const updateitem = {
        ...existcartitem,
        amount: existcartitem.amount + action.val.amount,
      };
      updateitems = [...state.items];
      updateitems[existcartitemindex] = updateitem;
    } else {
      updateitems = state.items.concat(action.val);
    }

    return { totalamount: updateamount, items: updateitems };
  }
  if (action.type === "Remove") {
    const existcartitemindex = state.items.findIndex(
      (item) => item.id === action.val
    );
    const existitem = state.items[existcartitemindex];
    const updateamount = state.totalamount - existitem.price;
    let updateitems;
    if (existitem.amount === 1) {
      updateitems = state.items.filter((item) => item.id !== action.val);
    } else {
      const updateitem = { ...existitem, amount: existitem.amount - 1 };
      updateitems = [...state.items];
      updateitems[existcartitemindex] = updateitem;
    }
    return { items: updateitems, totalamount: updateamount };
  }
  if (action.type === "Removeall") {
    return { items: [], totalamount: 0 };
  }
  return defaultcartstate;
};
const Cartprovider = (props) => {
  const [cartstate, cartdispatch] = useReducer(cartreducer, defaultcartstate);
  const additemhandler = (item) => {
    cartdispatch({ type: "Add", val: item });
  };
  const removeitemhandler = (id) => {
    cartdispatch({ type: "Remove", val: id });
  };
  const removeAll = () => {
    cartdispatch({ type: "Removeall" });
  };
  const cartcontext = {
    items: cartstate.items,
    totalamount: cartstate.totalamount,
    additem: additemhandler,
    removeitem: removeitemhandler,
    remove: removeAll,
  };
  return (
    <Cartcontext.Provider value={cartcontext}>
      {props.children}
    </Cartcontext.Provider>
  );
};
export default Cartprovider;
