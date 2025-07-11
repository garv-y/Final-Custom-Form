import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FieldRenderer from "./FieldRenderer";
import FieldBuilder from "./FieldBuilder";
import { useTheme } from "./ThemeContext";
import { getTemplateFields } from "../utils/templateUtils";
import type { Field, FieldConfig, FieldOption } from "../types";
import FAB from "./FAB";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "react-beautiful-dnd";

const TemplateForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [fields, setFields] = useState<Field[]>([]);
  const [formTitle, setFormTitle] = useState("Template Form");
  const [submittedData, setSubmittedData] = useState<
    Record<string, string | string[]>
  >({});
  const [showAlert, setShowAlert] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [templateSaved, setTemplateSaved] = useState(false);

  useEffect(() => {
    if (id) {
      const loadedFields = getTemplateFields(id).map(
        (field: any): Field => ({
          ...field,
          id: String(field.id),
          options: field.options?.map((opt: any) =>
            typeof opt === "string" ? { text: opt } : opt
          ) as FieldOption[],
        })
      );
      setFields(loadedFields);
      setFormTitle(
        loadedFields.find((f) => f.type === "header")?.label || "Template Form"
      );
    }
  }, [id]);

  const handleInputChange = (fieldId: string, value: string | string[]) => {
    setSubmittedData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = () => {
    const formSubmission = {
      id: Date.now().toString(),
      title: formTitle,
      timestamp: new Date().toISOString(),
      data: submittedData,
      fields,
    };

    const saved = JSON.parse(localStorage.getItem("recentForms") || "[]");
    localStorage.setItem(
      "recentForms",
      JSON.stringify([formSubmission, ...saved])
    );

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
    navigate(`/view/${formSubmission.id}`);
  };

  const addField = (type: Field["type"]) => {
    const newField: Field = {
      id: Date.now().toString(),
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Label`,
      required: false,
      options: ["dropdown", "checkboxes", "multipleChoice"].includes(type)
        ? [{ text: "Option 1" }, { text: "Option 2" }]
        : undefined,
    };
    setFields((prev) => [...prev, newField]);
  };

  const updateField = (updatedField: FieldConfig) => {
    setFields((prev) =>
      prev.map((f) =>
        f.id === updatedField.id
          ? {
              ...updatedField,
              id: updatedField.id,
              required: updatedField.required ?? false,
              options: updatedField.options as FieldOption[],
            }
          : f
      )
    );
  };

  const deleteField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSaveAsNewTemplate = () => {
    if (fields.length === 0) {
      alert("Cannot save an empty template.");
      return;
    }

    const templates = JSON.parse(localStorage.getItem("templates") || "[]");
    const newTemplate = {
      id: Date.now().toString(),
      title: formTitle.trim() || "Untitled Template",
      fields: [...fields],
    };

    try {
      localStorage.setItem(
        "templates",
        JSON.stringify([newTemplate, ...templates])
      );
      setTemplateSaved(true);
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      alert("Failed to save the template. Please try again.");
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const updated = [...fields];
    const [movedItem] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, movedItem);
    setFields(updated);
  };

  return (
    <div
      className={`container-fluid py-5 min-vh-100 ${
        theme === "dark" ? "bg-dark text-white" : ""
      }`}
    >
      <div className="d-flex justify-content-center">
        <div
          className="w-100"
          style={{ maxWidth: "1000px", padding: "0 1rem" }}
        >
          <div className="d-flex justify-content-end mb-4">
            <div className="d-flex flex-wrap gap-3 p-3 rounded">
              <button
                onClick={() => setEditMode((prev) => !prev)}
                className={`btn ${
                  theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
                }`}
              >
                {editMode ? "Exit Edit Mode" : "Edit Template"}
              </button>
              <button
                onClick={toggleTheme}
                className={`btn ${
                  theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
                }`}
              >
                Switch to {theme === "dark" ? "Light" : "Dark"} Mode
              </button>
              <button
                onClick={() => navigate("/")}
                className={`btn ${
                  theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
                }`}
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          {/* Fields Rendering */}
          {editMode ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="fields-droppable">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    {fields.map((field, index) => (
                      <Draggable
                        key={field.id}
                        draggableId={field.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <FieldBuilder
                              field={field}
                              updateField={updateField}
                              deleteField={deleteField}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : fields.length === 0 ? (
            <div className="alert alert-warning">
              No fields available in this template.
            </div>
          ) : (
            fields.map((field) => (
              <FieldRenderer
                key={field.id}
                field={field}
                value={submittedData[field.id]}
                onChange={(val) => handleInputChange(field.id, val)}
              />
            ))
          )}

          {/* Buttons */}
          {editMode && (
            <div className="mt-4">
              <button
                className="btn btn-outline-success"
                onClick={handleSaveAsNewTemplate}
              >
                Save as New Template
              </button>
            </div>
          )}
          {!editMode && fields.length > 0 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <button type="submit" className="btn btn-outline-success mt-4">
                Submit
              </button>
            </form>
          )}

          {/* Alerts */}
          {showAlert && (
            <div className="alert alert-success mt-4">
              Form submitted and saved!
            </div>
          )}
          {templateSaved && (
            <div className="alert alert-success mt-4">
              Template saved as new!
            </div>
          )}
        </div>
      </div>

      {editMode && <FAB onAddField={addField} />}
    </div>
  );
};

export default TemplateForm;
