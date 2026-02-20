# Personal Expense Tracker (React)

A browser-based expense tracker built with React. This project started as a vanilla JavaScript app and has been reimplemented with modern React practices. It stores all data locally (no backend) and features charts, filters, dark mode, and export functionality.

## Features

- Add, delete, and categorize transactions
- Persist data using `localStorage`
- Filter by category and date range
- Pie and bar charts showing spending breakdown
- Export current view to CSV
- Light/dark theme toggle (saved between sessions)
- Responsive, card-based UI suitable for desktop and mobile

## Quick Start

```bash
cd react-expense-tracker
npm install       # install dependencies
npm start         # start development server
```

Visit `http://localhost:3000` in your browser. Changes to source files reload automatically.

### Building for Production

```bash
npm run build
```

Deploy the resulting `build/` directory to any static hosting service (GitHub Pages, Netlify, etc.).

## Project Structure

```
react-expense-tracker/
├── public/            # static assets and HTML template
└── src/               # application source code
    ├── components/    # reusable UI components
    │   ├── Charts.js
    │   ├── TransactionForm.js
    │   └── TransactionList.js
    ├── utils/         # helper functions (storage.js)
    ├── App.js         # root React component
    ├── App.css        # global styles and theme variables
    └── index.js       # renders App into DOM
```

## Dependencies

- react, react-dom
- chart.js, react-chartjs-2

## Development Notes

- State is managed locally in `App.js` using `useState` and `useEffect`.
- Transactions are saved and loaded with helpers in `src/utils/storage.js`.
- CSS custom properties make theming easy; dark mode toggles a class on `<body>`.
- Filtering and export logic live in App and operate on the state directly.

Refer to `PROJECT_FLOW.md` for a detailed explanation of the application's mechanics.

## License

MIT © Sanyam Singhai
