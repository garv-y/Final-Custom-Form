import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import FormBuilder from "./components/FormBuilder";
import FormView from "./components/FormView";
import { ThemeProvider } from "./components/ThemeContext";
import TemplateForm from "./components/TemplateForm";
import Trash from "./components/Trash";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/form-builder" element={<FormBuilder />} />
          <Route path="/view/:id" element={<FormView />} />
          <Route path="/template/:id" element={<TemplateForm />} />
          <Route path="/trash" element={<Trash />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
