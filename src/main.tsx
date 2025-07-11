import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./components/ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"; // Your own styles if any

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
