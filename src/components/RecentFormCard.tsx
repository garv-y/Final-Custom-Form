import React from "react";
import { useTheme } from "./ThemeContext";

interface RecentFormCardProps {
  form: {
    id: number;
    title: string;
    timestamp: string;
    data: Record<number, string | string[]>;
  };
  onDelete: (id: number) => void;
}

const RecentFormCard: React.FC<RecentFormCardProps> = ({ form, onDelete }) => {
  const { theme } = useTheme();

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
          Submitted on: {new Date(form.timestamp).toLocaleString()}
        </p>
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
