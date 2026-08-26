import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

import {
FaWallet,
FaMoneyBillWave,
FaPlaneDeparture,
FaPlus,
FaChartPie,
FaEdit,
} from "react-icons/fa";

import { useLanguage } from "../context/LanguageContext";

import "./Budget.css";

const currencies = [
  { symbol: "₹", code: "INR", name: "Indian Rupee" },
  { symbol: "$", code: "USD", name: "US Dollar" },
  { symbol: "€", code: "EUR", name: "Euro" },
  { symbol: "£", code: "GBP", name: "British Pound" },
  { symbol: "¥", code: "JPY", name: "Japanese Yen" },
  { symbol: "₩", code: "KRW", name: "South Korean Won" },
  { symbol: "AED", code: "AED", name: "UAE Dirham" },
  { symbol: "SAR", code: "SAR", name: "Saudi Riyal" },
  { symbol: "SGD", code: "SGD", name: "Singapore Dollar" },
  { symbol: "C$", code: "CAD", name: "Canadian Dollar" },
  { symbol: "A$", code: "AUD", name: "Australian Dollar" },
];

export default function Budget() {
  const { language } = useLanguage();

  // ============================
  // TRANSLATIONS
  // ============================

  const translations = {
    English: {
      smartPlanner: "Smart Budget Planner",
      planEvery: "Plan Every",
      expenseBefore: "Expense Before",
      travel: "You Travel",
      heroDescription:
        "Manage your travel budget using any currency in the world. Track expenses and stay within your budget effortlessly.",
      createBudget: "Create Budget",

      budgetDashboard: "Budget Dashboard",
      dashboardDescription:
        "Keep complete control over your travel expenses.",

      createTravelBudget: "Create Travel Budget",
      formDescription:
        "Enter your trip details and plan your budget in any currency.",

      tripName: "Trip Name",
      selectCurrency: "Select Currency",
      totalBudget: "Total Budget",
      accommodation: "Accommodation",
      food: "Food",
      transport: "Transport",
      shopping: "Shopping",
      activities: "Activities",
      otherExpenses: "Other Expenses",

      saving: "Saving...",
      saveBudget: "Save Budget",

      yourBudgets: "YOUR BUDGETS",
      budgetOverview: "Budget Overview",
      overviewDescription:
        "Monitor your travel budget and remaining balance.",

      noBudget: "No Budget Added",
      emptyDescription:
        "Create your first travel budget to start managing your expenses.",

      currency: "Currency",
      total: "Total",
      spent: "Spent",
      remaining: "Remaining",

      deleteBudget: "Delete Budget",
      editBudget: "Edit Budget",
updateBudget: "Update Budget",
budgetUpdated: "Budget updated successfully!",
updateFailed: "Failed to update budget.",

      confirmDelete:
        "Are you sure you want to delete this budget?",

      smartBudgetTitle:
        "A Smart Budget Makes Every Journey Better",
      smartBudgetDescription:
        "Track every expense, monitor your remaining balance, and travel confidently with a well-planned budget. Use any currency symbol that matches your destination.",
      startNextTrip: "Start Your Next Trip",

      enterTripName: "Please enter trip name.",
      selectCurrencyAlert: "Please select currency.",
      validBudget:
        "Please enter a valid total budget greater than 0.",
      categoryGreater:
        "Category expenses cannot be greater than total budget.",
      loginAgain: "Please login again.",
      budgetSaved: "Budget saved successfully!",
      saveFailed: "Failed to save budget.",
      budgetDeleted: "Budget deleted successfully!",
      deleteFailed: "Failed to delete budget.",
    },

    Hindi: {
      editBudget: "बजट संपादित करें",
      updateBudget: "बजट अपडेट करें",
      budgetUpdated: "बजट सफलतापूर्वक अपडेट किया गया!",
      updateFailed: "बजट अपडेट करने में विफल।",
     
      smartPlanner: "स्मार्ट बजट प्लानर",
      planEvery: "हर खर्च की",
      expenseBefore: "पहले योजना बनाएं",
      travel: "यात्रा करने से",
      heroDescription:
        "दुनिया की किसी भी मुद्रा का उपयोग करके अपना यात्रा बजट प्रबंधित करें। खर्चों को ट्रैक करें और आसानी से अपने बजट के अंदर रहें।",
      createBudget: "बजट बनाएं",

      budgetDashboard: "बजट डैशबोर्ड",
      dashboardDescription:
        "अपने यात्रा खर्चों पर पूरा नियंत्रण रखें।",

      createTravelBudget: "यात्रा बजट बनाएं",
      formDescription:
        "अपनी यात्रा की जानकारी दर्ज करें और किसी भी मुद्रा में अपना बजट बनाएं।",

      tripName: "यात्रा का नाम",
      selectCurrency: "मुद्रा चुनें",
      totalBudget: "कुल बजट",
      accommodation: "रहने का खर्च",
      food: "भोजन",
      transport: "परिवहन",
      shopping: "खरीदारी",
      activities: "गतिविधियाँ",
      otherExpenses: "अन्य खर्च",

      saving: "सहेजा जा रहा है...",
      saveBudget: "बजट सहेजें",

      yourBudgets: "आपके बजट",
      budgetOverview: "बजट विवरण",
      overviewDescription:
        "अपने यात्रा बजट और शेष राशि पर नज़र रखें।",

      noBudget: "कोई बजट नहीं जोड़ा गया",
      emptyDescription:
        "अपने खर्चों को प्रबंधित करना शुरू करने के लिए अपना पहला यात्रा बजट बनाएं।",

      currency: "मुद्रा",
      total: "कुल",
      spent: "खर्च",
      remaining: "शेष",

      deleteBudget: "बजट हटाएँ",

      confirmDelete:
        "क्या आप वाकई इस बजट को हटाना चाहते हैं?",

      smartBudgetTitle:
        "स्मार्ट बजट हर यात्रा को बेहतर बनाता है",
      smartBudgetDescription:
        "हर खर्च को ट्रैक करें, शेष राशि पर नज़र रखें और अच्छी तरह से बनाए गए बजट के साथ आत्मविश्वास से यात्रा करें। अपने गंतव्य के अनुसार किसी भी मुद्रा का उपयोग करें।",
      startNextTrip: "अपनी अगली यात्रा शुरू करें",

      enterTripName: "कृपया यात्रा का नाम दर्ज करें।",
      selectCurrencyAlert: "कृपया मुद्रा चुनें।",
      validBudget:
        "कृपया 0 से अधिक सही कुल बजट दर्ज करें।",
      categoryGreater:
        "श्रेणी के खर्च कुल बजट से अधिक नहीं हो सकते।",
      loginAgain: "कृपया दोबारा लॉगिन करें।",
      budgetSaved: "बजट सफलतापूर्वक सहेजा गया!",
      saveFailed: "बजट सहेजने में विफल।",
      budgetDeleted: "बजट सफलतापूर्वक हटाया गया!",
      deleteFailed: "बजट हटाने में विफल।",
    },

    Marathi: {
      editBudget: "बजेट संपादित करा",
      updateBudget: "बजेट अपडेट करा",
      budgetUpdated: "बजेट यशस्वीरित्या अपडेट झाले!",
      updateFailed: "बजेट अपडेट करण्यात अयशस्वी.",
      
      smartPlanner: "स्मार्ट बजेट प्लॅनर",
      planEvery: "प्रत्येक खर्चाचे",
      expenseBefore: "आधी नियोजन करा",
      travel: "प्रवास करण्यापूर्वी",
      heroDescription:
        "जगातील कोणत्याही चलनाचा वापर करून तुमचे प्रवासाचे बजेट व्यवस्थापित करा. खर्चाचा मागोवा घ्या आणि तुमच्या बजेटमध्ये राहा.",
      createBudget: "बजेट तयार करा",

      budgetDashboard: "बजेट डॅशबोर्ड",
      dashboardDescription:
        "तुमच्या प्रवासाच्या खर्चावर पूर्ण नियंत्रण ठेवा.",

      createTravelBudget: "प्रवासाचे बजेट तयार करा",
      formDescription:
        "तुमच्या सहलीची माहिती भरा आणि कोणत्याही चलनात तुमचे बजेट तयार करा.",

      tripName: "सहलीचे नाव",
      selectCurrency: "चलन निवडा",
      totalBudget: "एकूण बजेट",
      accommodation: "निवास",
      food: "अन्न",
      transport: "वाहतूक",
      shopping: "खरेदी",
      activities: "उपक्रम",
      otherExpenses: "इतर खर्च",

      saving: "जतन होत आहे...",
      saveBudget: "बजेट जतन करा",

      yourBudgets: "तुमचे बजेट",
      budgetOverview: "बजेटचा आढावा",
      overviewDescription:
        "तुमच्या प्रवासाच्या बजेट आणि शिल्लक रकमेवर लक्ष ठेवा.",

      noBudget: "कोणतेही बजेट जोडलेले नाही",
      emptyDescription:
        "तुमचे खर्च व्यवस्थापित करण्यासाठी तुमचे पहिले प्रवासाचे बजेट तयार करा.",

      currency: "चलन",
      total: "एकूण",
      spent: "खर्च",
      remaining: "शिल्लक",

      deleteBudget: "बजेट हटवा",

      confirmDelete:
        "तुम्हाला हे बजेट नक्की हटवायचे आहे का?",

      smartBudgetTitle:
        "स्मार्ट बजेट प्रत्येक प्रवास अधिक चांगला बनवते",
      smartBudgetDescription:
        "प्रत्येक खर्चाचा मागोवा घ्या, शिल्लक रकमेवर लक्ष ठेवा आणि योग्य नियोजन केलेल्या बजेटसह आत्मविश्वासाने प्रवास करा. तुमच्या गंतव्यस्थानानुसार कोणतेही चलन वापरा.",
      startNextTrip: "तुमची पुढील सहल सुरू करा",

      enterTripName: "कृपया सहलीचे नाव भरा.",
      selectCurrencyAlert: "कृपया चलन निवडा.",
      validBudget:
        "कृपया 0 पेक्षा जास्त योग्य एकूण बजेट भरा.",
      categoryGreater:
        "श्रेणीतील खर्च एकूण बजेटपेक्षा जास्त असू शकत नाही.",
      loginAgain: "कृपया पुन्हा लॉगिन करा.",
      budgetSaved: "बजेट यशस्वीरित्या जतन झाले!",
      saveFailed: "बजेट जतन करण्यात अयशस्वी.",
      budgetDeleted: "बजेट यशस्वीरित्या हटवले!",
      deleteFailed: "बजेट हटवण्यात अयशस्वी.",
    },
  };

  const text =
    translations[language] || translations.English;

  // ============================
  // FORM STATE
  // ============================

  const [form, setForm] = useState({
    tripName: "",
    currency: "",
    total: "",
    accommodation: "",
    food: "",
    transport: "",
    shopping: "",
    activities: "",
    other: "",
  });

  // ============================
  // BUDGET STATE
  // ============================

  const [budgets, setBudgets] = useState([]);
  const [saving, setSaving] = useState(false);
  const [editingBudgetId, setEditingBudgetId] = useState(null);

  // ============================
  // FETCH BUDGETS
  // ============================

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/budgets",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBudgets(
        response.data.budgets ||
          response.data ||
          []
      );
    } catch (error) {
      console.error(
        "Error fetching budgets:",
        error
      );
    }
  };

  // ============================
  // HANDLE INPUT CHANGE
  // ============================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ============================
// EDIT BUDGET
// ============================

const editBudget = (budget) => {
  setEditingBudgetId(budget._id || budget.id);

  setForm({
    tripName: budget.tripName || "",
    currency: budget.currency || "",
    total: budget.total || "",
    accommodation: budget.accommodation || "",
    food: budget.food || "",
    transport: budget.transport || "",
    shopping: budget.shopping || "",
    activities: budget.activities || "",
    other: budget.other || "",
  });

  document
    .querySelector(".budget-form-card")
    ?.scrollIntoView({
      behavior: "smooth",
    });
};
  
  // ============================
  // ADD BUDGET
  // ============================

  const addBudget = async (e) => {
    e.preventDefault();

    if (saving) {
      return;
    }

    if (!form.tripName.trim()) {
      alert(text.enterTripName);
      return;
    }

    if (!form.currency) {
      alert(text.selectCurrencyAlert);
      return;
    }

    if (
      !form.total ||
      Number(form.total) <= 0
    ) {
      alert(text.validBudget);
      return;
    }

    const accommodation =
      Number(form.accommodation || 0);

    const food =
      Number(form.food || 0);

    const transport =
      Number(form.transport || 0);

    const shopping =
      Number(form.shopping || 0);

    const activities =
      Number(form.activities || 0);

    const other =
      Number(form.other || 0);

    const totalCategoryAmount =
      accommodation +
      food +
      transport +
      shopping +
      activities +
      other;

    if (
      totalCategoryAmount >
      Number(form.total)
    ) {
      alert(text.categoryGreater);
      return;
    }

    try {
      setSaving(true);

      const token =
        localStorage.getItem("token");

      if (!token) {
        alert(text.loginAgain);
        return;
      }

      const budgetData = {
  tripName: form.tripName.trim(),
  currency: form.currency,
  total: Number(form.total),
  accommodation,
  food,
  transport,
  shopping,
  activities,
  other,
};

let response;

if (editingBudgetId) {
  // UPDATE EXISTING BUDGET

  response = await axios.put(
    `http://localhost:5000/api/budgets/${editingBudgetId}`,
    budgetData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const updatedBudget =
    response.data.budget || response.data;

  setBudgets((prevBudgets) =>
    prevBudgets.map((budget) =>
      (budget._id || budget.id) === editingBudgetId
        ? updatedBudget
        : budget
    )
  );

  alert(text.budgetUpdated);

} else {
  // CREATE NEW BUDGET

  response = await axios.post(
    "http://localhost:5000/api/budgets",
    budgetData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const newBudget =
    response.data.budget || response.data;

  setBudgets((prevBudgets) => [
    newBudget,
    ...prevBudgets,
  ]);

  alert(text.budgetSaved);
}

      setForm({
        tripName: "",
        currency: "",
        total: "",
        accommodation: "",
        food: "",
        transport: "",
        shopping: "",
        activities: "",
        other: "",
      });
      setEditingBudgetId(null);

      alert(text.budgetSaved);

    } catch (error) {
      console.error(
        "Error creating budget:",
        error
      );

      alert(
        error.response?.data?.message ||
          text.saveFailed
      );

    } finally {
      setSaving(false);
    }
  };

  // ============================
  // DELETE BUDGET
  // ============================

  const deleteBudget = async (id) => {
    const confirmDelete =
      window.confirm(text.confirmDelete);

    if (!confirmDelete) {
      return;
    }

    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        alert(text.loginAgain);
        return;
      }

      await axios.delete(
        `http://localhost:5000/api/budgets/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBudgets((prevBudgets) =>
        prevBudgets.filter(
          (item) =>
            (item._id || item.id) !== id
        )
      );

      alert(text.budgetDeleted);

    } catch (error) {
      console.error(
        "Error deleting budget:",
        error
      );

      alert(
        error.response?.data?.message ||
          text.deleteFailed
      );
    }
  };

  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <div className="budget-page">

          {/* HERO */}

          <div className="budget-hero">

            <div className="hero-left">

              <span className="hero-tag">
                <FaPlaneDeparture />
                {text.smartPlanner}
              </span>

              <h1>
                {text.planEvery}
                <br />
                {text.expenseBefore}
                <br />
                {text.travel}
              </h1>

              <p>
                {text.heroDescription}
              </p>

              <button
                className="hero-btn"
                type="button"
                onClick={() =>
                  document
                    .querySelector(
                      ".budget-form-card"
                    )
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                <FaPlus />
                {text.createBudget}
              </button>

            </div>

            <div className="hero-right">

              <div className="hero-card">

                <FaChartPie className="hero-icon" />

                <h2>
                  {text.budgetDashboard}
                </h2>

                <p>
                  {text.dashboardDescription}
                </p>

              </div>

            </div>

          </div>

          {/* BUDGET FORM */}

          <div className="budget-form-card">

            <div className="card-title">

              <h2>
                <FaWallet />
                {text.createTravelBudget}
              </h2>

              <p>
                {text.formDescription}
              </p>

            </div>

            <form
              className="budget-form"
              onSubmit={addBudget}
            >

              <div className="form-grid">

                <div className="input-group">

                  <FaPlaneDeparture />

                  <input
                    type="text"
                    name="tripName"
                    placeholder={text.tripName}
                    value={form.tripName}
                    onChange={handleChange}
                  />

                </div>

                <div className="input-group">

                  <FaMoneyBillWave />

                  <div className="budget-input">

                    <select
                      className="currency-select"
                      name="currency"
                      value={form.currency}
                      onChange={handleChange}
                    >

                      <option value="">
                        {text.selectCurrency}
                      </option>

                      {currencies.map((item) => (

                        <option
                          key={item.code}
                          value={item.symbol}
                        >
                          {item.symbol}{" "}
                          {item.name}
                        </option>

                      ))}

                    </select>

                  </div>

                </div>

                <div className="input-group">

                  <FaWallet />

                  <input
                    type="number"
                    name="total"
                    min="1"
                    placeholder={text.totalBudget}
                    value={form.total}
                    onChange={handleChange}
                  />

                </div>

                <div className="input-group">

                  <FaMoneyBillWave />

                  <input
                    type="number"
                    name="accommodation"
                    min="0"
                    placeholder={text.accommodation}
                    value={form.accommodation}
                    onChange={handleChange}
                  />

                </div>

                <div className="input-group">

                  <FaMoneyBillWave />

                  <input
                    type="number"
                    name="food"
                    min="0"
                    placeholder={text.food}
                    value={form.food}
                    onChange={handleChange}
                  />

                </div>

                <div className="input-group">

                  <FaMoneyBillWave />

                  <input
                    type="number"
                    name="transport"
                    min="0"
                    placeholder={text.transport}
                    value={form.transport}
                    onChange={handleChange}
                  />

                </div>

                <div className="input-group">

                  <FaMoneyBillWave />

                  <input
                    type="number"
                    name="shopping"
                    min="0"
                    placeholder={text.shopping}
                    value={form.shopping}
                    onChange={handleChange}
                  />

                </div>

                <div className="input-group">

                  <FaMoneyBillWave />

                  <input
                    type="number"
                    name="activities"
                    min="0"
                    placeholder={text.activities}
                    value={form.activities}
                    onChange={handleChange}
                  />

                </div>

                <div className="input-group">

                  <FaMoneyBillWave />

                  <input
                    type="number"
                    name="other"
                    min="0"
                    placeholder={text.otherExpenses}
                    value={form.other}
                    onChange={handleChange}
                  />

                </div>

              </div>

              <button
                type="submit"
                className="save-budget-btn"
                disabled={saving}
              >

                <FaPlus />

                {saving
                  ? text.saving
                  : text.saveBudget}

              </button>

            </form>

          </div>

          {/* BUDGET LIST */}

          <div className="budget-list">

            <div className="section-header">

              <div>

                <span className="section-tag">
                  {text.yourBudgets}
                </span>

                <h2>
                  {text.budgetOverview}
                </h2>

                <p>
                  {text.overviewDescription}
                </p>

              </div>

            </div>

            {budgets.length === 0 ? (

              <div className="empty-budget">

                <FaWallet className="empty-icon" />

                <h2>
                  {text.noBudget}
                </h2>

                <p>
                  {text.emptyDescription}
                </p>

              </div>

            ) : (

              <div className="budget-grid">

                {budgets.map((budget) => {

                  const spent =
                    Number(
                      budget.accommodation || 0
                    ) +
                    Number(
                      budget.food || 0
                    ) +
                    Number(
                      budget.transport || 0
                    ) +
                    Number(
                      budget.shopping || 0
                    ) +
                    Number(
                      budget.activities || 0
                    ) +
                    Number(
                      budget.other || 0
                    );

                  const remaining =
                    Number(
                      budget.total || 0
                    ) - spent;

                  const budgetId =
                    budget._id || budget.id;

                  return (

                    <div
                      className="budget-card"
                      key={budgetId}
                    >

                      <div className="budget-card-header">

                        <div>

                          <h3>
                            {budget.tripName}
                          </h3>

                          <span>
                            {text.currency} :{" "}
                            <strong>
                              {budget.currency}
                            </strong>
                          </span>

                        </div>

                      </div>

                      <div className="budget-stats">

                        <div className="stat-box">

                          <h4>
                            {text.total}
                          </h4>

                          <p>
                            {budget.currency}
                            {Number(
                              budget.total || 0
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </p>

                        </div>

                        <div className="stat-box">

                          <h4>
                            {text.spent}
                          </h4>

                          <p>
                            {budget.currency}
                            {spent.toLocaleString(
                              "en-IN"
                            )}
                          </p>

                        </div>

                        <div className="stat-box">

                          <h4>
                            {text.remaining}
                          </h4>

                          <p>
                            {budget.currency}
                            {remaining.toLocaleString(
                              "en-IN"
                            )}
                          </p>

                        </div>

                      </div>

                      <div className="expense-list">

                        <p>
                          🏨 {text.accommodation} :
                          {" "}
                          {budget.currency}
                          {budget.accommodation || 0}
                        </p>

                        <p>
                          🍽 {text.food} :
                          {" "}
                          {budget.currency}
                          {budget.food || 0}
                        </p>

                        <p>
                          🚕 {text.transport} :
                          {" "}
                          {budget.currency}
                          {budget.transport || 0}
                        </p>

                        <p>
                          🛍 {text.shopping} :
                          {" "}
                          {budget.currency}
                          {budget.shopping || 0}
                        </p>

                        <p>
                          🎟 {text.activities} :
                          {" "}
                          {budget.currency}
                          {budget.activities || 0}
                        </p>

                        <p>
                          📦 {text.otherExpenses} :
                          {" "}
                          {budget.currency}
                          {budget.other || 0}
                        </p>

                      </div>

                      <div className="budget-actions">

  <button
    type="button"
    className="edit-btn"
    onClick={() => editBudget(budget)}
  >
    <FaEdit />
    {text.editBudget}
  </button>

  <button
    type="button"
    className="delete-btn"
    onClick={() => deleteBudget(budgetId)}
  >
    {text.deleteBudget}
  </button>

</div>

                    </div>

                  );
                })}

              </div>

            )}

          </div>

          {/* CTA */}

          <div className="budget-cta">

            <div className="cta-content">

              <h2>
                {text.smartBudgetTitle}
              </h2>

              <p>
                {text.smartBudgetDescription}
              </p>

              <button
                className="cta-btn"
                type="button"
                onClick={() =>
                  document
                    .querySelector(
                      ".budget-form-card"
                    )
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >

                <FaPlaneDeparture />

                {text.startNextTrip}

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}