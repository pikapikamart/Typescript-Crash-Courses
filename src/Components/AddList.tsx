import React from "react";
import { useState } from "react";
import { People as Props} from "../App";

interface ListProps {
  people: Props[],
  setPeople: React.Dispatch<React.SetStateAction<Props[]>>
}


const AddList = ({people, setPeople}: ListProps) =>{
  const [ data, setData ] = useState({
    name: "",
    age: "",
    url: "",
    note: ""
  });
  
  const handleChange = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> )=>{
    const { name, value } = event.target;
    setData( prev =>({
      ...prev,
      [ name ]: value
    }))
  }

  const handleClick = () => {
    if ( !data.name || !data.age || !data.url ) return;

    setPeople([
      ...people,
      {
        name: data.name,
        age: parseInt(data.age),
        url: data.url,
        note: data.note 
      }
    ])
  }

  const handleFormSubmit =  (event: React.FormEvent<HTMLFormElement>) : void =>{
    event.preventDefault();
  }

  return (
    <form noValidate action="#" className="AddToList" onSubmit={handleFormSubmit}>
      <input 
        className="AddToList-input" 
        type="text" 
        placeholder="name" 
        value={data.name} 
        name="name"
        onChange={handleChange} />
      <input 
        className="AddToList-input" 
        type="text" 
        placeholder="age" 
        value={data.age} 
        name="age"
        onChange={handleChange} />
      <input 
        className="AddToList-input" 
        type="text" 
        placeholder="url" 
        value={data.url} 
        name="url"
        onChange={handleChange} />
      <textarea 
        className="AddToList-input" 
        placeholder="note" 
        value={data.note} 
        name="note"
        onChange={handleChange} />
        <button className="AddToList-btn" onClick={handleClick}>Add to List</button>
    </form>
  );
}


export default AddList;