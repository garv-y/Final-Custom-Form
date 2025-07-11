// src/components/FAB.tsx
import React, { useState } from "react";
import type { Field } from "../types";
import { useTheme } from "./ThemeContext";

interface FABProps {
  onAddField: (type: Field["type"]) => void;
}

const fieldTypes: Field["type"][] = [
  "header",
  "paragraph",
  "label",
  "text",
  "number",
  "dropdown",
  "checkboxes",
  "multipleChoice",
  "tags",
  "linebreak",
];

const FAB: React.FC<FABProps> = ({ onAddField }) => {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      {/* Popup Panel */}
      {open && (
        <div
          className={`card p-3 shadow ${
            theme === "dark" ? "bg-dark text-white" : ""
          }`}
          style={{
            minWidth: "220px",
            position: "relative",
            paddingTop: "2.5rem",
          }}
        >
          {/* Close Button inside top-right of dialog */}
          <button
            className="btn btn-primary rounded-circle"
            style={{
              position: "absolute",
              top: "-18px",
              right: "-18px",
              width: 40,
              height: 40,
              zIndex: 10,
            }}
            onClick={() => setOpen(false)}
            title="Close"
          >
            ×
          </button>

          <strong className="mb-2">Add Field</strong>
          {fieldTypes.map((type) => (
            <button
              key={type}
              className="btn btn-sm btn-outline-primary my-1 w-100 text-start"
              onClick={() => {
                onAddField(type);
                setOpen(false);
              }}
            >
              + {type}
            </button>
          ))}
        </div>
      )}

      {/* FAB trigger always shown */}
      {!open && (
        <button
          className="btn btn-outline-primary rounded-circle"
          style={{ width: 56, height: 56 }}
          onClick={() => setOpen(true)}
          title="Add Field"
        >
          +
        </button>
      )}
    </div>
  );
};

export default FAB;
