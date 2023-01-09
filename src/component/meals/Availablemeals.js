import style from "./availabelmeal.module.css";
import Card from "../UI/Card";
import Mealitem from "./mealitem/Mealitem";
import { useEffect, useState } from "react";

const Availabelmeal = () => {
  const [DUMMY_MEALS, setmeals] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [httperror, sethttperrror] = useState();
  useEffect(() => {
    setLoading(true);
    const datafecth = async () => {
      const fetchdata = await fetch(
        "https://react-http-8cab7-default-rtdb.firebaseio.com/meals.json"
      );
      if (!fetchdata.ok) {
        throw new Error("error here");
      }
      const data = await fetchdata.json();
      let array = [];
      for (let key in data) {
        array.push({ id: key, ...data[key] });
      }
      return array;
    };

    datafecth()
      .then((data) => {
        setmeals(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("hi");
        sethttperrror(err);
      });
  }, []);

  if (Loading) {
    return <p>Loading</p>;
  }
  if (httperror) {
    return <p>error in server</p>;
  }
  return (
    <section className={style.meals}>
      <Card>
        <ul>
          {DUMMY_MEALS.map((meal) => (
            <Mealitem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
};
export default Availabelmeal;
