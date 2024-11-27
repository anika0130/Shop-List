import { useState } from "react";

const initialItems = [
  { id: 1, description: "bag", quantity: 3, bought: false },
  { id: 2, description: "drinks", quantity: 1, bought: true },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  function addItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  return (
    <div className="app">
      <Logo />
      <Forms onAddItems={addItems} />
      <List items={items} setItems={setItems} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>Shop with me 😍🛍</h1>;
}

function Forms({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function btnSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      description,
      quantity: Number(quantity),
      bought: false,
      id: Date.now(),
    };
    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={btnSubmit}>
      {" "}
      {/* Changed from div to form */}
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
    </form>
  );
}

function List({ items, setItems }) {
  function handleRemove(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} onRemove={handleRemove} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onRemove }) {
  return (
    <li>
      <span style={item.bought ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onRemove(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.bought).length;

  return (
    <footer className="stats">
      <em>
        You have {totalItems} items on your list, and you already packed{" "}
        {packedItems}.
      </em>
    </footer>
  );
}
