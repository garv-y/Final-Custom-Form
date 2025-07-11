import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FieldBuilder from "./FieldBuilder";
import FieldRenderer from "./FieldRenderer";
import { useTheme } from "./ThemeContext";
import type { FieldConfig, FieldType } from "../types";

const FormBuilder: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [formTitle, setFormTitle] = useState("My Custom Form");
  const [fields, setFields] = useState<FieldConfig[]>([]);
  const [formResponses, setFormResponses] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submittedData, setSubmittedData] = useState<Record<
    string,
    any
  > | null>(null);
  const [useShortForm, setUseShortForm] = useState(false);

  useEffect(() => {
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(`${theme}-mode`);
  }, [theme]);

  const addField = (type: FieldType) => {
    const id = Date.now().toString();
    const newField: FieldConfig = {
      id,
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      required: false,
      displayOnShortForm: false,
      options: ["dropdown", "tags", "checkboxes", "multipleChoice"].includes(
        type
      )
        ? [
            { label: "Option 1", value: "option_1" },
            { label: "Option 2", value: "option_2" },
          ]
        : undefined,
    };
    setFields((prev) => [...prev, newField]);
  };

  const updateField = (updatedField: FieldConfig) => {
    setFields((prev) =>
      prev.map((f) => (f.id === updatedField.id ? updatedField : f))
    );
  };

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, boolean> = {};
    const result: Record<string, any> = {};

    fields.forEach((field) => {
      if (!useShortForm || field.displayOnShortForm) {
        const value = formResponses[field.id];

        const isEmpty =
          value === undefined ||
          value === "" ||
          (Array.isArray(value) && value.length === 0);

        if (field.required && isEmpty) {
          newErrors[field.id] = true;
        }

        result[field.label || `Field ${field.id}`] = value;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmittedData(result);
    localStorage.setItem("submittedData", JSON.stringify(result));

    const newEntry = {
      id: Date.now().toString(),
      title: formTitle,
      timestamp: new Date().toISOString(),
      responses: result,
      fields,
    };

    const existing = JSON.parse(localStorage.getItem("recentForms") || "[]");
    localStorage.setItem(
      "recentForms",
      JSON.stringify([newEntry, ...existing])
    );
  };

  return (
    <div className="d-flex">
      {/* Left Builder Section */}
      <div className="container mt-4 flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="mb-0">Form Builder</h3>
          <div className="d-flex gap-2 ms-auto">
            <button
              className={`btn ${
                theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
              }`}
              onClick={toggleTheme}
            >
              Switch to {theme === "light" ? "Dark" : "Light"} Theme
            </button>
            <button
              className={`btn ${
                theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
              }`}
              onClick={() => navigate("/")}
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label">Form Title</label>
          <input
            type="text"
            className="form-control"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="mb-4 border rounded p-3 dark-bg-card">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5>
                Field #{index + 1} - {field.type}
              </h5>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => removeField(field.id)}
              >
                Remove
              </button>
            </div>
            <FieldBuilder
              field={field}
              updateField={updateField}
              deleteField={removeField}
            />
          </div>
        ))}

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="shortFormToggle"
            checked={useShortForm}
            onChange={(e) => setUseShortForm(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="shortFormToggle">
            Show Short Form Only
          </label>
        </div>

        {/* Live Preview */}
        <div className="p-4 border rounded shadow-sm dark-bg-card form-preview">
          <h4 className="mb-3">Live Preview</h4>
          <h5>{formTitle}</h5>
          <form onSubmit={handleSubmit}>
            {fields
              .filter((f) => !useShortForm || f.displayOnShortForm)
              .map((f) => (
                <FieldRenderer
                  key={f.id}
                  field={f}
                  value={formResponses[f.id]}
                  onChange={(val) => {
                    setFormResponses((prev) => ({ ...prev, [f.id]: val }));
                    setErrors((prev) => ({ ...prev, [f.id]: false }));
                  }}
                  error={errors[f.id] || false}
                />
              ))}
            <button
              type="submit"
              className={`btn mt-3 ${
                theme === "dark" ? "btn-outline-success" : "btn-outline-success"
              }`}
            >
              Submit
            </button>
          </form>
        </div>

        {submittedData && (
          <div className="mt-4">
            <h5>Submitted Data:</h5>
            <pre className="p-3 border rounded dark-bg-card">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Right Toolbox Sidebar */}
      <div
        className="toolbox-sidebar border-start p-3 dark-bg-card form-preview"
        style={{ width: "250px" }}
      >
        <h5 className="mb-3">Toolbox</h5>
        <ul className="list-unstyled">
          {[
            "header",
            "label",
            "paragraph",
            "linebreak",
            "dropdown",
            "tags",
            "checkboxes",
            "multipleChoice",
            "text",
            "number",
          ].map((type) => (
            <li key={type}>
              <button
                className={`btn w-100 mb-2 shadow-sm form-preview ${
                  theme === "dark"
                    ? "bg-dark-soft text-white"
                    : "bg-white text-dark"
                }`}
                onClick={() => addField(type as FieldType)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FormBuilder;
