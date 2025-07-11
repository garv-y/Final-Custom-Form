import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const NewFormCard: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateForm = () => {
    navigate("/form"); // Navigates to the form builder
  };

  return (
    <div
      onClick={handleCreateForm}
      className="w-48 h-60 border border-gray-300 bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md hover:shadow-xl cursor-pointer flex flex-col justify-center items-center transition-all"
    >
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex justify-center items-center mb-3">
          <Plus size={28} />
        </div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Blank Form
        </p>
      </div>
    </div>
  );
};

export default NewFormCard;
