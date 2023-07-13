import "./index.css";
import { useState } from "react";

// Main Component
function App() {
  const [items, setItems] = useState([]);
  
  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
   function handleToggleItem(id){
    setItems(items=>items.map(item=>item.id===id?{...item,packed:!item.packed}:item))

   }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} />
      <Stats items={items} />
    </div>
  );
}

export default App;

// Logo Component
function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

// Received on AddItem from App Component
function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Handle Submit Handler
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItem(newItem);
    setDescription("");
    setQuantity("");
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍trip?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(e.target.value);
          console.log(+e.target.value);
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          console.log(e.target.value);
        }}
      ></input>
      <button>Add</button>
    </form>
  );
}

// Packing List Component
function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem}/>
        ))}
      </ul>
    </div>
  );
}

// Item Component:- Child to Packing List
function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input type="checkbox"  value={item.packed } onChange={()=>onToggleItem(item.id)}/>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

// Stats Component
function Stats({items}) {
  const numItems= items.length
  return (
    <footer className="stats">
      <em> 💼 You have {numItems} items on your list, and you already packed X (X%) </em>
    </footer>
  );
}
