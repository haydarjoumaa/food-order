import { useState } from "react";
import Cart from "./component/Cart/Cart";
import Header from "./component/Layout/Header";
import Meals from "./component/meals/Meals";
import Cartprovider from "./store/Cartprovider";

function App() {
  const [cartisshow, setcartisshow] = useState(false);
  const showing = () => {
    setcartisshow(true);
  };
  const remove = () => {
    setcartisshow(false);
  };
  return (
    <Cartprovider>
      {cartisshow && <Cart onClose={remove} />}
      <Header onShow={showing} />
      <main>
        <Meals />
      </main>
    </Cartprovider>
  );
}

export default App;
