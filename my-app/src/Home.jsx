import {useState, useEffect} from 'react';
import './App.css';
import {db} from './firebase-config'
import {collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore'
import HeroBanner from './adi_components/Hero';
import Card from './adi_components/Card';
import Cart from './adi_components/Cart.jsx';
import React from 'react'
import Header from './components/Header';

const Home = ({name, setName, description, setDescription, price, setPrice, img, setImg}) => {  
    const [response, setResponse] = useState('');
    const collectionRef = collection(db, "items");
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('Get started by typing in a question...');

    useEffect(() => {
      const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
        const updatedItems = [];
        querySnapshot.forEach((doc) =>
          updatedItems.push({ ...doc.data(), id: doc.id })
        );
        setItems(updatedItems);
      });
      return () => unsubscribe();
    }, []);

    const addToCart = async (Event, item) => {
      Event.preventDefault();
      if(!cartItems.includes(item)){
        setCartItems([...cartItems, item]);
      }
    }; 
    
    const removeToCart = async (id) => {
      setCartItems(cartItems.filter((cartItem) => id !== cartItem.id));
    };       
    
    const updateItem = async(id, nameUpdated) => {
      const itemDoc = doc(db, "items", id);
      const newFields = {name: nameUpdated}
      await updateDoc(itemDoc, newFields);
      setItems(items.map((item) => {
        if (item.id === id) {
          return {...item, name: nameUpdated}
        } else {
          return item;
        }
      }));
    }
    
    const deleteItem = async(id) => {
      const itemDoc = doc(db, "items", id);
      await deleteDoc(itemDoc);
      setItems(items.filter((item) => item.id !== id));
    }
    
    const handleSubmit = (e) => {
      e.preventDefault();
      const concatenatedString = items
        .map((obj) => {
          return `Item Name: ${obj.name}, Item Price: ${obj.price}, Item Description: ${obj.description}, Item Image: ${obj.img}`;
        })
        .join("; ");
      for(let i = 0; i < 1; i++) {
        const prompt = `${message}. Answer directly using only the information in the Item Decription in the vector. Just give a list of the item or items whenever possible: <<${concatenatedString}>>`;
        
        // First submit
        fetch("http://localhost:3001/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: prompt }),
        })
          .then((res) => res.json())
          .then((data) => setResponse(data.message));
      }
    };
       
    return (
      <div className='App'>
        <Header show = {show} setShow = {setShow}/>
        <div>{show && <div className='Cart-Div'><Cart cartItems = {cartItems} onRemoveItem={removeToCart} show={show} setShow = {setShow}/></div>}</div>
        <HeroBanner items = {items} />
        <h2 className='header'>Products</h2>
        <div className='Container'>
          {items.map((item) => (
            <Card
              item={item}
              updateItem={updateItem}
              deleteItem={deleteItem}
              addToCart ={addToCart}
            />
          ))}
        </div>
        <div className='responseBox' id="Chatbot">
          <p className='chatbot-title'><b>Chatbot</b></p> 
          <form onSubmit={handleSubmit}>
            <textarea value={message} onClick={() => setMessage("")} onChange={(e) => setMessage(e.target.value)}></textarea>
            <button type='submit'>Submit</button>
          </form>

          {response && <div className='response'><b>Smart Bot: </b>{response}</div>}
        </div>
        
      </div>
    );
}

export default Home