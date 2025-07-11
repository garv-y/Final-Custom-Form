// src/components/TemplateView.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";

interface SubmittedTemplate {
  id: string;
  title: string;
  submittedAt: string;
  responses: Record<string, string | string[]>;
  fields: any[];
}

const TemplateView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [form, setForm] = useState<SubmittedTemplate | null>(null);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("submittedTemplates") || "[]"
    );
    const match = saved.find((f: SubmittedTemplate) => f.id === id);
    setForm(match || null);
  }, [id]);

  if (!form) {
    return (
      <div
        className={`container py-5 min-vh-100 ${
          theme === "dark" ? "bg-dark text-white" : ""
        }`}
      >
        <h3>Template not found</h3>
        <button onClick={() => navigate("/")} className="btn btn-dark mt-3">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div
      className={`container py-5 min-vh-100 ${
        theme === "dark" ? "bg-dark text-white" : ""
      }`}
    >
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

      <p>
        <strong>Submission Time:</strong>{" "}
        {form.submittedAt
          ? new Date(form.submittedAt).toLocaleString()
          : "Unknown"}
      </p>

      <div className="mt-4">
        <h5>Submitted Data:</h5>
        <pre
          className={`p-3 rounded ${
            theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"
          }`}
        >
          {JSON.stringify(form.responses, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default TemplateView;
