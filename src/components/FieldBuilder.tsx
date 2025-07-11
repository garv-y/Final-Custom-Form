// Importing React and types
import React from "react";
import type { Field } from "../types"; // Importing the Field type for type safety
import { useTheme } from "./ThemeContext"; // Hook to get current theme (light/dark)

interface Props {
  field: Field; // The field to be edited
  updateField: (updated: Field) => void; // Callback to update the field
  deleteField: (id: string) => void; // Callback to delete the field
}

// Functional component for editing a form field
const FieldBuilder: React.FC<Props> = ({ field, updateField, deleteField }) => {
  const { theme } = useTheme(); // Get the current theme from context

  // Handle changes to the field's label
  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    updateField({ ...field, label: e.target.value });

  // Toggle the "required" property of the field
  const handleRequiredChange = () =>
    updateField({ ...field, required: !field.required });

  // Update a specific option's label and value (used for dropdowns, checkboxes, etc.)
  const handleOptionChange = (index: number, value: string) => {
    const options = [...(field.options || [])]; // Copy existing options
    options[index] = { label: value, value }; // Update the specific option
    updateField({ ...field, options }); // Save the updated field
  };

  // Add a new option with default label and value
  const addOption = () =>
    updateField({
      ...field,
      options: [...(field.options || []), { label: "Option", value: "Option" }],
    });

  // Remove an option by index
  const deleteOption = (index: number) => {
    const options = field.options?.filter((_, i) => i !== index); // Filter out the option
    updateField({ ...field, options }); // Save the updated field
  };

  return (
    <div
      className={`card p-3 mb-3 ${
        theme === "dark" ? "bg-dark text-white border-light" : ""
      }`}
    >
      {/* Field Label Input */}
      <input
        className={`form-control mb-2 ${
          theme === "dark" ? "bg-dark text-white border-secondary" : ""
        }`}
        value={field.label}
        onChange={handleLabelChange}
      />

      {/* Required Checkbox */}
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          checked={field.required}
          onChange={handleRequiredChange}
        />
        <label className="form-check-label">Required</label>
      </div>

      {/* Options Editor (only visible for fields with options like dropdown, checkboxes, etc.) */}
      {field.options && (
        <div className="mt-2">
          <label className="form-label">Options:</label>
          {field.options.map((opt, i) => (
            <div className="d-flex gap-2 mb-2" key={i}>
              {/* Option label input */}
              <input
                className={`form-control ${
                  theme === "dark" ? "bg-dark text-white border-secondary" : ""
                }`}
                value={opt.label}
                onChange={(e) => handleOptionChange(i, e.target.value)}
              />
              {/* Delete option button */}
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => deleteOption(i)}
              >
                ✕
              </button>
            </div>
          ))}

          {/* Add new option button */}
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={addOption}
          >
            + Add Option
          </button>
        </div>
      )}

      {/* Delete the entire field */}
      <button
        type="button"
        className="btn btn-outline-danger btn-sm mt-3"
        onClick={() => deleteField(field.id)}
      >
        Delete Field
      </button>
    </div>
  );
};

export default FieldBuilder;
