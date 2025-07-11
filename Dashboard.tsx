// src/components/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";

interface RecentForm {
  id: number;
  title: string;
  timestamp: string;
  isDeleted?: boolean;
}

interface SavedTemplate {
  id: string;
  title: string;
  fields: any[];
  isDeleted?: boolean;
}

interface SubmittedTemplate {
  id: string;
  title: string;
  submittedAt: string;
  responses: Record<string, string | string[]>;
  fields: any[];
  isDeleted?: boolean;
}

const Dashboard: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [recentForms, setRecentForms] = useState<RecentForm[]>([]);
  const [savedTemplates, setSavedTemplates] = useState<SavedTemplate[]>([]);
  const [submittedTemplates, setSubmittedTemplates] = useState<
    SubmittedTemplate[]
  >([]);

  useEffect(() => {
    const forms = JSON.parse(localStorage.getItem("recentForms") || "[]");
    setRecentForms(forms.filter((f: RecentForm) => !f.isDeleted));

    const templates = JSON.parse(localStorage.getItem("templates") || "[]");
    setSavedTemplates(templates.filter((t: SavedTemplate) => !t.isDeleted));
  }, []);

  const softDeleteForm = (id: number) => {
    const forms = JSON.parse(localStorage.getItem("recentForms") || "[]");
    const updated = forms.map((f: RecentForm) =>
      f.id === id ? { ...f, isDeleted: true } : f
    );
    localStorage.setItem("recentForms", JSON.stringify(updated));
    setRecentForms(updated.filter((f: RecentForm) => !f.isDeleted));
  };

  const softDeleteTemplate = (id: string) => {
    const templates = JSON.parse(localStorage.getItem("templates") || "[]");
    const updated = templates.map((t: SavedTemplate) =>
      t.id === id ? { ...t, isDeleted: true } : t
    );
    localStorage.setItem("templates", JSON.stringify(updated));
    setSavedTemplates(updated.filter((t: SavedTemplate) => !t.isDeleted));
  };

  const softDeleteSubmission = (id: string) => {
    const submissions = JSON.parse(
      localStorage.getItem("submittedTemplates") || "[]"
    );
    const updated = submissions.map((s: SubmittedTemplate) =>
      s.id === id ? { ...s, isDeleted: true } : s
    );
    localStorage.setItem("submittedTemplates", JSON.stringify(updated));
    setSubmittedTemplates(
      updated.filter((s: SubmittedTemplate) => !s.isDeleted)
    );
  };

  const defaultTemplates = [
    { id: "feedback", name: "Feedback Form" },
    { id: "registration", name: "Registration Form" },
    { id: "survey", name: "Survey Form" },
  ];

  return (
    <div
      className={`container-fluid py-4 min-vh-100 ${
        theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"
      }`}
    >
      {/* Navbar */}
      <nav
        className={`navbar navbar-expand-lg mb-5 px-3 py-3 rounded ${
          theme === "dark"
            ? "bg-dark-soft navbar-dark"
            : "bg-white navbar-light"
        }`}
      >
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-3">Forms Dashboard</span>
          <div className="d-flex gap-2">
            <Link to="/form-builder">
              <button className="btn btn-outline-primary">+ Blank Form</button>
            </Link>
            <button
              className={`btn ${
                theme === "light" ? "btn-outline-dark" : "btn-outline-light"
              }`}
              onClick={toggleTheme}
            >
              Switch To {theme === "light" ? "Dark" : "Light"} Mode
            </button>
            <Link to="/trash">
              <button className="btn btn-outline-danger">View Trash</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Default Templates */}
      <h4 className="mb-4">Start with a Template</h4>
      <div className="row">
        {defaultTemplates.map((template) => (
          <div className="col-md-4 mb-4" key={template.id}>
            <Link
              to={`/template/${template.id}`}
              className="text-decoration-none"
            >
              <div
                className={`card h-100 shadow-sm border-0 ${
                  theme === "dark"
                    ? "bg-dark-soft text-white"
                    : "bg-white text-dark"
                }`}
              >
                <div className="card-body">
                  <h5 className="card-title">{template.name}</h5>
                  <p className="card-text">
                    Start with a ready-made structure.
                  </p>
                  <button className="btn btn-outline-primary btn-sm">
                    Use Template
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Saved Templates */}
      {savedTemplates.length > 0 && (
        <>
          <h4 className="mt-5 mb-4">Your Saved Templates</h4>
          <div className="row">
            {savedTemplates.map((template) => (
              <div className="col-md-4 mb-4" key={template.id}>
                <div
                  className={`card h-100 shadow-sm border-0 ${
                    theme === "dark"
                      ? "bg-dark-soft text-white"
                      : "bg-white text-dark"
                  }`}
                >
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title">{template.title}</h5>
                      <p className="card-text">Custom template you created.</p>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                      <Link
                        to={`/template/${template.id}`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        Use
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => softDeleteTemplate(template.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Submitted Templates */}
      {submittedTemplates.length > 0 && (
        <>
          <h4 className="mt-5 mb-4">Submitted Templates</h4>
          <div className="row">
            {submittedTemplates.map((submission) => (
              <div className="col-md-4 mb-4" key={submission.id}>
                <div
                  className={`card h-100 shadow-sm border-0 ${
                    theme === "dark"
                      ? "bg-dark-soft text-white"
                      : "bg-white text-dark"
                  }`}
                >
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title">{submission.title}</h5>
                      <p className="card-text">
                        Submitted at:{" "}
                        {new Date(submission.submittedAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                      <Link
                        to={`/submission/${submission.id}`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        View
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => softDeleteSubmission(submission.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Recent Forms */}
      <hr className="my-5" />
      <h4 className="mb-3">Recent Forms</h4>
      {recentForms.length === 0 ? (
        <div
          className={`alert ${
            theme === "dark"
              ? "bg-dark-soft text-light border-dark"
              : "alert-light"
          }`}
        >
          No recent forms yet.
        </div>
      ) : (
        <div className="row">
          {recentForms.map((form) => (
            <div className="col-md-4 mb-4" key={form.id}>
              <div
                className={`card h-100 shadow-sm border-0 ${
                  theme === "dark"
                    ? "bg-dark-soft text-white"
                    : "bg-white text-dark"
                }`}
              >
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{form.title}</h5>
                    <p className="card-text">
                      Submitted on: {new Date(form.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <Link
                      to={`/view/${form.id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      Open
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => softDeleteForm(form.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
