import React from "react";
import { useNavigate } from "react-router-dom";

interface TemplateCardProps {
  template: {
    id: string;
    title: string;
    fields: any[];
    submittedAt?: string;
    responses?: Record<string, any>;
  };
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const navigate = useNavigate();

  const formattedDate = template.submittedAt
    ? new Date(template.submittedAt).toLocaleString()
    : "N/A";

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{template.title}</h5>

          {template.submittedAt && (
            <p className="card-text text-muted small">
              Submitted on: {formattedDate}
            </p>
          )}

          {template.responses && Object.keys(template.responses).length > 0 && (
            <div className="bg-light p-2 rounded">
              <h6 className="mb-1">Submitted Data:</h6>
              <pre
                className="m-0"
                style={{ whiteSpace: "pre-wrap", fontSize: "0.85rem" }}
              >
                {JSON.stringify(template.responses, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <button
          className="btn btn-outline-primary mt-3"
          onClick={() => navigate(`/template/${template.id}`)}
        >
          Open Template
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;
