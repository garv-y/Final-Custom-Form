import React from "react";
import { useNavigate } from "react-router-dom"; // Hook for programmatic navigation

// Props type definition for the TemplateCard component
interface TemplateCardProps {
  template: {
    id: string; // Unique ID of the template
    title: string; // Display title of the template
    fields: any[]; // The structure of the form fields (not shown here)
    submittedAt?: string; // Optional timestamp when the form was submitted
    responses?: Record<string, any>; // Optional submitted answers (key = label, value = answer)
  };
}

// Functional component to display a template card
const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const navigate = useNavigate(); // Used to navigate to the template view page

  // Format the submission timestamp (if present) to a readable string
  const formattedDate = template.submittedAt
    ? new Date(template.submittedAt).toLocaleString()
    : "N/A"; // Fallback if not submitted

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          {/* Display the title of the template */}
          <h5 className="card-title">{template.title}</h5>

          {/* If a submission date exists, show it */}
          {template.submittedAt && (
            <p className="card-text text-muted small">
              Submitted on: {formattedDate}
            </p>
          )}

          {/* If responses exist, show them formatted as a preview */}
          {template.responses && Object.keys(template.responses).length > 0 && (
            <div className="bg-light p-2 rounded">
              <h6 className="mb-1">Submitted Data:</h6>
              <pre
                className="m-0"
                style={{ whiteSpace: "pre-wrap", fontSize: "0.85rem" }}
              >
                {JSON.stringify(template.responses, null, 2)}{" "}
                {/* Pretty-print the responses */}
              </pre>
            </div>
          )}
        </div>

        {/* Button to open the template details using the router */}
        <button
          className="btn btn-outline-primary mt-3"
          onClick={() => navigate(`/template/${template.id}`)} // Navigate to /template/:id
        >
          Open Template
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;
