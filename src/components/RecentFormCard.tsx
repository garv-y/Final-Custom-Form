import React from "react";
import { useTheme } from "./ThemeContext";

interface RecentFormCardProps {
  form: {
    id: string;
    title: string;
    timestamp: string;
    data: Record<string, string | string[]>;
    fields: any[]; // Optional: replace with Field[] if you have a type
    isDeleted?: boolean;
  };
  onDelete: (id: string) => void;
}

const RecentFormCard: React.FC<RecentFormCardProps> = ({ form, onDelete }) => {
  const { theme } = useTheme();

  let formattedDate = "Unknown";
  if (form.timestamp) {
    const parsed = new Date(form.timestamp);
    if (!isNaN(parsed.getTime())) {
      formattedDate = parsed.toLocaleString();
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
        borderColor: theme === "dark" ? "#444" : "#ccc",
      }}
    >
      <div className="card-body">
        <h5 className="card-title">{form.title}</h5>
        <p
          className={`card-text ${
            theme === "dark" ? "text-light" : "text-muted"
          } small`}
        >
          Submitted on: {formattedDate}
        </p>

        {form.data && Object.keys(form.data).length > 0 && (
          <div
            className={`p-2 rounded mb-2 ${
              theme === "dark"
                ? "bg-dark-subtle text-light border border-secondary"
                : "bg-light text-dark border border-light"
            }`}
          >
            <h6 className="mb-2 fw-semibold">Submitted Data:</h6>
            <pre
              className="m-0"
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "0.85rem",
                backgroundColor: theme === "dark" ? "#1f1f1f" : "#f8f9fa",
                padding: "0.75rem",
                borderRadius: "6px",
              }}
            >
              {JSON.stringify(form.data, null, 2)}
            </pre>
          </div>
        )}

        <div className="d-flex justify-content-between">
          <a
            href={`/view/${form.id}`}
            className="btn btn-sm btn-outline-primary"
          >
            Open
          </a>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(form.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentFormCard;
