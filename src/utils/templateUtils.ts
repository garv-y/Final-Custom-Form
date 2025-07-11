// Import the Field type definition from the central types file
import type { Field } from "../types";

// Define the structure of a saved template stored in localStorage
interface SavedTemplate {
  id: string;
  title: string;
  fields: Field[];
}

// Utility function to convert a list of strings into FieldOption objects
// (e.g. ["Yes", "No"] → [{ label: "Yes", value: "yes" }, ...])
const toFieldOptions = (options: string[]) =>
  options.map((opt) => ({
    label: opt,
    value: opt.toLowerCase().replace(/\s+/g, "_"), // lowercase + spaces to underscores for value
  }));

// Main function to return fields based on a given template ID
export const getTemplateFields = (templateId: string): Field[] => {
  // Define built-in templates as an object with template ID keys
  const builtInTemplates: Record<string, Field[]> = {
    feedback: [
      { id: "1", type: "header", label: "Feedback Form", required: false },
      { id: "2", type: "paragraph", label: "We value your feedback. Please answer the following:", required: false },
      { id: "3", type: "text", label: "Your Name", required: true },
      {
        id: "4",
        type: "dropdown",
        label: "How was your experience?",
        required: true,
        options: toFieldOptions(["Excellent", "Good", "Average", "Poor"]), // options mapped using helper
      },
      {
        id: "5",
        type: "multipleChoice",
        label: "Would you recommend us?",
        required: true,
        options: toFieldOptions(["Yes", "No"]),
      },
    ],
    registration: [
      { id: "1", type: "header", label: "Registration Form", required: false },
      { id: "2", type: "text", label: "Full Name", required: true },
      { id: "3", type: "text", label: "Email Address", required: true },
      { id: "4", type: "number", label: "Age", required: false },
      {
        id: "5",
        type: "dropdown",
        label: "Select Course",
        required: true,
        options: toFieldOptions(["Web Development", "Data Science", "AI/ML", "Cybersecurity"]),
      },
    ],
    survey: [
      { id: "1", type: "header", label: "Survey Form", required: false },
      { id: "2", type: "paragraph", label: "Please help us improve by answering a few questions.", required: false },
      {
        id: "3",
        type: "multipleChoice",
        label: "How did you find us?",
        required: true,
        options: toFieldOptions(["Google", "Friend", "Advertisement", "Other"]),
      },
      {
        id: "4",
        type: "checkboxes",
        label: "Which features did you use?",
        required: false,
        options: toFieldOptions(["Form Builder", "Live Preview", "Templates", "Theme Switcher"]),
      },
      { id: "5", type: "text", label: "Any additional comments?", required: false },
    ],
  };

  // First check if the given templateId is one of the built-in templates
  if (templateId in builtInTemplates) {
    return builtInTemplates[templateId]; // Return built-in fields if matched
  }

  // If not built-in, check localStorage for saved custom templates
  const savedTemplates: SavedTemplate[] = JSON.parse(localStorage.getItem("templates") || "[]");

  // Try to find the matching custom template
  const found = savedTemplates.find((t) => t.id === templateId);

  // Return its fields if found, or empty array if not
  return found?.fields || [];
};
