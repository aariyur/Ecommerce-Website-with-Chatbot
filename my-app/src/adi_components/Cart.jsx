import React from 'react';
import './Cart.css';

function ShoppingCart({ cartItems, onRemoveItem, show, setShow }) {
  return (
    <div className="shopping-cart">
      <div>
        <h2>Your Cart</h2>
        <button className='close-button'onClick={() => setShow(!show)}>Close</button>
      </div>
      <div className="cart-items-wrapper">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-image2">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="item-details">
                <div className="item-name">{item.name}</div>
                <div className="item-description">{item.description}</div>
                <div className="item-actions-wrapper">
                  <div className="item-price">${item.price}</div>
                  <button className="remove-button" onClick={() => onRemoveItem(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
          {cartItems.length === 0 && (
            <div>
              <div className="empty-cart">Your cart is empty.</div>
            </div>
          )}
          {cartItems.length !== 0 && (
            <div>
              <button className="checkout-button">Checkout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
