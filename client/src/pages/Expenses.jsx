import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

import { useLanguage } from "../context/LanguageContext";

import {
  FaWallet,
  FaPlus,
  FaMoneyBillWave,
  FaPlaneDeparture,
  FaChartLine,
  FaEdit,
} from "react-icons/fa";

import "./Expenses.css";

export default function Expenses() {
  const { t } = useLanguage();

  const [form, setForm] = useState({
    tripName: "Paris Trip",
    title: "",
    category: "",
    currency: "INR",
    amount: "",
    date: "",
    notes: "",
  });

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  // =====================================================
  // GET ALL EXPENSES
  // =====================================================

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/expenses",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.data.success) {
        setExpenses(response.data.expenses || []);
      } else {
        setExpenses([]);
      }
    } catch (error) {
      console.error(
        "Error fetching expenses:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  // =====================================================
// START EDIT EXPENSE
// =====================================================

const handleEditExpense = (expense) => {
  setEditingExpense(expense);

  setForm({
    tripName: expense.tripName || "",
    title: expense.title || "",
    category: expense.category || "",
    currency: expense.currency || "INR",
    amount: expense.amount || "",
    date: expense.date
      ? expense.date.split("T")[0]
      : "",
    notes: expense.notes || "",
  });

  document
    .querySelector(".expense-form-card")
    ?.scrollIntoView({
      behavior: "smooth",
    });
};

// =====================================================
// UPDATE EXPENSE
// =====================================================

const updateExpense = async (e) => {
  e.preventDefault();

  if (loading) {
    return;
  }

  if (!editingExpense) {
    return;
  }

  if (!form.tripName.trim()) {
    alert(t("pleaseEnterTripName"));
    return;
  }

  if (!form.title.trim()) {
    alert(t("pleaseEnterExpenseTitle"));
    return;
  }

  if (!form.category) {
    alert(t("pleaseSelectExpenseCategory"));
    return;
  }

  if (!form.currency.trim()) {
    alert(t("pleaseEnterCurrency"));
    return;
  }

  if (!form.amount || Number(form.amount) <= 0) {
    alert(t("pleaseEnterValidAmount"));
    return;
  }

  if (!form.date) {
    alert(t("pleaseSelectExpenseDate"));
    return;
  }

  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      alert(t("pleaseLoginFirst"));
      return;
    }

    const response = await axios.put(
      `http://localhost:5000/api/expenses/${editingExpense._id}`,
      {
        tripName: form.tripName.trim(),
        title: form.title.trim(),
        category: form.category,
        amount: Number(form.amount),
        currency: form.currency.trim(),
        date: form.date,
        notes: form.notes.trim(),
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.data.success) {
      alert(t("expenseUpdated"));

      await fetchExpenses();

      setEditingExpense(null);

      setForm({
        tripName: "Paris Trip",
        title: "",
        category: "",
        currency: "INR",
        amount: "",
        date: "",
        notes: "",
      });
    }
  } catch (error) {
    console.error(
      "Update Expense Error:",
      error.response?.data || error.message
    );

    alert(
      error.response?.data?.message ||
        t("failedToUpdateExpense")
    );
  } finally {
    setLoading(false);
  }
};

  // =====================================================
  // ADD EXPENSE
  // =====================================================

  const addExpense = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (!form.tripName.trim()) {
      alert(t("pleaseEnterTripName"));
      return;
    }

    if (!form.title.trim()) {
      alert(t("pleaseEnterExpenseTitle"));
      return;
    }

    if (!form.category) {
      alert(t("pleaseSelectExpenseCategory"));
      return;
    }

    if (!form.currency.trim()) {
      alert(t("pleaseEnterCurrency"));
      return;
    }

    if (!form.amount || Number(form.amount) <= 0) {
      alert(t("pleaseEnterValidAmount"));
      return;
    }

    if (!form.date) {
      alert(t("pleaseSelectExpenseDate"));
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert(t("pleaseLoginFirst"));
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/expenses",
        {
          tripName: form.tripName.trim(),
          title: form.title.trim(),
          category: form.category,
          amount: Number(form.amount),
          currency: form.currency.trim(),
          date: form.date,
          notes: form.notes.trim(),
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.data.success) {
        alert(t("expenseSaved"));

        await fetchExpenses();

        setForm({
          tripName: "Paris Trip",
          title: "",
          category: "",
          currency: "INR",
          amount: "",
          date: "",
          notes: "",
        });
      }
    } catch (error) {
      console.error(
        "Add Expense Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          t("failedToSaveExpense")
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // DELETE EXPENSE
  // =====================================================

  const deleteExpense = async (id) => {
    const confirmDelete = window.confirm(
      t("confirmDeleteExpense")
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert(t("pleaseLoginFirst"));
        return;
      }

      const response = await axios.delete(
        `http://localhost:5000/api/expenses/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.data.success) {
        setExpenses((prevExpenses) =>
          prevExpenses.filter(
            (expense) => expense._id !== id
          )
        );

        alert(t("expenseDeleted"));
      }
    } catch (error) {
      console.error(
        "Delete Expense Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          t("failedToDeleteExpense")
      );
    }
  };
  // =====================================================
// EDIT EXPENSE
// =====================================================



  // =====================================================
  // TOTAL EXPENSE
  // =====================================================

  const total = expenses.reduce(
    (sum, item) =>
      sum + Number(item.amount || 0),
    0
  );

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <div className="expenses-page">

          {/* =====================================================
              HERO
          ===================================================== */}

          <div className="expense-hero">

            <div className="hero-left">

              <span className="hero-tag">
                <FaPlaneDeparture />
                {t("travelExpenseManager")}
              </span>

              <h1>
                {t("trackEveryExpense")}
                <br />
                {t("ofYourJourney")}
              </h1>

              <p>
                {t("manageFoodHotelsTransport")}
              </p>

              <button
                className="hero-btn"
                type="button"
                onClick={() =>
                  document
                    .querySelector(".expense-form-card")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                <FaPlus />
                {t("addNewExpense")}
              </button>

            </div>

            <div className="hero-right">

              <div className="expense-summary">

                <FaChartLine className="summary-icon" />

                <h2>
                  {t("totalSpent")}
                </h2>

                <div className="total-amount">
                  {form.currency}{" "}
                  {total.toLocaleString("en-IN")}
                </div>

              </div>

            </div>

          </div>

          {/* =====================================================
              ADD EXPENSE FORM
          ===================================================== */}

          <div className="expense-form-card">

            <div className="card-title">

              <h2>
                <FaWallet />
                {t("addNewExpense")}
              </h2>

              <p>
                {t("addTravelExpenses")}
              </p>

            </div>

            <form
                  className="expense-form"
                  onSubmit={editingExpense ? updateExpense : addExpense}
                  >

                  <div className="form-grid">

                  {/* Trip Name */}

                    <div className="input-group">

                  <FaPlaneDeparture />

                  <input
                    type="text"
                    name="tripName"
                    placeholder={t("tripName")}
                    value={form.tripName}
                    onChange={handleChange}
                  />

                </div>

                {/* Title */}

                <div className="input-group">

                  <FaMoneyBillWave />

                  <input
                    type="text"
                    name="title"
                    placeholder={t("expenseTitle")}
                    value={form.title}
                    onChange={handleChange}
                  />

                </div>

                {/* Category */}

                <div className="input-group">

                  <FaWallet />

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >

                    <option value="">
                      {t("selectCategory")}
                    </option>

                    <option value="Accommodation">
                      {t("accommodation")}
                    </option>

                    <option value="Food">
                      {t("food")}
                    </option>

                    <option value="Transport">
                      {t("transport")}
                    </option>

                    <option value="Shopping">
                      {t("shopping")}
                    </option>

                    <option value="Activities">
                      {t("activities")}
                    </option>

                    <option value="Other">
                      {t("other")}
                    </option>

                  </select>

                </div>

                {/* Currency */}

                <div className="input-group">

                  <FaWallet />

                  <input
                    type="text"
                    name="currency"
                    placeholder={t("currency")}
                    value={form.currency}
                    onChange={handleChange}
                  />

                </div>

                {/* Amount */}

                <div className="input-group">

                  <FaMoneyBillWave />

                  <input
                    type="number"
                    name="amount"
                    placeholder={t("amount")}
                    min="1"
                    value={form.amount}
                    onChange={handleChange}
                  />

                </div>

                {/* Date */}

                <div className="input-group">

                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* Notes */}

              <div className="input-group textarea-box">

                <FaWallet />

                <textarea
                  name="notes"
                  placeholder={t("expenseNotes")}
                  value={form.notes}
                  onChange={handleChange}
                />

              </div>

              {/* Save Button */}

              <button
                type="submit"
                className="save-expense-btn"
                disabled={loading}
              >

               {editingExpense ? <FaEdit /> : <FaPlus />}

            {loading
              ? t("saving")
              : editingExpense
              ? t("updateExpense")
              : t("addNewExpense")}

              </button>
              {editingExpense && (
  <button
    type="button"
    className="cancel-edit-btn"
    onClick={() => {
      setEditingExpense(null);

      setForm({
        tripName: "Paris Trip",
        title: "",
        category: "",
        currency: "INR",
        amount: "",
        date: "",
        notes: "",
      });
    }}
  >
    {t("cancelEdit")}
  </button>
)}

            </form>

          </div>

          {/* =====================================================
              EXPENSE LIST
          ===================================================== */}

          <div className="expense-list-section">

            <div className="section-header">

              <span className="section-tag">
                {t("expenseHistory")}
              </span>

              <h2>
                {t("yourExpenses")}
              </h2>

              <p>
                {t("viewManageExpenses")}
              </p>

            </div>

            {expenses.length === 0 ? (

              <div className="empty-expense">

                <FaWallet className="empty-icon" />

                <h2>
                  {t("noExpensesAdded")}
                </h2>

                <p>
                  {t("startAddingExpenses")}
                </p>

              </div>

            ) : (

              <div className="expense-grid">

                {expenses.map((expense) => {

                  const expenseId =
                    expense._id || expense.id;

                  return (

                    <div
                      className="expense-card"
                      key={expenseId}
                    >

                      {/* Header */}

                      <div className="expense-card-header">

                        <div>

                          <h3>
                            {expense.title}
                          </h3>

                          <span>
                            {expense.category}
                          </span>

                        </div>

                        <div className="expense-amount">

                          {expense.currency}{" "}

                          {Number(
                            expense.amount || 0
                          ).toLocaleString("en-IN")}

                        </div>

                      </div>

                      {/* Details */}

                      <div className="expense-details">

                        <p>
                          <strong>
                            {t("trip")}:
                          </strong>{" "}
                          {expense.tripName ||
                            t("noTrip")}
                        </p>

                        <p>
                          <strong>
                            {t("date")}:
                          </strong>{" "}

                          {expense.date
                            ? new Date(
                                expense.date
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : t("noDate")}
                        </p>

                        <p>
                          <strong>
                            {t("notesLabel")}:
                          </strong>{" "}

                          {expense.notes ||
                            t("noNotesAdded")}
                        </p>

                      </div>

                      {/* Actions */}

<div className="expense-actions">

  <button
    type="button"
    className="edit-expense-btn"
   onClick={() => handleEditExpense(expense)}
  >
    <FaEdit />
    {t("editExpense")}
  </button>

  <button
    type="button"
    className="delete-expense-btn"
    onClick={() => deleteExpense(expenseId)}
  >
    {t("deleteExpense")}
  </button>

</div>

                    </div>

                  );
                })}

              </div>

            )}

          </div>

          {/* =====================================================
              CTA
          ===================================================== */}

          <div className="expense-cta">

            <div className="cta-content">

              <h2>
                {t("travelSmartExpenseControl")}
              </h2>

              <p>
                {t("expenseCtaDescription")}
              </p>

              <button
                className="cta-btn"
                type="button"
                onClick={() =>
                  document
                    .querySelector(".expense-form-card")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >

                <FaPlaneDeparture />

                {t("planNextTrip")}

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}