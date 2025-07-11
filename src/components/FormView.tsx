import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";

interface FormData {
  id: number;
  title: string;
  timestamp: string;
  data: Record<number, string | string[]>;
  fields: any[];
}

const FormView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentForms") || "[]");
    const matchedForm = saved.find((f: FormData) => f.id.toString() === id);
    setForm(matchedForm || null);
  }, [id]);

  if (!form) {
    return (
      <div
        className={`container py-5 min-vh-100 ${
          theme === "dark" ? "bg-dark text-white" : ""
        }`}
      >
        <h3>Form not found</h3>
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
      {/* Header Buttons */}
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
        {new Date(form.timestamp).toLocaleString()}
      </p>

      <div className="mt-4">
        <h5>Submitted Data:</h5>
        <pre
          className={`p-3 rounded ${
            theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"
          }`}
        >
          {JSON.stringify(form.data, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default FormView;
