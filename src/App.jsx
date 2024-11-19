import { useState } from "react";

const items = [
  { id: 1, description: "bag", quantity: 3, bought: false },
  { id: 2, description: "drinks", quantity: 1, bought: true },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Forms />
      <List />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Shop with me 😍🛍</h1>;
}

function Forms() {
  const { description, setDescription } = useState("");
  const { quantity, setQuantity } = useState(1);

  function btnSubmit(e) {
    e.preventDefault();
  }

  const newItem = { description, quantity, packed: false, id: Date.now() };
  // console.log(newItem);

  return (
    <div className="add-form" onSubmit={btnSubmit}>
      <h3>What do you need to buy?</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </div>
  );
}

function List() {
  console.log(items);
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.bought ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={item.filter}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already packed X </em>
    </footer>
  );
}
