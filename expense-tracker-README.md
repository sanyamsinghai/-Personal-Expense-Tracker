# 💰 Personal Expense Tracker Web App

A clean, browser-based expense tracker built with vanilla JavaScript that lets you manage your finances in real time — no backend, no database, no cost.

---

## 🚀 Live Demo

> Hosted on **GitHub Pages** (Free)  
> `https://sanyamsinghai.github.io/expense-tracker`

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Structure | HTML5 |
| Styling | CSS3 |
| Logic | Vanilla JavaScript |
| Charts | Chart.js |
| Storage | localStorage (browser) |
| Hosting | GitHub Pages (Free) |

---

## ✨ Features

- ➕ **Add Transactions** — Enter amount, category, description, and date
- 🗂️ **Categorize** — Tag expenses (Food, Transport, Entertainment, etc.)
- 🗑️ **Delete** — Remove any transaction instantly
- 📊 **Charts** — Monthly spending shown as interactive pie and bar charts via Chart.js
- 💾 **Persistent Storage** — All data saved in localStorage; survives page refresh
- 📱 **Responsive** — Works on desktop and mobile

---

## 📁 Project Structure

```
expense-tracker/
├── index.html          # Main HTML file
├── style.css           # All styles
├── app.js              # Core logic (add/delete/render transactions)
├── charts.js           # Chart.js integration (pie + bar charts)
└── storage.js          # localStorage read/write helpers
```

---

## 🔧 How to Run Locally

```bash
# Clone the repo
git clone https://github.com/sanyamsinghai/expense-tracker.git

# Open directly in browser — no install needed
cd expense-tracker
open index.html
```

---

## 🌐 How to Deploy on GitHub Pages (Free)

1. Push all files to a GitHub repo named `expense-tracker`
2. Go to **Settings → Pages**
3. Under **Source**, select `main` branch → `/ (root)`
4. Click **Save** — your site will be live at:  
   `https://sanyamsinghai.github.io/expense-tracker`

---

## 📦 Key Implementation Details

### Adding a Transaction
```javascript
function addTransaction(amount, category, description, date) {
  const transaction = { id: Date.now(), amount, category, description, date };
  const transactions = getFromStorage();
  transactions.push(transaction);
  saveToStorage(transactions);
  renderTransactions();
  updateCharts();
}
```

### localStorage Helpers
```javascript
function saveToStorage(data) {
  localStorage.setItem('transactions', JSON.stringify(data));
}

function getFromStorage() {
  return JSON.parse(localStorage.getItem('transactions')) || [];
}
```

### Chart.js — Pie Chart by Category
```javascript
new Chart(ctx, {
  type: 'pie',
  data: {
    labels: categories,
    datasets: [{ data: amounts, backgroundColor: colors }]
  }
});
```

---

## 🗂️ Expense Categories

- 🍔 Food
- 🚌 Transport
- 🎬 Entertainment
- 📚 Education
- 🏥 Health
- 🛍️ Shopping
- 🔧 Utilities
- 📦 Other

---

## 🔮 Future Improvements

- [x] Export data as CSV (React version)
- [ ] Monthly budget limit with alerts
- [x] Dark mode toggle (React version)
- [ ] Multi-currency support
- [x] Filter by date range or category (React version)

---

## 👤 Author

**Sanyam Singhai**  
B.Tech CSE | SVVV Indore  
GitHub: [@sanyamsinghai](https://github.com/sanyamsinghai)
