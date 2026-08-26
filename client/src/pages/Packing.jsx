import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

import { useLanguage } from "../context/LanguageContext";

import {
  FaSuitcase,
  FaPlus,
  FaPlaneDeparture,
  FaTags,
  FaCheckCircle,
} from "react-icons/fa";

import "./Packing.css";

export default function Packing() {
  const { t } = useLanguage();

  const [form, setForm] = useState({
    item: "",
    category: "",
    quantity: "",
  });

  const [items, setItems] = useState([]);
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
  // FETCH PACKING ITEMS
  // ============================

  const fetchItems = async () => {
    try {
      const token = getToken();

      if (!token) {
        console.error("Token not found");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/packing",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setItems(response.data.items || []);
    } catch (error) {
      console.error(
        "Fetch Packing Error:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ============================
  // HANDLE FORM CHANGE
  // ============================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ============================
  // ADD / UPDATE PACKING ITEM
  // ============================

  const addItem = async (e) => {
    e.preventDefault();

    if (adding) {
      return;
    }

    if (!form.item.trim()) {
      alert(t("enterItemName"));
      return;
    }

    if (!form.category) {
      alert(t("selectPackingCategory"));
      return;
    }

    const quantity = Number(form.quantity || 1);

    if (quantity <= 0) {
      alert(t("quantityGreaterZero"));
      return;
    }

    try {
      setAdding(true);

      const token = getToken();

      if (!token) {
        alert(t("pleaseLogin"));
        return;
      }

      // ============================
      // UPDATE EXISTING ITEM
      // ============================

      if (editingId) {
        const response = await axios.put(
          `http://localhost:5000/api/packing/${editingId}`,
          {
            item: form.item.trim(),
            category: form.category,
            quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setItems((prevItems) =>
          prevItems.map((item) =>
            (item._id || item.id) === editingId
              ? response.data.item
              : item
          )
        );

        setForm({
          item: "",
          category: "",
          quantity: "",
        });

        setEditingId(null);

        alert(t("packingItemUpdated"));

        return;
      }

      // ============================
      // ADD NEW ITEM
      // ============================

      const response = await axios.post(
        "http://localhost:5000/api/packing",
        {
          item: form.item.trim(),
          category: form.category,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newItem = response.data.item;

      setItems((prevItems) => [
        newItem,
        ...prevItems,
      ]);

      setForm({
        item: "",
        category: "",
        quantity: "",
      });

      alert(t("packingItemAdded"));
    } catch (error) {
      console.error(
        "Packing Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          (editingId
            ? t("failedUpdatePacking")
            : t("failedAddPacking"))
      );
    } finally {
      setAdding(false);
    }
  };

  // ============================
  // EDIT PACKING ITEM
  // ============================

  const editItem = (packingItem) => {
    const itemId = packingItem._id || packingItem.id;

    setEditingId(itemId);

    setForm({
      item: packingItem.item || "",
      category: packingItem.category || "",
      quantity: packingItem.quantity || 1,
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
      item: "",
      category: "",
      quantity: "",
    });
  };

  // ============================
  // TOGGLE PACKED
  // ============================

  const togglePacked = async (id, currentStatus) => {
    try {
      const token = getToken();

      if (!token) {
        alert(t("pleaseLogin"));
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/packing/${id}`,
        {
          packed: !currentStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setItems((prevItems) =>
        prevItems.map((item) =>
          (item._id || item.id) === id
            ? response.data.item
            : item
        )
      );
    } catch (error) {
      console.error(
        "Update Packing Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          t("failedUpdatePacking")
      );
    }
  };

  // ============================
  // DELETE ITEM
  // ============================

  const deleteItem = async (id) => {
    const confirmDelete = window.confirm(
      t("confirmDeletePacking")
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = getToken();

      if (!token) {
        alert(t("pleaseLogin"));
        return;
      }

      await axios.delete(
        `http://localhost:5000/api/packing/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setItems((prevItems) =>
        prevItems.filter(
          (item) => (item._id || item.id) !== id
        )
      );

      alert(t("packingItemDeleted"));
    } catch (error) {
      console.error(
        "Delete Packing Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          t("failedDeletePacking")
      );
    }
  };

  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <div className="packing-page">

          {/* ============================
              HERO
          ============================ */}

          <div className="packing-hero">

            <div className="packing-hero-left">

              <div className="hero-tag">
                <FaSuitcase />
                {t("smartPackingPlanner")}
              </div>

              <h1>
                {t("packSmartJourney")}
              </h1>

              <p>
                {t("packingDescription")}
              </p>

            </div>

            <div className="packing-hero-right">
              <FaPlaneDeparture />
            </div>

          </div>


          {/* ============================
              ADD / EDIT ITEM CARD
          ============================ */}

          <div className="packing-form-card">

            <div className="card-title">

              <h2>

                <FaPlus />

                {editingId
                  ? t("editPackingItem")
                  : t("addPackingItem")}

              </h2>

              <p>
                {t("addTravelEssentials")}
              </p>

            </div>

            <form
              className="packing-form"
              onSubmit={addItem}
            >

              <div className="form-grid">

                {/* ITEM */}

                <div className="input-group">

                  <FaSuitcase />

                  <input
                    type="text"
                    name="item"
                    placeholder={t("itemName")}
                    value={form.item}
                    onChange={handleChange}
                  />

                </div>


                {/* CATEGORY */}

                <div className="input-group">

                  <FaTags />

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >

                    <option value="">
                      {t("selectCategory")}
                    </option>

                    <option value="Clothes">
                      {t("clothes")}
                    </option>

                    <option value="Electronics">
                      {t("electronics")}
                    </option>

                    <option value="Documents">
                      {t("documents")}
                    </option>

                    <option value="Toiletries">
                      {t("toiletries")}
                    </option>

                    <option value="Accessories">
                      {t("accessories")}
                    </option>

                    <option value="Other">
                      {t("other")}
                    </option>

                  </select>

                </div>


                {/* QUANTITY */}

                <div className="input-group">

                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    placeholder={t("quantity")}
                    value={form.quantity}
                    onChange={handleChange}
                  />

                </div>

              </div>


              {/* BUTTONS */}

              <div className="packing-form-buttons">

                <button
                  className={`add-item-btn ${
                    editingId
                      ? "update-item-btn"
                      : ""
                  }`}
                  type="submit"
                  disabled={adding}
                >

                  <FaPlus />

                  {adding
                    ? editingId
                      ? t("updating")
                      : t("adding")
                    : editingId
                    ? t("updateItem")
                    : t("addItem")}

                </button>


                {editingId && (
                  <button
                    type="button"
                    className="cancel-edit-btn"
                    onClick={cancelEdit}
                  >
                    {t("cancel")}
                  </button>
                )}

              </div>

            </form>

          </div>


          {/* ============================
              PACKING LIST
          ============================ */}

          <div className="packing-list-section">

            <div className="section-header">

              <span className="section-tag">
                {t("travelEssentials")}
              </span>

              <h2>
                {t("yourPackingList")}
              </h2>

              <p>
                {t("packingListDescription")}
              </p>

            </div>


            {items.length === 0 ? (

              <div className="empty-packing">

                <FaSuitcase className="empty-icon" />

                <h2>
                  {t("noItemsAdded")}
                </h2>

                <p>
                  {t("startAddingEssentials")}
                </p>

              </div>

            ) : (

              <div className="packing-grid">

                {items.map((item) => {

                  const itemId =
                    item._id || item.id;

                  return (

                    <div
                      className={`packing-card ${
                        item.packed
                          ? "packed"
                          : ""
                      }`}
                      key={itemId}
                    >

                      {/* HEADER */}

                      <div className="packing-card-header">

                        <div>

                          <h3>
                            {item.item}
                          </h3>

                          <span>
                             {t(item.category.toLowerCase())}
                          </span>

                        </div>

                        <FaCheckCircle
                          className={
                            item.packed
                              ? "checked"
                              : "unchecked"
                          }
                        />

                      </div>


                      {/* DETAILS */}

                      <div className="packing-details">

                        <p>
                          📦{" "}
                          <strong>
                            {t("quantityLabel")}:
                          </strong>{" "}
                          {item.quantity || 1}
                        </p>

                        <p>

                          <strong>
                            {t("status")}:
                          </strong>{" "}

                          {item.packed
                            ? t("packed")
                            : t("notPacked")}

                        </p>

                      </div>


                      {/* ACTIONS */}

                      <div className="packing-actions">

                        <button
                          type="button"
                          className="edit-pack-btn"
                          onClick={() =>
                            editItem(item)
                          }
                        >
                          {t("edit")}
                        </button>


                        <button
                          type="button"
                          className="pack-btn"
                          onClick={() =>
                            togglePacked(
                              itemId,
                              item.packed
                            )
                          }
                        >

                          {item.packed
                            ? t("markUnpacked")
                            : t("markPacked")}

                        </button>


                        <button
                          type="button"
                          className="delete-pack-btn"
                          onClick={() =>
                            deleteItem(itemId)
                          }
                        >
                          {t("delete")}
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

          <div className="packing-cta">

            <div className="cta-content">

              <h2>
                {t("readyNextAdventure")}
              </h2>

              <p>
                {t("packingCtaDescription")}
              </p>

              <button
                className="cta-btn"
                type="button"
                onClick={() =>
                  document
                    .querySelector(
                      ".packing-form-card"
                    )
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >

                <FaPlaneDeparture />

                {t("startJourney")}

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}