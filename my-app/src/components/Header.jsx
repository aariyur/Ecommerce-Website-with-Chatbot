import React from 'react';


function Header({ show, setShow }) {
  return (
    <nav>
          <ul className = "top">
          <li><h1 className='logo'>Smart Shopper</h1></li>
          <li>
            <ul>
              <button className='white-button'><a href='/'>Home</a></button>
              <button className='white-button'><a href='/Add-Item'>Add Item</a></button>
              <button className='white-button' onClick={() => setShow(!show)}><a style={{ color: 'black' }}><i className ="fa-solid fa-cart-shopping"></i></a></button>
            </ul>
          </li>
          </ul>
    </nav>
  );
}

export default Header;
