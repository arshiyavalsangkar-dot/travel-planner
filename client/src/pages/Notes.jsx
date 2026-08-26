import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

import { useLanguage } from "../context/LanguageContext";

import {
  FaStickyNote,
  FaPlus,
  FaPlaneDeparture,
  FaTag,
  FaStar,
} from "react-icons/fa";

import "./Notes.css";

export default function Notes() {
  const { t, language } = useLanguage();

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
  });

  const [notes, setNotes] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // ============================
  // GET TOKEN
  // ============================

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("authToken")
    );
  };

  // ============================
  // FETCH NOTES
  // ============================

  const fetchNotes = async () => {
    try {
      const token = getToken();

      if (!token) {
        console.error("Token not found");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/notes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes(response.data.notes || []);
    } catch (error) {
      console.error(
        "Fetch Notes Error:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // ============================
  // HANDLE CHANGE
  // ============================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ============================
  // GET NOTE TITLE
  // ============================

  const getNoteTitle = (note) => {
    if (language === "Hindi") {
      return note.titleHindi || note.title;
    }

    if (language === "Marathi") {
      return note.titleMarathi || note.title;
    }

    return note.title;
  };

  // ============================
  // GET NOTE DESCRIPTION
  // ============================

  const getNoteDescription = (note) => {
    if (language === "Hindi") {
      return (
        note.descriptionHindi ||
        note.description
      );
    }

    if (language === "Marathi") {
      return (
        note.descriptionMarathi ||
        note.description
      );
    }

    return note.description;
  };

  // ============================
  // GET CATEGORY TRANSLATION
  // ============================

  const getCategory = (category) => {
    if (!category || category === "General") {
      return t("general");
    }

    switch (category) {
      case "Travel Plan":
        return t("travelPlan");

      case "Reminder":
        return t("reminder");

      case "Places To Visit":
        return t("placesToVisit");

      case "Packing Idea":
        return t("packingIdea");

      case "Other":
        return t("other");

      default:
        return category;
    }
  };

  // ============================
  // ADD / UPDATE NOTE
  // ============================

  const addNote = async (e) => {
    e.preventDefault();

    if (adding) {
      return;
    }

    if (!form.title.trim()) {
      alert(t("pleaseEnterNoteTitle"));
      return;
    }

    if (!form.description.trim()) {
      alert(t("pleaseWriteNote"));
      return;
    }

    try {
      setAdding(true);

      const token = getToken();

      if (!token) {
        alert(t("pleaseLoginFirst"));
        return;
      }

      // ============================
      // UPDATE NOTE
      // ============================

      if (editingId) {
        const response = await axios.put(
          `http://localhost:5000/api/notes/${editingId}`,
          {
            title: form.title.trim(),
            category:
              form.category || "General",
            description:
              form.description.trim(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            (note._id || note.id) ===
            editingId
              ? response.data.note
              : note
          )
        );

        setForm({
          title: "",
          category: "",
          description: "",
        });

        setEditingId(null);

        alert(
          t("noteUpdatedSuccessfully")
        );

        return;
      }

      // ============================
      // ADD NOTE
      // ============================

      const response = await axios.post(
        "http://localhost:5000/api/notes",
        {
          title: form.title.trim(),
          category:
            form.category || "General",
          description:
            form.description.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes((prevNotes) => [
        response.data.note,
        ...prevNotes,
      ]);

      setForm({
        title: "",
        category: "",
        description: "",
      });

      alert(t("noteAddedSuccessfully"));

    } catch (error) {
      console.error(
        "Note Error:",
        error.response?.data ||
          error.message
      );

      alert(
        error.response?.data?.message ||
          (editingId
            ? t("failedToUpdateNote")
            : t("failedToAddNote"))
      );

    } finally {
      setAdding(false);
    }
  };

  // ============================
  // EDIT NOTE
  // ============================

  const editNote = (note) => {
    setEditingId(
      note._id || note.id
    );

    setForm({
      title: note.title || "",
      category: note.category || "",
      description:
        note.description || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================
  // CANCEL EDIT
  // ============================

  const cancelEdit = () => {
    setEditingId(null);

    setForm({
      title: "",
      category: "",
      description: "",
    });
  };

  // ============================
  // TOGGLE IMPORTANT
  // ============================

  const toggleImportant = async (
    id,
    currentStatus
  ) => {
    try {
      const token = getToken();

      if (!token) {
        alert(t("pleaseLoginFirst"));
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/notes/${id}`,
        {
          important: !currentStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          (note._id || note.id) === id
            ? response.data.note
            : note
        )
      );

    } catch (error) {
      console.error(
        "Update Note Error:",
        error.response?.data ||
          error.message
      );

      alert(
        error.response?.data?.message ||
          t("failedToUpdateNote")
      );
    }
  };

  // ============================
  // DELETE NOTE
  // ============================

  const deleteNote = async (id) => {
    const confirmDelete =
      window.confirm(
        t("confirmDeleteNote")
      );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = getToken();

      if (!token) {
        alert(t("pleaseLoginFirst"));
        return;
      }

      await axios.delete(
        `http://localhost:5000/api/notes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes((prevNotes) =>
        prevNotes.filter(
          (note) =>
            (note._id || note.id) !== id
        )
      );

      alert(
        t("noteDeletedSuccessfully")
      );

    } catch (error) {
      console.error(
        "Delete Note Error:",
        error.response?.data ||
          error.message
      );

      alert(
        error.response?.data?.message ||
          t("failedToDeleteNote")
      );
    }
  };

  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <div className="notes-page">

          {/* ============================
              HERO
          ============================ */}

          <div className="notes-hero">

            <div className="notes-hero-left">

              <div className="hero-tag">
                <FaStickyNote />
                {t("travelNotesOrganizer")}
              </div>

              <h1>
                {t("captureTravelMemories")}
              </h1>

              <p>
                {t("saveTravelIdeas")}
              </p>

            </div>

            <div className="notes-hero-right">
              <FaPlaneDeparture />
            </div>

          </div>


          {/* ============================
              ADD / EDIT NOTE CARD
          ============================ */}

          <div className="note-form-card">

            <div className="card-title">

              <h2>

                <FaPlus />

                {editingId
                  ? t("editNote")
                  : t("addNewNote")}

              </h2>

              <p>
                {t(
                  "createNotesUpcomingTrips"
                )}
              </p>

            </div>


            <form
              className="note-form"
              onSubmit={addNote}
            >

              <div className="form-grid">

                {/* TITLE */}

                <div className="input-group">

                  <FaStickyNote />

                  <input
                    type="text"
                    name="title"
                    placeholder={t(
                      "noteTitle"
                    )}
                    value={form.title}
                    onChange={handleChange}
                  />

                </div>


                {/* CATEGORY */}

                <div className="input-group">

                  <FaTag />

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >

                    <option value="">
                      {t(
                        "selectCategory"
                      )}
                    </option>

                    <option value="Travel Plan">
                      {t("travelPlan")}
                    </option>

                    <option value="Reminder">
                      {t("reminder")}
                    </option>

                    <option value="Places To Visit">
                      {t(
                        "placesToVisit"
                      )}
                    </option>

                    <option value="Packing Idea">
                      {t("packingIdea")}
                    </option>

                    <option value="Other">
                      {t("other")}
                    </option>

                  </select>

                </div>


                {/* DESCRIPTION */}

                <div className="input-group textarea-box">

                  <textarea
                    name="description"
                    placeholder={t(
                      "writeNoteHere"
                    )}
                    value={
                      form.description
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

              </div>


              {/* ============================
                  FORM BUTTONS
              ============================ */}

              <div className="note-form-buttons">

                <button
                  type="submit"
                  className="add-note-btn"
                  disabled={adding}
                >

                  <FaPlus />

                  {adding
                    ? editingId
                      ? t("updating")
                      : t("adding")
                    : editingId
                    ? t("updateNote")
                    : t("addNote")}

                </button>


                {editingId && (

                  <button
                    type="button"
                    className="cancel-note-btn"
                    onClick={cancelEdit}
                  >
                    {t("cancel")}
                  </button>

                )}

              </div>

            </form>

          </div>


          {/* ============================
              NOTES LIST
          ============================ */}

          <div className="notes-list-section">

            <div className="section-header">

              <span className="section-tag">
                {t("myTravelNotes")}
              </span>

              <h2>
                {t("savedNotes")}
              </h2>

              <p>
                {t(
                  "manageTravelIdeas"
                )}
              </p>

            </div>


            {notes.length === 0 ? (

              <div className="empty-notes">

                <FaStickyNote className="empty-icon" />

                <h2>
                  {t(
                    "noNotesAdded"
                  )}
                </h2>

                <p>
                  {t(
                    "startCreatingNotes"
                  )}
                </p>

              </div>

            ) : (

              <div className="notes-grid">

                {notes.map((note) => {

                  const noteId =
                    note._id ||
                    note.id;

                  return (

                    <div
                      className={`note-card ${
                        note.important
                          ? "important"
                          : ""
                      }`}
                      key={noteId}
                    >

                      {/* HEADER */}

                      <div className="note-card-header">

                        <div>

                          <h3>
                            {getNoteTitle(
                              note
                            )}
                          </h3>

                          <span>
                            {getCategory(
                              note.category
                            )}
                          </span>

                        </div>


                        {/* STAR */}

                        <FaStar
                          className={
                            note.important
                              ? "star-active"
                              : "star"
                          }
                          onClick={() =>
                            toggleImportant(
                              noteId,
                              note.important
                            )
                          }
                        />

                      </div>


                      {/* DESCRIPTION */}

                      <div className="note-description">

                        <p>
                          {getNoteDescription(
                            note
                          )}
                        </p>

                      </div>


                      {/* ACTIONS */}

                      <div className="note-actions">

                        <button
                          type="button"
                          className="edit-note-btn"
                          onClick={() =>
                            editNote(note)
                          }
                        >
                          {t("edit")}
                        </button>


                        <button
                          type="button"
                          className="delete-note-btn"
                          onClick={() =>
                            deleteNote(
                              noteId
                            )
                          }
                        >
                          {t("deleteNote")}
                        </button>

                      </div>

                    </div>

                  );
                })}

              </div>

            )}

          </div>


          {/* ============================
              CTA
          ============================ */}

          <div className="notes-cta">

            <div className="cta-content">

              <h2>
                {t(
                  "keepTravelMemorySafe"
                )}
              </h2>

              <p>
                {t(
                  "travelMemoryDescription"
                )}
              </p>

              <button
                type="button"
                className="cta-btn"
                onClick={() =>
                  document
                    .querySelector(
                      ".note-form-card"
                    )
                    ?.scrollIntoView({
                      behavior:
                        "smooth",
                    })
                }
              >

                <FaPlaneDeparture />

                {t(
                  "planNextJourney"
                )}

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}