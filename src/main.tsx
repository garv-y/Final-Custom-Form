// Import ReactDOM for rendering the root component
import ReactDOM from "react-dom/client";

// Import main App component
import App from "./App";

// Import ThemeProvider for managing dark/light mode across the app
import { ThemeProvider } from "./components/ThemeContext";

// Import Bootstrap CSS for styling
import "bootstrap/dist/css/bootstrap.min.css";

// Import custom styles (optional)
import "./index.css";

// Create a root DOM node to render the React app
const root = ReactDOM.createRoot(document.getElementById("root")!);

// Render the App wrapped in ThemeProvider (so theme is available globally)
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
