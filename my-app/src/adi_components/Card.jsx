import React from 'react';
import Fade from "react-reveal/Fade";

const Card = ({ item, updateItem, deleteItem, addToCart }) => {
  return (
            <div key={item.id} className="item">
              <div className="item-image">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="item-details2">
                <div className="item-name2">{item.name}</div>
                <div className="item-description2">{item.description}</div>
                <div className="item-price2">${item.price} </div>
              </div>
              <div className="item-actions">
              <div class="button-container">
                <button class = "rounded-button" onClick={() => deleteItem(item.id)}>Delete Item</button>
                <button class = "rounded-button" onClick={(Event) => addToCart(Event,item)}>Checkout</button>
              </div>
              </div>
            </div>
  )
}
export default Card
