import React from 'react';
import Header2 from '../components/Header2';

function CreateItem({name, setName, description, setDescription, price, setPrice, img, setImg, createItem, show, setShow}) {
  return (
    <div>
      <Header2 show = {show} setShow = {setShow}/>
      <div className="item create-item">
        <input placeholder='Name...' value={name} onChange={(event) => setName(event.target.value)} />
        <input placeholder='Description...' value={description} onChange={(event) => setDescription(event.target.value)} />
        <input placeholder='Price...' value={price} onChange={(event) => setPrice(event.target.value)} />
        <input placeholder='Image...' value={img} onChange={(event) => setImg(event.target.value)} />
        <button onClick={createItem}>Add Item</button>
      </div>
    </div>
    
  );
}

export default CreateItem;
