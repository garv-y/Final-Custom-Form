import React from "react";
import type { Field } from "../types";
import { useTheme } from "./ThemeContext";

interface Props {
  field: Field;
  updateField: (updated: Field) => void;
  deleteField: (id: string) => void;
}

const FieldBuilder: React.FC<Props> = ({ field, updateField, deleteField }) => {
  const { theme } = useTheme();

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    updateField({ ...field, label: e.target.value });

  const handleRequiredChange = () =>
    updateField({ ...field, required: !field.required });

  const handleOptionChange = (index: number, value: string) => {
    const options = [...(field.options || [])];
    options[index] = { label: value, value };
    updateField({ ...field, options });
  };

  const addOption = () =>
    updateField({
      ...field,
      options: [...(field.options || []), { label: "Option", value: "Option" }],
    });

  const deleteOption = (index: number) => {
    const options = field.options?.filter((_, i) => i !== index);
    updateField({ ...field, options });
  };

  return (
    <div
      className={`card p-3 mb-3 ${
        theme === "dark" ? "bg-dark text-white border-light" : ""
      }`}
    >
      <input
        className={`form-control mb-2 ${
          theme === "dark" ? "bg-dark text-white border-secondary" : ""
        }`}
        value={field.label}
        onChange={handleLabelChange}
      />
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          checked={field.required}
          onChange={handleRequiredChange}
        />
        <label className="form-check-label">Required</label>
      </div>

      {field.options && (
        <div className="mt-2">
          <label className="form-label">Options:</label>
          {field.options.map((opt, i) => (
            <div className="d-flex gap-2 mb-2" key={i}>
              <input
                className={`form-control ${
                  theme === "dark" ? "bg-dark text-white border-secondary" : ""
                }`}
                value={opt.label}
                onChange={(e) => handleOptionChange(i, e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => deleteOption(i)}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={addOption}
          >
            + Add Option
          </button>
        </div>
      )}

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
