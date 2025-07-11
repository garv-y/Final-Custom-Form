// Import React and necessary hooks
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Used to get URL parameters and navigate between routes
import { useTheme } from "./ThemeContext"; // Custom hook for light/dark theme handling

// Interface defining the structure of a submitted template object
interface SubmittedTemplate {
  id: string;
  title: string;
  submittedAt: string;
  responses: Record<string, string | string[]>; // Submitted field responses
  fields: any[]; // Form field structure (not used in this view)
}

// TemplateView component definition
const TemplateView: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get `id` from URL
  const navigate = useNavigate(); // Hook for programmatic navigation
  const { theme, toggleTheme } = useTheme(); // Get current theme and toggle function from context

  const [form, setForm] = useState<SubmittedTemplate | null>(null); // Holds the currently viewed submitted form

  // Fetch submitted form data from localStorage based on ID
  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("submittedTemplates") || "[]"
    );
    const match = saved.find((f: SubmittedTemplate) => f.id === id); // Find matching submission
    setForm(match || null); // Set form data or null if not found
  }, [id]);

  // If form not found, show error message
  if (!form) {
    return (
      <div
        className={`container py-5 min-vh-100 ${
          theme === "dark" ? "bg-dark-soft text-white" : ""
        }`}
      >
        <h3>Template not found</h3>
        <button onClick={() => navigate("/")} className="btn btn-dark mt-3">
          Back to Dashboard
        </button>
      </div>
    );
  }

  // If form is found, show form details
  return (
    <div
      className={`container py-5 min-vh-100 ${
        theme === "dark" ? "bg-dark-soft text-white" : ""
      }`}
    >
      {/* Top Bar with title and action buttons */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">{form.title}</h2>
        <div className="d-flex gap-2">
          <button
            onClick={toggleTheme}
            className={`btn ${
              theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
            }`}
          >
            Switch to {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
          <button
            onClick={() => navigate("/")}
            className={`btn ${
              theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
            }`}
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Submission timestamp */}
      <p>
        <strong>Submission Time:</strong>{" "}
        {form.submittedAt
          ? new Date(form.submittedAt).toLocaleString()
          : "Unknown"}
      </p>

      {/* Display submitted responses as formatted JSON */}
      <div className="mt-4">
        <h5>Submitted Data:</h5>
        <pre
          className={`p-3 rounded ${
            theme === "dark" ? "bg-dark-soft text-white" : "bg-light text-dark"
          }`}
        >
          {JSON.stringify(form.responses, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default TemplateView; // Export component for use in routes
