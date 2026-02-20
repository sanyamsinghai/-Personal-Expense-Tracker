# Learning React: A Beginner’s Guide Using the Expense Tracker Project

This guide introduces you to React fundamentals through the lens of the Personal Expense Tracker application. Each section pairs a concept with how it’s used in the project, along with simplified examples.

---

## 1. What is React?

React is a JavaScript library for building user interfaces by composing **components**. Each component encapsulates its structure (JSX), styles, and behavior. React uses a virtual DOM to efficiently update the real DOM when data changes.

> In our project, `App`, `TransactionForm`, `TransactionList`, and `Charts` are all components.


## 2. JSX Syntax

JSX looks like HTML but is actually JavaScript. It allows you to describe UI declaratively.

```jsx
function Hello() {
  return <h1>Hello, world!</h1>;
}
```

In `App.js`:

```jsx
return (
  <div className="App">
    <header>
      <h1>Personal Expense Tracker</h1>
    </header>
    {/* more JSX here */}
  </div>
);
```

Note the `className` attribute instead of `class`.

---

## 3. Components and Props

Components can be functions or classes. They receive input via **props** (properties).

```jsx
function Greeting({ name }) {
  return <p>Hello, {name}!</p>;
}

<Greeting name="Sanyam" />
```

In our app, `TransactionForm` accepts an `onAdd` prop:

```jsx
<TransactionForm onAdd={addTransaction} />
```

And `TransactionList` receives `transactions` and `onDelete`:

```jsx
<TransactionList
  transactions={filteredTransactions}
  onDelete={deleteTransaction}
/>
```

Props are read-only; a parent controls data flow.

---

## 4. State with Hooks

React components can have internal state using the `useState` hook.

```jsx
const [count, setCount] = useState(0);
```

In `App.js` we manage multiple pieces of state:

```jsx
const [transactions, setTransactions] = useState([]);
const [darkMode, setDarkMode] = useState(false);
const [categoryFilter, setCategoryFilter] = useState('All');
// etc.
```

Updating state triggers a re-render of the component and its children.

---

## 5. Side Effects with useEffect

`useEffect` lets you run code in response to state or prop changes (similar to lifecycle methods).

```jsx
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

In the tracker app:

- Load transactions once when component mounts:
  ```jsx
  useEffect(() => {
    setTransactions(getFromStorage());
  }, []);
  ```
- Save to `localStorage` whenever `transactions` change:
  ```jsx
  useEffect(() => {
    saveToStorage(transactions);
  }, [transactions]);
  ```

- Toggle dark mode class when `darkMode` changes.

---

## 6. Handling Events

React normalizes events and provides them to your handlers.

```jsx
<button onClick={() => setCount(count + 1)}>Increment</button>
```

The `TransactionForm` uses `onSubmit`:

```jsx
<form onSubmit={submit} className="transaction-form">
  {/* inputs */}
</form>
```

Handlers can access `event.target` and prevent default behavior with `e.preventDefault()`.

---

## 7. Conditional Rendering

You can render content conditionally using JavaScript expressions.

```jsx
{darkMode ? 'Dark Mode' : 'Light Mode'}
```

`filteredTransactions` is computed and passed to the list; if there are none, the table is empty.

---

## 8. Lists & Keys

Render arrays with `map()`, and provide a unique `key` for each item:

```jsx
{transactions.map((tx) => (
  <tr key={tx.id}>
    {/* cells */}
  </tr>
))}
```

Keys help React track items when the list changes.

---

## 9. Lifting State Up

When multiple components need the same data, move state to the nearest common ancestor. In this app, `App` holds transactions and passes them down; `TransactionForm` only has its own local input state.

---

## 10. Styling

We use a global CSS file (`App.css`) and CSS variables for theming. You can also use CSS modules or styled-components in more advanced projects.

Dark mode is implemented by toggling a class on `<body>` and switching variable values.

---

## 11. Working with External Libraries

We integrated Chart.js via the `react-chartjs-2` wrapper. The `Charts` component constructs data objects and renders `<Pie>` and `<Bar>` components.

```jsx
import { Pie, Bar } from 'react-chartjs-2';

<Pie data={pieData} />
```

This demonstrates how React components can encapsulate third‑party UI.

---

## 12. Controlled vs Uncontrolled Components

React forms are usually **controlled** — the form element's value is managed by React state. In `TransactionForm`, each input is tied to a piece of state:

```jsx
const [amount, setAmount] = useState('');
<input
  type="number"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
/>
```

An **uncontrolled** input would use a ref to read the value when needed. Controlled components make validation and reset easier.

---

## 13. Fragments and Returning Multiple Elements

If a component needs to return multiple siblings without a wrapping `<div>`, use React fragments:

```jsx
return (
  <>
    <h2>Title</h2>
    <p>Some text</p>
  </>
);
```

We use fragments implicitly in some components when there's no top-level container.

---

## 14. useCallback, useMemo & Performance

`useCallback` memoizes callback functions, `useMemo` memoizes values. In our project `filteredTransactions` is derived from state; we could wrap it in `useMemo` to avoid recalculation on unrelated state:

```jsx
const filteredTransactions = useMemo(() => {
  return transactions.filter(...);
}, [transactions, categoryFilter, startDate, endDate]);
```

`addTransaction` and `deleteTransaction` could be wrapped with `useCallback` if passed deep into a component tree.

---

## 15. Custom Hooks

Custom hooks let you reuse stateful logic. For example, we might extract a `useLocalStorage` hook:

```jsx
function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
```

Then `App` could call `const [transactions, setTransactions] = useLocalStorage('transactions', []);`.

---

## 16. Context API

When data is needed by many components at different levels, React's `Context` provides a way to pass it without prop drilling.

We could create a `ThemeContext` for dark mode:

```jsx
const ThemeContext = React.createContext();

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ThemeContext.Provider value={{darkMode, setDarkMode}}>
      {/* children */}
    </ThemeContext.Provider>
  );
}
```

Components consume it with `useContext(ThemeContext)`.

---

## 17. Effect Cleanup

Effects can return a cleanup function to run when the component unmounts or before the effect re-runs. If you add event listeners or timers, clean them up:

```jsx
useEffect(() => {
  const handler = () => console.log('resize');
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
}, []);
```

Our dark mode effect doesn't need cleanup, but this is a common pattern.

---

## 18. Error Boundaries

React class components can catch errors during rendering using an error boundary. Function components cannot (as of Hooks). For example:

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    return this.state.hasError ? <p>Something went wrong.</p> : this.props.children;
  }
}
```

Wrap parts of the tree to guard against crashes.

---

## 19. PropTypes & Type Checking

You can declare expected prop types with `prop-types` package:

```jsx
import PropTypes from 'prop-types';
TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};
```

This is helpful in development and complements TypeScript when moving to typed React.

---

## 20. Refs and DOM Access

The `useRef` hook gives you a mutable object. You can attach it to a DOM element for direct access:

```jsx
const amountRef = useRef();
<input ref={amountRef} />
```

Refs are also used to store mutable values that persist across renders without causing rerenders.

---

## 21. Portals

Portals allow rendering children into a DOM node outside the parent hierarchy (useful for modals or tooltips). Not used in this simple project, but good to know:

```jsx
ReactDOM.createPortal(<Modal />, document.body);
```

---

## 22. Testing Basics

CRA includes Jest and React Testing Library. A simple test for `App` might check that the header renders:

```jsx
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  expect(screen.getByText(/personal expense tracker/i)).toBeInTheDocument();
});
```

You can also simulate form submission and ensure state updates.

---

## 23. TypeScript and Modern Patterns

While this project uses JavaScript, migrating to TypeScript adds static types. You define `interface` for props and state, e.g. `interface Transaction { id: number; ... }`. CRA can scaffold a TS template.

---

## 24. Additional Resources

- React docs: https://react.dev
- React patterns: https://reactpatterns.com
- Hooks cheatsheet: https://reactjs.org/docs/hooks-overview.html
- Kent C. Dodds’ Testing Library tutorials

---

React is a large ecosystem; building this expense tracker gave you exposure to core concepts. Keep experimenting and learning by referring back to this project as a real-world example.
## 12. Building & Deployment

`npm run build` produces static assets. You can deploy to GitHub Pages by pushing the `build/` directory and configuring Pages settings.

For production apps, consider using Vite, Next.js, or a backend for storing data beyond `localStorage`.

---

## 13. Tips for Learning

1. **Read the docs** at https://react.dev — start with "Getting Started" and "Main Concepts".
2. **Build small apps**: try a to-do list, counter, or weather app next.
3. **Inspect code**: open this project and step through `App.js` while it runs.
4. **Use React DevTools** browser extension to view component hierarchies and state.
5. **Practice with hooks**: try implementing `useReducer`, `useContext`, or custom hooks.
6. **Explore routing** with `react-router` and state management with Redux or Zustand when ready.

---

React is a large ecosystem; building this expense tracker gave you exposure to core concepts. Keep experimenting and learning by referring back to this project as a real-world example.