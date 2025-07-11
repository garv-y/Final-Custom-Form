import React from "react";
import { useNavigate } from "react-router-dom";

interface TemplateCardProps {
  template: {
    id: string;
    title: string;
    fields: any[];
  };
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const navigate = useNavigate();

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title">{template.title}</h5>
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
