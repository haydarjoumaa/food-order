import React from "react";
import style from "./header.module.css";
import meals from "../../assets/meals.jpg";
import HeaderCart from "./HeaderCart";
const Header = (props) => {
  return (
    <React.Fragment>
      <header className={style.header}>
        <h1>React Meals</h1>
        <HeaderCart onShow={props.onShow} />
      </header>
      <div className={style["main-image"]}>
        <img src={meals} alt="meals" />
      </div>
      <div></div>
    </React.Fragment>
  );
};
export default Header;
