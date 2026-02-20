import React, { useState } from 'react';

const categories = [
  'Food',
  'Transport',
  'Entertainment',
  'Education',
  'Health',
  'Shopping',
  'Utilities',
  'Other',
];

export default function TransactionForm({ onAdd }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!amount || !date) return;

    onAdd({ amount: parseFloat(amount), category, description, date });
    setAmount('');
    setDescription('');
    setDate('');
    setCategory(categories[0]);
  };

  return (
    <form onSubmit={submit} className="transaction-form">
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}
