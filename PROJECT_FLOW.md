# Project Working Flow

This document describes the full development and runtime workflow of the **Personal Expense Tracker** React application. It covers how the application is structured, how data flows between components, and explains key implementation decisions.

---

## 1. Scaffold & Setup

1. `create-react-app` was used to generate a boilerplate React project named `react-expense-tracker`.
2. Dependencies installed:
   - `react` / `react-dom` (core libraries)
   - `react-scripts` (build tooling)
   - `chart.js` and `react-chartjs-2` for charting
3. Directory structure created:
    ```
    react-expense-tracker/
    ├── public/           # static assets
    └── src/              # application code
        ├── components/   # reusable UI pieces
        ├── utils/        # helper functions
        ├── App.js        # root component
        ├── App.css       # global styles
        └── index.js      # render entry point
    ```

4. Additional folders added manually:
   - `components`: `TransactionForm.js`, `TransactionList.js`, `Charts.js`
   - `utils`: `storage.js`

---

## 2. Component Hierarchy & Data Flow

```
App
├─ TransactionForm
├─ (filter controls)  <-- local state in App
├─ TransactionList
├─ Charts
└─ Footer
```

- **App**: top-level state holder. Manages
  - `transactions` array
  - `darkMode` boolean
  - filter values: `categoryFilter`, `startDate`, `endDate`
  - side effects for storage and theme
  - helper actions (`addTransaction`, `deleteTransaction`, `exportCSV`)

- **TransactionForm**: controlled inputs. Calls `onAdd` callback passed from App.
- **TransactionList**: renders table of transactions and calls `onDelete` when the delete button is clicked.
- **Charts**: receives transactions and builds pie & bar charts by category.

Data flows down via props; actions bubble up using callbacks.

---

## 3. Persistence Mechanism

- All transactions are saved to browser `localStorage` under the key `transactions`.
- `utils/storage.js` exports `saveToStorage` and `getFromStorage` helpers.
- App uses `useEffect` to load data at mount and to persist data whenever `transactions` changes.
- The selected theme (`dark`/`light`) is also persisted in `localStorage`.

---

## 4. Additional Features

- **Filtering logic**: transactions filtered in App using the values of 3 state variables.
- **CSV export**: constructs CSV from `filteredTransactions`, creates a `Blob`, and triggers a download.
- **Dark mode**: toggling adds/removes a `dark` class to `<body>` and switches CSS variables.

---

## 5. Styling & Responsiveness

- Global styles in `App.css` use CSS variables for easy theming.
- Components are wrapped in `.card` containers with shadow and rounded corners.
- Responsive breakpoints ensure form controls stack on narrow viewports.
- Interactive states (hover, focus) are defined for inputs and table rows.

---

## 6. Development Workflow

1. `npm start` runs the development server at `http://localhost:3000`.
2. Source changes automatically reload via Hot Module Replacement.
3. Unit tests can be added using `App.test.js` or new test files.
4. `npm run build` bundles the app for production; output lives in `build/` and can be deployed to GitHub Pages or any static host.

---

## 7. Extending the App

Future improvements include budget alerts, CSV import, authentication, backend sync, multi-currency support, etc. The component structure and state management make these features easy to add.

---

This file should serve as a reference for contributors or for anyone trying to understand how the application works end-to-end.