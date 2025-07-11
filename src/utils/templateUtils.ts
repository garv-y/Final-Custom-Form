import type { Field } from "../types";

interface SavedTemplate {
  id: string;
  title: string;
  fields: Field[];
}

// Helper to convert array of strings to array of FieldOption objects
const toFieldOptions = (options: string[]) =>
  options.map((opt) => ({
    label: opt,
    value: opt.toLowerCase().replace(/\s+/g, "_"),
  }));

export const getTemplateFields = (templateId: string): Field[] => {
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
        options: toFieldOptions(["Excellent", "Good", "Average", "Poor"]),
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

  if (templateId in builtInTemplates) {
    return builtInTemplates[templateId];
  }

  const savedTemplates: SavedTemplate[] = JSON.parse(localStorage.getItem("templates") || "[]");
  const found = savedTemplates.find((t) => t.id === templateId);
  return found?.fields || [];
};
