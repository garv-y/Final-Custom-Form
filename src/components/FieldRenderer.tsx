// Component to render different types of form fields dynamically
import React from "react";
import type { Field } from "../types";

// Props accepted by FieldRenderer
interface FieldRendererProps {
  field: Field; // Field configuration (type, label, options, etc.)
  value?: string | string[]; // Current value or values (for checkboxes/tags)
  onChange: (value: string | string[]) => void; // Callback when input changes
  error?: boolean; // Whether the field is in an error state (required but empty)
  darkMode?: boolean; // Optional: future enhancement for styling
}

// Component for rendering a form field based on its type
const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  value,
  onChange,
  error = false,
}) => {
  const { label } = field;

  // Function to render error message if the field is required and left empty
  const renderError = () =>
    error && <small className="text-danger">This field is required.</small>;

  // Classes used by inputs to show validation UI
  const baseInputClass = `form-control ${error ? "is-invalid" : ""}`;
  const borderCheckClass = `${error ? "border border-danger" : ""}`;

  // Main switch block that renders field based on its type
  switch (field.type) {
    case "header":
      return (
        <div className="mb-3">
          <h4>{value || label}</h4> {/* Header text only */}
        </div>
      );

    case "label":
      return (
        <div className="mb-3">
          <label className="form-label fw-bold">{value || label}</label>{" "}
          {/* Static label */}
        </div>
      );

    case "paragraph":
      return (
        <div className="mb-3">
          <p>{value || label}</p> {/* Informative paragraph */}
        </div>
      );

    case "linebreak":
      return <hr />; // Visual separator, no input

    case "text":
      return (
        <div className="mb-3">
          <label>{field.label}</label>
          <input
            type="text"
            className={baseInputClass}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
          />
          {renderError()}
        </div>
      );

    case "number":
      return (
        <div className="mb-3">
          <label>{field.label}</label>
          <input
            type="number"
            className={baseInputClass}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
          />
          {renderError()}
        </div>
      );

    case "dropdown":
      return (
        <div className="mb-3">
          <label>{field.label}</label>
          <select
            className={baseInputClass}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">Select...</option>
            {field.options?.map((opt, i) => (
              <option key={i} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {renderError()}
        </div>
      );

    case "checkboxes":
      return (
        <div className="mb-3">
          <label className="d-block">{field.label}</label>
          {field.options?.map((opt, i) => (
            <div key={i} className="form-check">
              <input
                className={`form-check-input ${borderCheckClass}`}
                type="checkbox"
                checked={Array.isArray(value) && value.includes(opt.value)}
                onChange={(e) => {
                  const current = Array.isArray(value) ? value : [];
                  if (e.target.checked) {
                    onChange([...current, opt.value]);
                  } else {
                    onChange(current.filter((v) => v !== opt.value));
                  }
                }}
              />
              <label className="form-check-label">{opt.label}</label>
            </div>
          ))}
          {renderError()}
        </div>
      );

    case "multipleChoice":
      return (
        <div className="mb-3">
          <label className="d-block">{field.label}</label>
          {field.options?.map((opt, i) => (
            <div key={i} className="form-check">
              <input
                className={`form-check-input ${borderCheckClass}`}
                type="radio"
                name={`field-${field.id}`} // Grouping radios by field ID
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange(opt.value)}
              />
              <label className="form-check-label">{opt.label}</label>
            </div>
          ))}
          {renderError()}
        </div>
      );

    case "tags":
      return (
        <div className="mb-3">
          <label className="form-label d-block">{label}</label>
          <div className="d-flex flex-wrap gap-2">
            {field.options?.map((opt, idx) => {
              const selected =
                Array.isArray(value) && value.includes(opt.value);
              return (
                <span
                  key={idx}
                  className={`badge rounded-pill px-3 py-2 ${
                    selected ? "bg-primary" : "bg-secondary"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    const current = Array.isArray(value) ? value : [];
                    if (selected) {
                      onChange(current.filter((v) => v !== opt.value));
                    } else {
                      onChange([...current, opt.value]);
                    }
                  }}
                >
                  {opt.label}
                </span>
              );
            })}
          </div>
          {renderError()}
        </div>
      );

    default:
      return null; // For unsupported types (should not occur)
  }
};

export default FieldRenderer;
