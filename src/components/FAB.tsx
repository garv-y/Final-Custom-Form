import React, { useState } from "react";
import type { Field } from "../types"; // Importing the Field type to use its "type" for field options
import { useTheme } from "./ThemeContext"; // Access the current theme (light/dark) using context

// Define the props for the Floating Action Button (FAB)
interface FABProps {
  onAddField: (type: Field["type"]) => void; // Callback function when a field is added
}

// List of all possible field types that can be added
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
  const [open, setOpen] = useState(false); // Tracks whether the FAB menu is open
  const { theme } = useTheme(); // Get the current theme (light/dark) for styling

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      {/* Floating popup panel that opens when FAB is clicked */}
      {open && (
        <div
          className={`card p-3 shadow ${
            theme === "dark" ? "bg-dark text-white" : ""
          }`}
          style={{
            minWidth: "220px", // Minimum width of the popup
            position: "relative", // Needed for positioning the close button
            paddingTop: "2.5rem", // Give space for the close button on top
          }}
        >
          {/* Close 'X' button in the top-right corner of the popup */}
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
            onClick={() => setOpen(false)} // Close popup on click
            title="Close"
          >
            ×
          </button>

          {/* Title text above the buttons */}
          <strong className="mb-2">Add Field</strong>

          {/* Generate a button for each field type */}
          {fieldTypes.map((type) => (
            <button
              key={type}
              className="btn btn-sm btn-outline-primary my-1 w-100 text-start"
              onClick={() => {
                onAddField(type); // Call parent function to add selected field type
                setOpen(false); // Close popup after adding field
              }}
            >
              + {type} {/* Display type name */}
            </button>
          ))}
        </div>
      )}

      {/* Main floating button (FAB) – visible only when popup is closed */}
      {!open && (
        <button
          className="btn btn-outline-primary rounded-circle"
          style={{ width: 56, height: 56 }}
          onClick={() => setOpen(true)} // Open popup on click
          title="Add Field"
        >
          +
        </button>
      )}
    </div>
  );
};

export default FAB;
