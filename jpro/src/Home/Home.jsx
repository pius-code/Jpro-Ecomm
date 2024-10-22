import React, { useState, createContext, useContext } from "react";
import Category from "./Category/Category.jsx";
import "./Home.css";
import port from "../assets/portrait.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { filteredContext } from "./Category/Category.jsx";

const SearchContext = createContext();

const Home = () => {
  const navigate = useNavigate();
  const [filteredArray, setFilteredArray] = useState([]);
  const [infoDisp, setInfoDisp] = useState(false);
  const toggleInfo = () => {
    setInfoDisp(!infoDisp);
  };

  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  const [searchedItem, setSearchedItem] = useState("");
  const searchItem = (event) => {
    setSearchedItem(event.target.value);
  };

  // Combine all categories data for global search
  const allItems = [
    { name: "Pear", image: "fruit.jpg", price: "GHc 5.00" },
    { name: "Apple", image: "apple.jpg", price: "GHc 8.00" },
    { name: "Banana", image: "banana.jpg", price: "GHc 2.00" },
    { name: "Pineapple", image: "pineapple.jpg", price: "GHc 15.00" },
    { name: "Mango", image: "mango.jpg", price: "GHc 10.00" },
    { name: "Peach", image: "peach.jpg", price: "GHc 12.00" },
    { name: "Coca-Cola", image: "coke.jpg", price: "GHc 3.50" },
    { name: "Pepsi", image: "pepsi.jpg", price: "GHc 3.50" },
    { name: "Water", image: "water.jpg", price: "GHc 2.00" },
    { name: "Sprite", image: "sprite.jpg", price: "GHc 3.50" },
    { name: "Fanta", image: "fanta.jpg", price: "GHc 3.50" },
    { name: "Toy Car", image: "toy-car.jpg", price: "GHc 20.00" },
    { name: "Doll", image: "doll.jpg", price: "GHc 30.00" },
    { name: "Puzzle", image: "puzzle.jpg", price: "GHc 15.00" },
    { name: "Action Figure", image: "action-figure.jpg", price: "GHc 25.00" },
  ];

  // Filter the global items based on the search term
  const filteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(searchedItem.toLowerCase())
  );

  return (
    <SearchContext.Provider value={{ searchedItem, setSearchedItem }}>
      <filteredContext.Provider value={{ filteredArray, setFilteredArray }}>
        <div className="screeny">
          {infoDisp && (
            <div className="infoDispScreen" onClick={toggleInfo}>
              <div className="disp">
                <img src={port} alt="" className="imgs" onClick={toggleInfo} />
                {username && <h3 className="username">{username}</h3>}
                <button className="butn" onClick={handleLogout}>
                  LogOut
                </button>
                <a
                  href="http://www.google.com"
                  target="_self"
                  className="usernamex"
                >
                  have an issue? contact us
                </a>
              </div>
            </div>
          )}
          <div className="introx">
            <div
              className="header"
              onClick={() => {
                navigate("/Home");
              }}
            >
              <h3 className="headerTittle">JuasoPro</h3>
              <div className="options">
                <img src={port} alt="" className="image" onClick={toggleInfo} />
                <FontAwesomeIcon icon={faCartShopping} className="cart" />
              </div>
            </div>
            <div className="inpt">
              <input
                type="text"
                className="search"
                placeholder="search an item or category "
                value={searchedItem}
                onChange={searchItem}
              />
              <button className="btnxy">Search</button>
            </div>
          </div>

          {/* Search results section */}
          {searchedItem !== "" && (
            <div className="search-results">
              <h3>Search Results</h3>
              {filteredItems.length > 0 ? (
                <div className="cards">
                  {filteredItems.map((item, index) => (
                    <div key={index} className="card">
                      <img src={item.image} alt={item.name} className="image" />
                      <h4>{item.name}</h4>
                      <p>{item.price}</p>
                      <small>{item.category}</small>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No results found</p>
              )}
            </div>
          )}

          {/* Hide categories when a search is performed */}
          {searchedItem === "" && (
            <>
              <Category CatName="Drinks and Liquor" />
              <Category CatName="Fruits and Vegetables" />
              <Category CatName="Toys and School Items" />
            </>
          )}
        </div>
      </filteredContext.Provider>
    </SearchContext.Provider>
  );
};

export default Home;
export { SearchContext };
