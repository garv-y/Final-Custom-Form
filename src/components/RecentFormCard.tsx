import React from "react";
import { useTheme } from "./ThemeContext"; // Access current theme (light/dark)

// Props definition for the RecentFormCard component
interface RecentFormCardProps {
  form: {
    id: string; // Unique form ID (used for viewing or deleting)
    title: string; // Form title
    timestamp: string; // Submission date/time
    data: Record<string, string | string[]>; // Submitted data
    fields: any[]; // Optional: use Field[] type if defined
    isDeleted?: boolean; // Optional flag for soft-deletion logic
  };
  onDelete: (id: string) => void; // Callback function when Delete is clicked
}

// Functional component to show a summary card for a recently submitted form
const RecentFormCard: React.FC<RecentFormCardProps> = ({ form, onDelete }) => {
  const { theme } = useTheme(); // Get the active theme (light/dark)

  // Format the timestamp into a readable local format
  let formattedDate = "Unknown";
  if (form.timestamp) {
    const parsed = new Date(form.timestamp);
    if (!isNaN(parsed.getTime())) {
      formattedDate = parsed.toLocaleString(); // Localized string (date + time)
    }
  }

  return (
    <div
      className={`card h-100 ${
        theme === "dark" ? "bg-dark-soft text-white" : ""
      }`}
      style={{
        borderRadius: "10px",
        border: "1px solid",
        borderColor: theme === "dark" ? "#444" : "#ccc", // Border color adjusts based on theme
      }}
    >
      <div className="card-body">
        {/* Form title */}
        <h5 className="card-title">{form.title}</h5>

        {/* Timestamp */}
        <p
          className={`card-text ${
            theme === "dark" ? "text-light" : "text-muted"
          } small`}
        >
          Submitted on: {formattedDate}
        </p>

        {/* If there is submitted data, display it */}
        {form.data && Object.keys(form.data).length > 0 && (
          <div
            className={`p-2 rounded mb-2 ${
              theme === "dark"
                ? "bg-dark-soft text-light border border-secondary"
                : "bg-light text-dark border border-light"
            }`}
          >
            <h6 className="mb-2 fw-semibold">Submitted Data:</h6>
            <pre
              className="m-0"
              style={{
                whiteSpace: "pre-wrap", // Allows line breaks in long text
                fontSize: "0.85rem", // Slightly smaller for better compact view
                backgroundColor: theme === "dark" ? "#1f1f1f" : "#f8f9fa", // Custom background
                padding: "0.75rem",
                borderRadius: "6px",
              }}
            >
              {/* Nicely formatted submitted values */}
              {JSON.stringify(form.data, null, 2)}
            </pre>
          </div>
        )}

        {/* Footer: Open and Delete actions */}
        <div className="d-flex justify-content-between">
          <a
            href={`/view/${form.id}`} // Navigates to the detailed view page
            className="btn btn-sm btn-outline-primary"
          >
            Open
          </a>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(form.id)} // Triggers deletion callback
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentFormCard;
