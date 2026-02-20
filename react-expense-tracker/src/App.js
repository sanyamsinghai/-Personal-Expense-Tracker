import React, { useState, useEffect } from 'react';
import './App.css';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Charts from './components/Charts';
import { saveToStorage, getFromStorage } from './utils/storage';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const stored = getFromStorage();
    setTransactions(stored);
    const theme = localStorage.getItem('theme');
    setDarkMode(theme === 'dark');
  }, []);

  useEffect(() => {
    saveToStorage(transactions);
  }, [transactions]);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const addTransaction = (tx) => {
    const newTx = { ...tx, id: Date.now() };
    setTransactions((prev) => [...prev, newTx]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const exportCSV = () => {
    const header = 'Date,Description,Category,Amount\n';
    const rows = filteredTransactions.map(
      (t) => `${t.date},"${t.description}",${t.category},${t.amount}`
    );
    const csv = header + rows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredTransactions = transactions.filter((t) => {
    if (categoryFilter !== 'All' && t.category !== categoryFilter) return false;
    if (startDate && t.date < startDate) return false;
    if (endDate && t.date > endDate) return false;
    return true;
  });

  return (
    <div className="App">
      <header>
        <h1>Personal Expense Tracker</h1>
      </header>

      <main>
        <div className="header-controls">
          <button onClick={() => setDarkMode((d) => !d)}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button onClick={exportCSV}>Export CSV</button>
        </div>

        <div className="card">
          <TransactionForm onAdd={addTransaction} />

          <div className="filters">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option>All</option>
            <option>Food</option>
            <option>Transport</option>
            <option>Entertainment</option>
            <option>Education</option>
            <option>Health</option>
            <option>Shopping</option>
            <option>Utilities</option>
            <option>Other</option>
          </select>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          </div>
        </div>

        <div className="card">
          <TransactionList
            transactions={filteredTransactions}
            onDelete={deleteTransaction}
          />
        </div>

        <div className="charts">
          <Charts transactions={filteredTransactions} />
        </div>
      </main>

      <footer>
        <p>All data stored in localStorage.</p>
      </footer>
    </div>
  );
}

export default App;
