// React component to show a clickable "New Blank Form" card
import React from "react";
import { useNavigate } from "react-router-dom"; // Hook to programmatically navigate
import { Plus } from "lucide-react"; // Plus icon from lucide icon library

// Functional component declaration
const NewFormCard: React.FC = () => {
  const navigate = useNavigate(); // Hook to control route navigation

  // Handler function when the card is clicked
  const handleCreateForm = () => {
    navigate("/form"); // Navigates to the form builder route
  };

  return (
    // Card container
    <div
      onClick={handleCreateForm} // Clicking this whole div triggers form creation
      className="w-48 h-60 border border-gray-300 bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md hover:shadow-xl cursor-pointer flex flex-col justify-center items-center transition-all"
    >
      <div className="flex flex-col items-center">
        {/* Circle with a plus icon inside */}
        <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex justify-center items-center mb-3">
          <Plus size={28} /> {/* Plus icon from lucide-react */}
        </div>
        {/* Text label under the icon */}
        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Blank Form
        </p>
      </div>
    </div>
  );
};

export default NewFormCard;
