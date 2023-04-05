import React, {useState} from "react";
import Home from "./Home";
import {db} from './firebase-config'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateItem from "./adi_components/CreateItem";
import {collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore'

function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([]);
  const [img, setImg] = useState("");
  const collectionRef = collection(db, "items");
  const createItem = async () => {
    if (!name || !description || !price || isNaN(Number(price))) {
      window.alert("Invalid input");
      setName("");
      setDescription("");
      setPrice();
      setImg("");
      return;
    }    
    await addDoc(collectionRef, {
      name: name,
      price: Number(price),
      description: description,
      img: img,
    });
  
    setImg("");
    setPrice(null);
    setName("");
    setDescription("");
  
    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const updatedItems = [];
      querySnapshot.forEach((doc) =>
        updatedItems.push({ ...doc.data(), id: doc.id })
      );
      setItems(updatedItems);
    });
  
    // Return the unsubscribe function to stop listening for updates
    return () => unsubscribe();
  };
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home 
          name = {name}
          setName = {setName}
          description = {description}
          setDescription = {setDescription}
          price = {price}
          setPrice = {setPrice}
          img = {img}
          setImg = {setImg}
        />} />
        <Route exact path="/Add-Item" element={<CreateItem 
          name = {name}
          setName = {setName}
          description = {description}
          setDescription = {setDescription}
          price = {price}
          setPrice = {setPrice}
          img = {img}
          setImg = {setImg}
          createItem = {createItem}
        />} />
      </Routes>
    </Router>
  );
}

export default App;
