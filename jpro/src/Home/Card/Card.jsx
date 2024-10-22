import React from "react";
import fruits from "../../assets/fruit.jpg";

import "./Card.css";
const Card = (props) => {
  return (
    <div className="card">
      <img src={props.image} alt="image" className="img" />
      <h3 className="ProdName">{props.Name}</h3>
      <h4 className="price">{props.price}</h4>
    </div>
  );
};

export default Card;
