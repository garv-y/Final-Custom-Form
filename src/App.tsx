// Import core React library and required routing components
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import all route components (pages)
import Dashboard from "./components/Dashboard";
import FormBuilder from "./components/FormBuilder";
import FormView from "./components/FormView";
import { ThemeProvider } from "./components/ThemeContext"; // Context provider for dark/light theme
import TemplateForm from "./components/TemplateForm";
import Trash from "./components/Trash";
import TemplateView from "./components/TemplateView";

// Root App component
const App: React.FC = () => {
  return (
    // Wrap entire app in ThemeProvider to enable theme context globally
    <ThemeProvider>
      {/* Router handles client-side routing */}
      <Router>
        <Routes>
          {/* Define route paths and their corresponding components */}
          <Route path="/" element={<Dashboard />} />{" "}
          {/* Home page: form dashboard */}
          <Route path="/form-builder" element={<FormBuilder />} />{" "}
          {/* Route for building a new form */}
          <Route path="/view/:id" element={<FormView />} />{" "}
          {/* View a submitted form */}
          <Route path="/template/:id" element={<TemplateForm />} />{" "}
          {/* Use/edit a saved or default template */}
          <Route path="/template-view/:id" element={<TemplateView />} />
          {/* View a submitted template */}
          <Route path="/trash" element={<Trash />} />{" "}
          {/* View deleted forms/templates */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App; // Export the App component as default
