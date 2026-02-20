# How Local Storage Works in the Expense Tracker

This document explains, in simple language, what **localStorage** is and how the Personal Expense Tracker uses it. You’ll also see exact code snippets so you can follow along in the project files.

---

## What is localStorage?

`localStorage` is a feature built into every modern web browser. It gives you a small amount of space (typically around 5 megabytes) where you can save text data. The data you save:

- stays in the browser even if you close the tab or restart the computer
- is only available to pages on the **same website** (same protocol, host, and port)
- does **not** expire on its own

Think of it as a tiny, permanent store that belongs to the browser.

## Where the code lives

In this project the logic for reading and writing localStorage is kept inside `src/utils/storage.js`:

```javascript
// src/utils/storage.js
export function saveToStorage(data) {
  localStorage.setItem('transactions', JSON.stringify(data));
}

export function getFromStorage() {
  return JSON.parse(localStorage.getItem('transactions')) || [];
}
```

These two functions are imported and used in `App.js`.

## How the app uses it

### Loading on startup

When the main `App` component mounts (first appears on the page), we load whatever was previously saved:

```javascript
useEffect(() => {
  const stored = getFromStorage();
  setTransactions(stored);
  const theme = localStorage.getItem('theme');
  setDarkMode(theme === 'dark');
}, []);
```

The empty array `[]` as the second argument to `useEffect` means "run this only once, when the component first loads."

### Saving whenever data changes

Any time the `transactions` state array changes—because the user added or deleted an item—we automatically save the new list back to localStorage:

```javascript
useEffect(() => {
  saveToStorage(transactions);
}, [transactions]);
```

Passing `[transactions]` tells React to run this effect whenever that value changes.

We do the same for the `darkMode` preference by toggling a `theme` key directly in `localStorage`.

## Where does it live?

Yes, the data is stored **in your browser**. You can verify this:

1. Open the developer tools in your browser (usually F12 or right-click → Inspect).
2. Go to the "Application" (Chrome/Edge) or "Storage" (Firefox) tab.
3. Look under `Local Storage` → `http://localhost:3000` (or your deployed domain).
4. You’ll see two entries: `transactions` and `theme`.

The value of `transactions` is a JSON string representing the expense array.

## How long will it stay there?

- Until *you* clear it (either with code or by clicking "Clear site data" in dev tools).
- Until the user clears all browser data or runs a cleanup tool.
- Until the storage quota is exceeded (very unlikely with a few expenses).

It does **not** disappear on refresh or when the browser is closed.

> 💡 In incognito/private mode, the storage is cleared when the window closes.

## Working with other storage options

If you need more space or want to share data between devices, you’d move to a server-side database or use something like IndexedDB. For this simple expense tracker, `localStorage` is perfect because it’s quick, easy, and built‑in.

---

Now you know what localStorage is, how this app uses it, where to find the code, and why your transactions stick around even after refreshing the page. Happy coding!