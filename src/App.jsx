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

  function deleteItems(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function toggleBought(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, bought: !item.bought } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Forms onAddItems={addItems} />
      <List
        items={items}
        onDelete={deleteItems}
        onToggleBought={toggleBought}
      />
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

  function handleSubmit(e) {
    e.preventDefault();
    if (!description.trim()) return;

    const newItem = {
      description,
      quantity: Number(quantity),
      bought: false,
      id: Date.now(),
    };
    onAddItems(newItem);

    // Reset form
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
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

function List({ items, onDelete, onToggleBought }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "bought")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.bought) - Number(b.bought));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDelete={onDelete}
            onToggleBought={onToggleBought}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">sort by description</option>
          <option value="bought">sort by bought status</option>
        </select>
      </div>
    </div>
  );
}

function Item({ item, onDelete, onToggleBought }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.bought}
        onChange={() => onToggleBought(item.id)}
      />
      <span style={item.bought ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDelete(item.id)}>❌</button>
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
