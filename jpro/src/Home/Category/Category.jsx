import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
} from "react";
import "./Category.css";
import Card from "../Card/Card";
import fruits from "../../assets/fruit.jpg";
import { SearchContext } from "../Home.jsx";

const filteredContext = createContext();

const Category = (props) => {
  const { searchedItem } = useContext(SearchContext);

  // Memoize the cards array
  const cards = useMemo(() => {
    switch (props.CatName) {
      case "Fruits and Vegetables":
        return [
          { name: "Pear", image: "fruit.jpg", price: "GHc 5.00" },
          { name: "Apple", image: "apple.jpg", price: "GHc 8.00" },
          { name: "Banana", image: "banana.jpg", price: "GHc 2.00" },
          { name: "Pineapple", image: "pineapple.jpg", price: "GHc 15.00" },
          { name: "Mango", image: "mango.jpg", price: "GHc 10.00" },
          { name: "Peach", image: "peach.jpg", price: "GHc 12.00" },
        ];
      case "Drinks and Liquor":
        return [
          { name: "Coca-Cola", image: "coke.jpg", price: "GHc 3.50" },
          { name: "Pepsi", image: "pepsi.jpg", price: "GHc 3.50" },
          { name: "Water", image: "water.jpg", price: "GHc 2.00" },
          { name: "Sprite", image: "sprite.jpg", price: "GHc 3.50" },
          { name: "Fanta", image: "fanta.jpg", price: "GHc 3.50" },
        ];
      case "Toys and School Items":
        return [
          { name: "Toy Car", image: "toy-car.jpg", price: "GHc 20.00" },
          { name: "Doll", image: "doll.jpg", price: "GHc 30.00" },
          { name: "Puzzle", image: "puzzle.jpg", price: "GHc 15.00" },
          {
            name: "Action Figure",
            image: "action-figure.jpg",
            price: "GHc 25.00",
          },
        ];
      default:
        return [];
    }
  }, [props.CatName]);

  // State to hold filtered array
  const [filteredArray, setFilteredArray] = useState(cards);

  // UseEffect to update filtered array when searchedItem or cards change
  useEffect(() => {
    const newFilteredArray = cards.filter((card) =>
      card.name.toLowerCase().includes(searchedItem.toLowerCase())
    );
    setFilteredArray(newFilteredArray);
  }, [searchedItem, cards]);

  return (
    <filteredContext.Provider value={{ filteredArray, setFilteredArray }}>
      <div className="category">
        <h3 className="catName">{props.CatName}</h3>
        <div className="cards">
          {searchedItem === "" ? (
            cards.map((card, index) => (
              <Card
                key={index}
                Name={card.name}
                image={fruits} // Replace with actual card.image
                price={card.price}
              />
            ))
          ) : filteredArray.length > 0 ? (
            filteredArray.map((card, index) => (
              <Card
                key={index}
                Name={card.name}
                image={fruits} // Replace with actual card.image
                price={card.price}
              />
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </filteredContext.Provider>
  );
};

export default Category;
export { filteredContext };
