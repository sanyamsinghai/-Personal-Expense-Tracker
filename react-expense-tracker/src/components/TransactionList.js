import React from 'react';

export default function TransactionList({ transactions, onDelete }) {
  return (
    <table className="transaction-list">
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx) => (
          <tr key={tx.id}>
            <td>{tx.date}</td>
            <td>{tx.description}</td>
            <td>{tx.category}</td>
            <td>{tx.amount.toFixed(2)}</td>
            <td>
              <button onClick={() => onDelete(tx.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
