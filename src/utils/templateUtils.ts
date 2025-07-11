import type { Field } from "../types";

interface SavedTemplate {
  id: string;
  title: string;
  fields: Field[];
}

export const getTemplateFields = (templateId: string): Field[] => {
  // Step 1: Built-in templates
  const builtInTemplates: Record<string, Field[]> = {
    feedback: [
      { id: 1, type: "header", label: "Feedback Form", required: false },
      { id: 2, type: "paragraph", label: "We value your feedback. Please answer the following:", required: false },
      { id: 3, type: "text", label: "Your Name", required: true },
      { id: 4, type: "dropdown", label: "How was your experience?", required: true, options: ["Excellent", "Good", "Average", "Poor"] },
      { id: 5, type: "multipleChoice", label: "Would you recommend us?", required: true, options: ["Yes", "No"] },
    ],
    registration: [
      { id: 1, type: "header", label: "Registration Form", required: false },
      { id: 2, type: "text", label: "Full Name", required: true },
      { id: 3, type: "text", label: "Email Address", required: true },
      { id: 4, type: "number", label: "Age", required: false },
      { id: 5, type: "dropdown", label: "Select Course", required: true, options: ["Web Development", "Data Science", "AI/ML", "Cybersecurity"] },
    ],
    survey: [
      { id: 1, type: "header", label: "Survey Form", required: false },
      { id: 2, type: "paragraph", label: "Please help us improve by answering a few questions.", required: false },
      { id: 3, type: "multipleChoice", label: "How did you find us?", required: true, options: ["Google", "Friend", "Advertisement", "Other"] },
      { id: 4, type: "checkboxes", label: "Which features did you use?", required: false, options: ["Form Builder", "Live Preview", "Templates", "Theme Switcher"] },
      { id: 5, type: "text", label: "Any additional comments?", required: false },
    ],
  };

  // Step 2: Return built-in template if ID matches
  if (templateId in builtInTemplates) {
    return builtInTemplates[templateId];
  }

  // Step 3: Otherwise, try to find in saved templates
  const savedTemplates: SavedTemplate[] = JSON.parse(localStorage.getItem("templates") || "[]");

  const found = savedTemplates.find((t) => t.id === templateId);
  return found?.fields || [];
};
