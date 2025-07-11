import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // To access URL parameters and navigate programmatically
import { useTheme } from "../components/ThemeContext"; // Custom hook to access theme and toggle it

// Type definition for a saved form's data structure
interface FormData {
  id: string;
  title: string;
  timestamp?: string;
  responses?: Record<string, string | string[]>; // Stores question: answer(s)
  fields?: any[]; // Optional – present if needed for display (not used here)
  isDeleted?: boolean; // Optional – helpful for soft-deletion
}

const FormView: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get form ID from URL
  const { theme, toggleTheme } = useTheme(); // Get current theme and toggler
  const navigate = useNavigate(); // Hook to navigate between routes

  const [form, setForm] = useState<FormData | null>(null); // Holds the form data to display

  // Fetch form data from localStorage based on ID in URL
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentForms") || "[]"); // Get saved forms
    const matchedForm = saved.find((f: FormData) => f.id.toString() === id); // Match form by ID
    setForm(matchedForm || null); // Set form state
  }, [id]);

  // If no form is found, show fallback UI
  if (!form) {
    return (
      <div
        className={`container py-5 min-vh-100 ${
          theme === "dark" ? "bg-dark-soft text-white" : ""
        }`}
      >
        <h3>Form not found</h3>
        <button onClick={() => navigate("/")} className="btn btn-dark mt-3">
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Format timestamp if available, otherwise show "Unknown"
  let formattedDate = "Unknown";
  if (form.timestamp) {
    const parsed = new Date(form.timestamp);
    if (!isNaN(parsed.getTime())) {
      formattedDate = parsed.toLocaleString(); // Localized readable date
    }
  }

  return (
    <div
      className={`container py-5 min-vh-100 ${
        theme === "dark" ? "bg-dark-soft text-white" : ""
      }`}
    >
      {/* Page Header with Title and Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">{form.title}</h2>
        <div className="d-flex gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`btn ${
              theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
            }`}
          >
            Switch to {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
          {/* Back to Dashboard */}
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

      {/* Timestamp of submission */}
      <p>
        <strong>Submission Time:</strong> {formattedDate}
      </p>

      {/* Submitted Answers Section */}
      <div className="mt-4">
        <h5>Submitted Data:</h5>
        <pre
          className={`p-3 rounded ${
            theme === "dark" ? "bg-dark-soft text-white" : "bg-light text-dark"
          }`}
        >
          {/* If there are any responses, render them as a list */}
          {form.responses && Object.keys(form.responses).length > 0 ? (
            <ul className="list-group">
              {Object.entries(form.responses).map(([label, val]) => (
                <li key={label} className="list-group-item">
                  <strong>{label}: </strong>
                  {Array.isArray(val) ? val.join(", ") : val}{" "}
                  {/* Handle arrays and single values */}
                </li>
              ))}
            </ul>
          ) : (
            // Fallback message if no responses
            <p>No responses submitted.</p>
          )}
        </pre>
      </div>
    </div>
  );
};

export default FormView;
