import { People as Props} from "../App";

interface ListProps {
  people: Props[]
}

const List = (props: ListProps) => {

  const renderList = () => (
    props.people.map((person, idx) => (
      <li className="List" key={idx}>
        <div className="List-header">
          <img src={person.url} alt={person.name} className="List-img" />
          <h2>{person.name}</h2>
        </div>
        <p>{person.age} years old</p>
        {person.note && <p>{person.note}</p>}
      </li>
    ))
  );
  
  return (
    <ul>
      {renderList()}
    </ul>
  );
}


export default List;