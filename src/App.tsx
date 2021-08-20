import { useState } from 'react';
import './App.css';

import List from "./Components/List";
import AddList from "./Components/AddList";

export interface People {
  name: string,
  age: number,
  url: string,
  note?: string
}

const defaultPeople = [
  {
    name: "Lebron James",
    url: "https://lakersdaily.com/wp-content/uploads/2021/04/ccacd5509f1ae7bbcff21a5af9ef8c97-scaled-e1619531787952.jpeg",
    age: 36,
    note: "I ate a sandwich"
  },
  {
    name: "Lee Seung Gi",
    age: 34,
    url: "https://i0.wp.com/wikifamouspeople.com/wp-content/uploads/2018/07/lee-seung-gi.jpg?fit=800%2C450&ssl=1"
  }
]


function App() {
  const [ people, setPeople ] = useState<People[]>(defaultPeople);

  return (
    <div className="App">
      <h1>People Invited to my Party</h1>
      <List people={people} />
      <AddList people={people}  setPeople={setPeople}/>
    </div>
  );
}



export default App;
