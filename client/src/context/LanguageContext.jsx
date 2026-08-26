import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

const translations = {
  // =====================================================
  // ENGLISH
  // =====================================================
  English: {
    // SIDEBAR

    addDestinationTitle: "Add Destination",
createDestinationList: "Create your personal destination list",
destinationName: "Destination Name",
country: "Country",
imageUrl: "Image URL",
bestTime: "Best Time to Visit",
budgetRange: "Budget Range",
destinationDescriptionPlaceholder: "Write something about this destination...",
addingDestination: "Adding...",
addDestination: "Add Destination",

myDestinations: "My Destinations",
savedDestinations: "Saved Destinations",
manageDestinations: "Manage and explore your saved destinations",
noDestinationsAdded: "No destinations added yet",
startAddingDestinations: "Start adding amazing places to your travel list",

bestTimeLabel: "Best Time:",
budgetLabel: "Budget:",
notAdded: "Not added",
noDescription: "No description available",

deleteDestination: "Delete",
readyExploreWorld: "Ready to Explore the World?",
destinationCtaDescription: "Discover new places and plan your next unforgettable journey.",
exploreMorePlaces: "Explore More Places",

      writeNoteHere: "Write your note here...",
      manageTravelIdeas: "Manage your travel ideas and important memories.",
      travelPlan: "Travel Plan",
      reminder: "Reminder",
      placesToVisit: "Places To Visit",
      packingIdea: "Packing Idea",
      other: "Other",

      edit: "Edit",
      editNote: "Edit Note",
      updateNote: "Update Note",
      updating: "Updating...",
      cancel: "Cancel",
      noteUpdatedSuccessfully: "Note updated successfully!",

      clothes: "Clothes",
      electronics: "Electronics",
      documents: "Documents",
      toiletries: "Toiletries",
      accessories: "Accessories",
      other: "Other",
      quantityLabel: "Quantity",
      edit: "Edit",
      packingItemUpdated: "Packing item updated successfully!",
        
    editExpense: "Edit Expense",
    updateExpense: "Update Expense",
    cancelEdit: "Cancel Edit",
    expenseUpdated: "Expense updated successfully!",
    failedToUpdateExpense: "Failed to update expense.",
   
    editExpense: "Edit Expense",
    expenseUpdated: "Expense updated successfully!",
    failedToUpdateExpense: "Failed to update expense.",
    
    dashboard: "Dashboard",
    trips: "Trips",
    itinerary: "Itinerary",
    budget: "Budget",
    expenses: "Expenses",
    packing: "Packing",
    notes: "Notes",
    destinations: "Destinations",
    profile: "Profile",
    logout: "Logout",

    // PROFILE
    myProfile: "My Profile",
    personalInformation: "Personal Information",
    preferredLanguage: "Preferred Language",
    saveChanges: "Save Changes",
    updateAccountDetails: "Update your account details below.",
    selectPreferredLanguage: "Select your preferred language.",
    changePhoto: "Change Photo",
    language: "Language",
    managePersonalInformation:
      "Manage your personal information and travel preferences.",
    profileUpdated: "Profile updated successfully!",
    travelMoreWorryLess: "Travel More, Worry Less",
    profileFooter:
      "Keep your profile updated for a better travel planning experience.",
    fullName: "Full Name",
    emailAddress: "Email Address",
    phoneNumber: "Phone Number",
    bioPlaceholder: "Write something about yourself...",
    selectLanguage: "Select Language",

    // COMMON
    addNewTrip: "Add New Trip",
    addNewExpense: "Add New Expense",
    addPackingItem: "Add Packing Item",
    addNewNote: "Add New Note",
    addNewDestination: "Add New Destination",
    addActivity: "Add Activity",

    english: "English",
    hindi: "Hindi",
    marathi: "Marathi",

    // DASHBOARD
    premiumTravelPlanner: "Premium Travel Planner",
    discoverAmazingPlaces: "Discover Amazing Places",
    aroundTheWorld: "Around The World",
    dashboardDescription:
      "Plan trips, manage your budget, organize itineraries and enjoy a smarter travel experience.",
    planNewTrip: "Plan New Trip",
    exploreDestinations: "Explore Destinations",
    totalTrips: "Total Trips",
    upcoming: "Upcoming",
    completed: "Completed",
    places: "Places",
    visitedCountries: "Visited Countries",
    totalBudget: "Total Budget",
    overallTripBudget: "Overall Trip Budget",
    packingItems: "Packing Items",
    readyToGo: "Ready To Go",
    upcomingJourney: "Upcoming Journey",
    noUpcomingTrip: "No Upcoming Trip",
    planNextJourney: "Plan your next journey",
    countryNotAdded: "Country not added",
    viewItinerary: "View Itinerary",
    readyNextAdventure: "Ready For Your Next Adventure?",
    ctaDescription:
      "Create your next trip, manage your travel budget, explore destinations and keep everything organized in one place.",
    startPlanning: "Start Planning",

    // EXPENSES
    travelExpenseManager: "TRAVEL EXPENSE MANAGER",
    trackEveryExpense: "Track Every Expense",
    ofYourJourney: "Of Your Journey",
    manageFoodHotelsTransport:
      "Manage food, hotels, transport and all your travel expenses in one place.",
    totalSpent: "Total Spent",
    addTravelExpenses:
      "Add and manage your travel expenses easily.",
    tripName: "Trip Name",
    expenseTitle: "Expense Title",
    selectCategory: "Select Category",
    accommodation: "Accommodation",
    food: "Food",
    transport: "Transport",
    shopping: "Shopping",
    activities: "Activities",
    other: "Other",
    currency: "Currency",
    amount: "Amount",
    expenseNotes: "Expense Notes",
    saving: "Saving...",
    expenseHistory: "EXPENSE HISTORY",
    yourExpenses: "Your Expenses",
    viewManageExpenses:
      "View and manage all your travel expenses.",
    noExpensesAdded: "No Expenses Added",
    startAddingExpenses:
      "Start adding expenses to keep track of your travel spending.",
    trip: "Trip",
    date: "Date",
    notesLabel: "Notes",
    noTrip: "No trip",
    noDate: "No date",
    noNotesAdded: "No notes added",
    deleteExpense: "Delete Expense",
    travelSmartExpenseControl:
      "Travel Smart With Expense Control",
    expenseCtaDescription:
      "Keep track of your spending and manage your travel budget with ease.",
    planNextTrip: "Plan Your Next Trip",

    // PACKING
    smartPackingPlanner: "SMART PACKING PLANNER",
    packSmartForYourJourney: "Pack Smart For Your Journey",
    packingDescription:
      "Organize your travel essentials, manage your packing list and never forget important items.",
    addPackingItemTitle: "Add Packing Item",
    addTravelEssentials:
      "Add your travel essentials here.",
    itemName: "Item Name",
    selectPackingCategory: "Select Category",
    clothes: "Clothes",
    electronics: "Electronics",
    documents: "Documents",
    toiletries: "Toiletries",
    accessories: "Accessories",
    quantity: "Quantity",
    adding: "Adding...",
    addItem: "Add Item",
    travelEssentials: "TRAVEL ESSENTIALS",
    yourPackingList: "Your Packing List",
    packingListDescription:
      "Track your items and mark them as packed before your journey.",
    noItemsAdded: "No Items Added",
    startPackingEssentials:
      "Start adding your travel essentials to create your packing checklist.",
    status: "Status",
    packed: "Packed",
    notPacked: "Not Packed",
    markPacked: "Mark Packed",
    markUnpacked: "Mark Unpacked",
    delete: "Delete",
    readyForNextAdventure:
      "Ready For Your Next Adventure?",
    packingCtaDescription:
      "Complete your packing checklist before your trip and travel with confidence.",
    startYourJourney: "Start Your Journey",

    // NOTES
    travelNotesOrganizer: "TRAVEL NOTES ORGANIZER",
    captureTravelMemories:
      "Capture Your Travel Memories",
    notesDescription:
      "Save your travel ideas, important reminders and journey experiences in one place.",
    addNewNoteTitle: "Add New Note",
    createNotesUpcomingTrips:
      "Create notes for your upcoming trips.",
    noteTitle: "Note Title",
    selectNoteCategory: "Select Category",
    travelPlan: "Travel Plan",
    reminder: "Reminder",
    placesToVisit: "Places To Visit",
    packingIdea: "Packing Idea",
    writeNote: "Write your note here...",
    savedNotes: "Saved Notes",
    myTravelNotes: "MY TRAVEL NOTES",
    manageTravelNotes:
      "Manage your travel ideas, reminders and important information.",
    noNotesAdded: "No Notes Added",
    startCreatingNotes:
      "Start creating notes for your upcoming adventures.",
    general: "General",
    deleteNote: "Delete Note",
    keepTravelMemorySafe:
      "Keep Every Travel Memory Safe",
    notesCtaDescription:
      "Save your ideas, plans and important travel details before starting your next adventure.",
    planNextJourneyButton:
      "Plan Your Next Journey",

    // DESTINATIONS
    destinationExplorer: "DESTINATION EXPLORER",
    discoverAmazingPlacesTitle:
      "Discover Amazing Places",
    destinationsDescription:
      "Save your favorite destinations, explore new locations and plan your next unforgettable journey.",
    addNewDestinationTitle:
      "Add New Destination",
    createDestinationList:
      "Create your own travel destination list.",
    destinationName: "Destination Name",
    country: "Country",
    imageUrlOptional: "Image URL (Optional)",
    bestTimeToVisit: "Best Time To Visit",
    budgetRange: "Budget Range",
    destinationDescription:
      "Destination Description",
    addingDestination: "Adding...",
    addDestination: "Add Destination",
    myDestinations: "MY DESTINATIONS",
    savedDestinations: "Saved Destinations",
    manageFavoritePlaces:
      "Explore and manage your favorite travel places.",
    noDestinationsAdded:
      "No Destinations Added",
    startAddingDreamDestinations:
      "Start adding your dream destinations for future trips.",
    bestTime: "Best Time",
    budget: "Budget",
    notAdded: "Not Added",
    noDescriptionAdded:
      "No description added",
    deleteDestination:
      "Delete Destination",
    readyExploreWorld:
      "Ready To Explore The World?",
    destinationCtaDescription:
      "Save your dream destinations, create unforgettable memories and start planning your next adventure.",
    exploreMorePlaces:
      "Explore More Places",
  },

  // =====================================================
  // HINDI
  // =====================================================
  Hindi: {
    // SIDEBAR

    addDestinationTitle: "गंतव्य जोड़ें",
createDestinationList: "अपनी व्यक्तिगत गंतव्य सूची बनाएं",
destinationName: "गंतव्य का नाम",
country: "देश",
imageUrl: "छवि URL",
bestTime: "यात्रा करने का सबसे अच्छा समय",
budgetRange: "बजट सीमा",
destinationDescriptionPlaceholder: "इस गंतव्य के बारे में कुछ लिखें...",
addingDestination: "जोड़ा जा रहा है...",
addDestination: "गंतव्य जोड़ें",

myDestinations: "मेरे गंतव्य",
savedDestinations: "सहेजे गए गंतव्य",
manageDestinations: "अपने सहेजे गए गंतव्यों को प्रबंधित करें और एक्सप्लोर करें",
noDestinationsAdded: "अभी तक कोई गंतव्य नहीं जोड़ा गया",
startAddingDestinations: "अपनी यात्रा सूची में शानदार जगहें जोड़ना शुरू करें",

bestTimeLabel: "सबसे अच्छा समय:",
budgetLabel: "बजट:",
notAdded: "जोड़ा नहीं गया",
noDescription: "कोई विवरण उपलब्ध नहीं है",

deleteDestination: "हटाएं",
readyExploreWorld: "क्या आप दुनिया घूमने के लिए तैयार हैं?",
destinationCtaDescription: "नई जगहों की खोज करें और अपनी अगली यादगार यात्रा की योजना बनाएं।",
exploreMorePlaces: "और जगहें एक्सप्लोर करें",

    writeNoteHere: "अपना नोट यहाँ लिखें...",
    manageTravelIdeas: "अपने यात्रा विचारों और महत्वपूर्ण यादों को व्यवस्थित करें।",
    travelPlan: "यात्रा योजना",
    reminder: "अनुस्मारक",
    placesToVisit: "घूमने की जगहें",
    packingIdea: "पैकिंग आइडिया",
    other: "अन्य",

    edit: "संपादित करें",
    editNote: "नोट संपादित करें",
    updateNote: "नोट अपडेट करें",
    updating: "अपडेट हो रहा है...",
    cancel: "रद्द करें",
    noteUpdatedSuccessfully: "नोट सफलतापूर्वक अपडेट किया गया!",

      clothes: "कपड़े",
      electronics: "इलेक्ट्रॉनिक्स",
      documents: "दस्तावेज़",
      toiletries: "टॉयलेटरीज़",
      accessories: "सामान",
      other: "अन्य",
    
    quantityLabel: "मात्रा",
    edit: "संपादित करें",

    packingItemUpdated: "पैकिंग आइटम सफलतापूर्वक अपडेट किया गया!",

    editExpense: "खर्च संपादित करें",
updateExpense: "खर्च अपडेट करें",
cancelEdit: "संपादन रद्द करें",
expenseUpdated: "खर्च सफलतापूर्वक अपडेट किया गया!",
failedToUpdateExpense: "खर्च अपडेट करने में विफल।",
   
    editExpense: "खर्च संपादित करें",
    expenseUpdated: "खर्च सफलतापूर्वक अपडेट किया गया!",
    failedToUpdateExpense: "खर्च अपडेट करने में विफल।",
    
    dashboard: "डैशबोर्ड",
    trips: "यात्राएँ",
    itinerary: "यात्रा कार्यक्रम",
    budget: "बजट",
    expenses: "खर्च",
    packing: "पैकिंग",
    notes: "नोट्स",
    destinations: "गंतव्य",
    profile: "प्रोफ़ाइल",
    logout: "लॉग आउट",

    // PROFILE
    myProfile: "मेरी प्रोफ़ाइल",
    personalInformation: "व्यक्तिगत जानकारी",
    preferredLanguage: "पसंदीदा भाषा",
    saveChanges: "परिवर्तन सहेजें",
    updateAccountDetails:
      "नीचे अपने खाते की जानकारी अपडेट करें।",
    selectPreferredLanguage:
      "अपनी पसंदीदा भाषा चुनें।",
    changePhoto: "फोटो बदलें",
    language: "भाषा",
    managePersonalInformation:
      "अपनी व्यक्तिगत जानकारी और यात्रा प्राथमिकताओं को प्रबंधित करें।",
    profileUpdated:
      "प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई!",
    travelMoreWorryLess:
      "अधिक यात्रा करें, कम चिंता करें",
    profileFooter:
      "बेहतर यात्रा योजना अनुभव के लिए अपनी प्रोफ़ाइल अपडेट रखें।",
    fullName: "पूरा नाम",
    emailAddress: "ईमेल पता",
    phoneNumber: "फोन नंबर",
    bioPlaceholder:
      "अपने बारे में कुछ लिखें...",
    selectLanguage: "भाषा चुनें",

    // COMMON
    addNewTrip: "नई यात्रा जोड़ें",
    addNewExpense: "नया खर्च जोड़ें",
    addPackingItem: "पैकिंग आइटम जोड़ें",
    addNewNote: "नया नोट जोड़ें",
    addNewDestination: "नया गंतव्य जोड़ें",
    addActivity: "गतिविधि जोड़ें",

    english: "अंग्रेज़ी",
    hindi: "हिंदी",
    marathi: "मराठी",

    // DASHBOARD
    premiumTravelPlanner:
      "प्रीमियम ट्रैवल प्लानर",
    discoverAmazingPlaces:
      "अद्भुत स्थान खोजें",
    aroundTheWorld:
      "दुनिया भर में",
    dashboardDescription:
      "यात्राओं की योजना बनाएं, बजट प्रबंधित करें, यात्रा कार्यक्रम व्यवस्थित करें और बेहतर यात्रा अनुभव का आनंद लें।",
    planNewTrip:
      "नई यात्रा की योजना बनाएं",
    exploreDestinations:
      "गंतव्य खोजें",
    totalTrips: "कुल यात्राएँ",
    upcoming: "आगामी",
    completed: "पूर्ण",
    places: "स्थान",
    visitedCountries:
      "देखे गए देश",
    totalBudget: "कुल बजट",
    overallTripBudget:
      "कुल यात्रा बजट",
    packingItems:
      "पैकिंग आइटम",
    readyToGo:
      "जाने के लिए तैयार",
    upcomingJourney:
      "आगामी यात्रा",
    noUpcomingTrip:
      "कोई आगामी यात्रा नहीं",
    planNextJourney:
      "अपनी अगली यात्रा की योजना बनाएं",
    countryNotAdded:
      "देश नहीं जोड़ा गया",
    viewItinerary:
      "यात्रा कार्यक्रम देखें",
    readyNextAdventure:
      "क्या आप अपने अगले रोमांच के लिए तैयार हैं?",
    ctaDescription:
      "अपनी अगली यात्रा बनाएं, यात्रा बजट प्रबंधित करें, गंतव्यों का पता लगाएं और सब कुछ एक ही जगह व्यवस्थित रखें।",
    startPlanning:
      "योजना शुरू करें",

    // EXPENSES
    travelExpenseManager:
      "यात्रा खर्च प्रबंधक",
    trackEveryExpense:
      "हर खर्च को ट्रैक करें",
    ofYourJourney:
      "अपनी यात्रा का",
    manageFoodHotelsTransport:
      "भोजन, होटल, परिवहन और सभी यात्रा खर्चों को एक ही जगह प्रबंधित करें।",
    totalSpent:
      "कुल खर्च",
    addTravelExpenses:
      "अपने यात्रा खर्चों को आसानी से जोड़ें और प्रबंधित करें।",
    tripName:
      "यात्रा का नाम",
    expenseTitle:
      "खर्च का नाम",
    selectCategory:
      "श्रेणी चुनें",
    accommodation:
      "आवास",
    food:
      "भोजन",
    transport:
      "परिवहन",
    shopping:
      "खरीदारी",
    activities:
      "गतिविधियाँ",
    other:
      "अन्य",
    currency:
      "मुद्रा",
    amount:
      "राशि",
    expenseNotes:
      "खर्च संबंधी नोट्स",
    saving:
      "सहेजा जा रहा है...",
    expenseHistory:
      "खर्च का इतिहास",
    yourExpenses:
      "आपके खर्च",
    viewManageExpenses:
      "अपने सभी यात्रा खर्च देखें और प्रबंधित करें।",
    noExpensesAdded:
      "कोई खर्च नहीं जोड़ा गया",
    startAddingExpenses:
      "अपने यात्रा खर्चों को ट्रैक करने के लिए खर्च जोड़ना शुरू करें।",
    trip:
      "यात्रा",
    date:
      "तारीख",
    notesLabel:
      "नोट्स",
    noTrip:
      "कोई यात्रा नहीं",
    noDate:
      "कोई तारीख नहीं",
    noNotesAdded:
      "कोई नोट नहीं जोड़ा गया",
    deleteExpense:
      "खर्च हटाएँ",
    travelSmartExpenseControl:
      "खर्च नियंत्रण के साथ स्मार्ट यात्रा करें",
    expenseCtaDescription:
      "अपने खर्चों पर नज़र रखें और अपने यात्रा बजट को आसानी से प्रबंधित करें।",
    planNextTrip:
      "अपनी अगली यात्रा की योजना बनाएं",

    // PACKING
    smartPackingPlanner:
      "स्मार्ट पैकिंग प्लानर",
    packSmartForYourJourney:
      "अपनी यात्रा के लिए स्मार्ट पैकिंग करें",
    packingDescription:
      "अपनी यात्रा की आवश्यक वस्तुओं को व्यवस्थित करें, पैकिंग सूची प्रबंधित करें और महत्वपूर्ण वस्तुओं को भूलने से बचें।",
    addPackingItemTitle:
      "पैकिंग आइटम जोड़ें",
    addTravelEssentials:
      "अपनी यात्रा की आवश्यक वस्तुएँ यहाँ जोड़ें।",
    itemName:
      "आइटम का नाम",
    selectPackingCategory:
      "श्रेणी चुनें",
    clothes:
      "कपड़े",
    electronics:
      "इलेक्ट्रॉनिक्स",
    documents:
      "दस्तावेज़",
    toiletries:
      "टॉयलेटरीज़",
    accessories:
      "सहायक वस्तुएँ",
    quantity:
      "मात्रा",
    adding:
      "जोड़ा जा रहा है...",
    addItem:
      "आइटम जोड़ें",
    travelEssentials:
      "यात्रा की आवश्यक वस्तुएँ",
    yourPackingList:
      "आपकी पैकिंग सूची",
    packingListDescription:
      "अपनी वस्तुओं को ट्रैक करें और यात्रा से पहले उन्हें पैक किया हुआ चिह्नित करें।",
    noItemsAdded:
      "कोई आइटम नहीं जोड़ा गया",
    startPackingEssentials:
      "अपनी पैकिंग चेकलिस्ट बनाने के लिए आवश्यक वस्तुएँ जोड़ना शुरू करें।",
    status:
      "स्थिति",
    packed:
      "पैक किया गया",
    notPacked:
      "पैक नहीं किया गया",
    markPacked:
      "पैक किया हुआ चिह्नित करें",
    markUnpacked:
      "अनपैक किया हुआ चिह्नित करें",
    delete:
      "हटाएँ",
    readyForNextAdventure:
      "क्या आप अपने अगले रोमांच के लिए तैयार हैं?",
    packingCtaDescription:
      "अपनी यात्रा से पहले पैकिंग चेकलिस्ट पूरी करें और आत्मविश्वास के साथ यात्रा करें।",
    startYourJourney:
      "अपनी यात्रा शुरू करें",

    // NOTES
    travelNotesOrganizer:
      "यात्रा नोट्स आयोजक",
    captureTravelMemories:
      "अपनी यात्रा की यादें संजोएँ",
    notesDescription:
      "अपने यात्रा विचार, महत्वपूर्ण रिमाइंडर और यात्रा अनुभव एक ही जगह सहेजें।",
    addNewNoteTitle:
      "नया नोट जोड़ें",
    createNotesUpcomingTrips:
      "अपनी आगामी यात्राओं के लिए नोट्स बनाएँ।",
    noteTitle:
      "नोट का शीर्षक",
    selectNoteCategory:
      "श्रेणी चुनें",
    travelPlan:
      "यात्रा योजना",
    reminder:
      "रिमाइंडर",
    placesToVisit:
      "घूमने की जगहें",
    packingIdea:
      "पैकिंग विचार",
    writeNote:
      "अपना नोट यहाँ लिखें...",
    savedNotes:
      "सहेजे गए नोट्स",
    myTravelNotes:
      "मेरे यात्रा नोट्स",
    manageTravelNotes:
      "अपने यात्रा विचार, रिमाइंडर और महत्वपूर्ण जानकारी प्रबंधित करें।",
    noNotesAdded:
      "कोई नोट नहीं जोड़ा गया",
    startCreatingNotes:
      "अपनी आगामी यात्राओं के लिए नोट्स बनाना शुरू करें।",
    general:
      "सामान्य",
    deleteNote:
      "नोट हटाएँ",
    keepTravelMemorySafe:
      "अपनी हर यात्रा की याद सुरक्षित रखें",
    notesCtaDescription:
      "अपनी अगली यात्रा शुरू करने से पहले अपने विचार, योजनाएँ और महत्वपूर्ण यात्रा विवरण सहेजें।",
    planNextJourneyButton:
      "अपनी अगली यात्रा की योजना बनाएं",

    // DESTINATIONS
    destinationExplorer:
      "गंतव्य एक्सप्लोरर",
    discoverAmazingPlacesTitle:
      "अद्भुत स्थान खोजें",
    destinationsDescription:
      "अपने पसंदीदा गंतव्य सहेजें, नई जगहें खोजें और अपनी अगली यादगार यात्रा की योजना बनाएं।",
    addNewDestinationTitle:
      "नया गंतव्य जोड़ें",
    createDestinationList:
      "अपनी यात्रा गंतव्यों की सूची बनाएँ।",
    destinationName:
      "गंतव्य का नाम",
    country:
      "देश",
    imageUrlOptional:
      "इमेज URL (वैकल्पिक)",
    bestTimeToVisit:
      "घूमने का सबसे अच्छा समय",
    budgetRange:
      "बजट सीमा",
    destinationDescription:
      "गंतव्य का विवरण",
    addingDestination:
      "जोड़ा जा रहा है...",
    addDestination:
      "गंतव्य जोड़ें",
    myDestinations:
      "मेरे गंतव्य",
    savedDestinations:
      "सहेजे गए गंतव्य",
    manageFavoritePlaces:
      "अपने पसंदीदा यात्रा स्थानों को देखें और प्रबंधित करें।",
    noDestinationsAdded:
      "कोई गंतव्य नहीं जोड़ा गया",
    startAddingDreamDestinations:
      "भविष्य की यात्राओं के लिए अपने सपनों के गंतव्य जोड़ना शुरू करें।",
    bestTime:
      "सबसे अच्छा समय",
    budget:
      "बजट",
    notAdded:
      "नहीं जोड़ा गया",
    noDescriptionAdded:
      "कोई विवरण नहीं जोड़ा गया",
    deleteDestination:
      "गंतव्य हटाएँ",
    readyExploreWorld:
      "क्या आप दुनिया घूमने के लिए तैयार हैं?",
    destinationCtaDescription:
      "अपने सपनों के गंतव्य सहेजें, यादगार पल बनाएँ और अपनी अगली यात्रा की योजना शुरू करें।",
    exploreMorePlaces:
      "और जगहें खोजें",
  },

  // =====================================================
  // MARATHI
  // =====================================================
  Marathi: {
    // SIDEBAR
    addDestinationTitle: "गंतव्य जोडा",
createDestinationList: "तुमची वैयक्तिक गंतव्य यादी तयार करा",
destinationName: "गंतव्याचे नाव",
country: "देश",
imageUrl: "प्रतिमा URL",
bestTime: "भेट देण्यासाठी योग्य वेळ",
budgetRange: "अंदाजे बजेट",
destinationDescriptionPlaceholder: "या गंतव्याबद्दल काही लिहा...",
addingDestination: "जोडत आहे...",
addDestination: "गंतव्य जोडा",

myDestinations: "माझी गंतव्ये",
savedDestinations: "जतन केलेली गंतव्ये",
manageDestinations: "तुमची जतन केलेली गंतव्ये व्यवस्थापित करा आणि एक्सप्लोर करा",
noDestinationsAdded: "अजून कोणतेही गंतव्य जोडलेले नाही",
startAddingDestinations: "तुमच्या प्रवासाच्या यादीत सुंदर ठिकाणे जोडण्यास सुरुवात करा",

bestTimeLabel: "योग्य वेळ:",
budgetLabel: "बजेट:",
notAdded: "जोडलेले नाही",
noDescription: "वर्णन उपलब्ध नाही",

deleteDestination: "हटवा",
readyExploreWorld: "जग एक्सप्लोर करण्यासाठी तयार आहात?",
destinationCtaDescription: "नवीन ठिकाणे शोधा आणि तुमच्या पुढील अविस्मरणीय प्रवासाची योजना करा.",
exploreMorePlaces: "अधिक ठिकाणे एक्सप्लोर करा",

    writeNoteHere: "तुमची नोंद येथे लिहा...",
    manageTravelIdeas: "तुमच्या प्रवासाच्या कल्पना आणि महत्त्वाच्या आठवणी व्यवस्थित करा.",
    travelPlan: "प्रवास योजना",
    reminder: "स्मरणपत्र",
    placesToVisit: "भेट देण्याची ठिकाणे",
    packingIdea: "पॅकिंग कल्पना",
    other: "इतर",

      edit: "संपादित करा",
      editNote: "नोट संपादित करा",
      updateNote: "नोट अपडेट करा",
      updating: "अपडेट होत आहे...",
      cancel: "रद्द करा",
      noteUpdatedSuccessfully: "नोट यशस्वीरित्या अपडेट केला!",

      clothes: "कपडे",
      electronics: "इलेक्ट्रॉनिक्स",
      documents: "कागदपत्रे",
      toiletries: "टॉयलेटरीज",
      accessories: "अॅक्सेसरीज",
      other: "इतर",

    quantityLabel: "प्रमाण",
    edit: "संपादित करा",

    editPackingItem: "पॅकिंग आयटम संपादित करा",
    updateItem: "आयटम अपडेट करा",
    updating: "अपडेट होत आहे...",
    cancel: "रद्द करा",
    packingItemUpdated: "पॅकिंग आयटम यशस्वीरित्या अपडेट केला!",

    editExpense: "खर्च संपादित करा",
    updateExpense: "खर्च अपडेट करा",
    cancelEdit: "संपादन रद्द करा",
    expenseUpdated: "खर्च यशस्वीरित्या अपडेट झाला!",
    failedToUpdateExpense: "खर्च अपडेट करण्यात अयशस्वी.",

    editExpense: "खर्च संपादित करा",
    expenseUpdated: "खर्च यशस्वीरित्या अपडेट केला!",
    failedToUpdateExpense: "खर्च अपडेट करण्यात अयशस्वी.",
    
    dashboard: "डॅशबोर्ड",
    trips: "सहली",
    itinerary: "प्रवासाचे नियोजन",
    budget: "बजेट",
    expenses: "खर्च",
    packing: "पॅकिंग",
    notes: "नोट्स",
    destinations: "ठिकाणे",
    profile: "प्रोफाइल",
    logout: "लॉग आउट",

    // PROFILE
    myProfile: "माझे प्रोफाइल",
    personalInformation: "वैयक्तिक माहिती",
    preferredLanguage: "पसंतीची भाषा",
    saveChanges: "बदल जतन करा",
    updateAccountDetails:
      "खाली तुमच्या खात्याची माहिती अपडेट करा.",
    selectPreferredLanguage:
      "तुमची पसंतीची भाषा निवडा.",
    changePhoto:
      "फोटो बदला",
    language:
      "भाषा",
    managePersonalInformation:
      "तुमची वैयक्तिक माहिती आणि प्रवासाच्या पसंती व्यवस्थापित करा.",
    profileUpdated:
      "प्रोफाइल यशस्वीरित्या अपडेट झाले!",
    travelMoreWorryLess:
      "जास्त प्रवास करा, कमी चिंता करा",
    profileFooter:
      "चांगल्या प्रवास नियोजनाच्या अनुभवासाठी तुमचे प्रोफाइल अपडेट ठेवा.",
    fullName:
      "पूर्ण नाव",
    emailAddress:
      "ईमेल पत्ता",
    phoneNumber:
      "फोन नंबर",
    bioPlaceholder:
      "स्वतःबद्दल काही लिहा...",
    selectLanguage:
      "भाषा निवडा",

    // COMMON
    addNewTrip:
      "नवीन सहल जोडा",
    addNewExpense:
      "नवीन खर्च जोडा",
    addPackingItem:
      "पॅकिंग वस्तू जोडा",
    addNewNote:
      "नवीन नोट जोडा",
    addNewDestination:
      "नवीन ठिकाण जोडा",
    addActivity:
      "उपक्रम जोडा",

    english:
      "इंग्रजी",
    hindi:
      "हिंदी",
    marathi:
      "मराठी",

    // DASHBOARD
    premiumTravelPlanner:
      "प्रीमियम ट्रॅव्हल प्लॅनर",
    discoverAmazingPlaces:
      "अद्भुत ठिकाणे शोधा",
    aroundTheWorld:
      "जगभरात",
    dashboardDescription:
      "सहलींचे नियोजन करा, बजेट व्यवस्थापित करा, प्रवासाचे नियोजन व्यवस्थित करा आणि उत्तम प्रवासाचा आनंद घ्या.",
    planNewTrip:
      "नवीन सहलीचे नियोजन करा",
    exploreDestinations:
      "ठिकाणे शोधा",
    totalTrips:
      "एकूण सहली",
    upcoming:
      "आगामी",
    completed:
      "पूर्ण",
    places:
      "ठिकाणे",
    visitedCountries:
      "भेट दिलेले देश",
    totalBudget:
      "एकूण बजेट",
    overallTripBudget:
      "एकूण सहलीचे बजेट",
    packingItems:
      "पॅकिंग वस्तू",
    readyToGo:
      "जाण्यासाठी तयार",
    upcomingJourney:
      "आगामी प्रवास",
    noUpcomingTrip:
      "कोणतीही आगामी सहल नाही",
    planNextJourney:
      "तुमच्या पुढील प्रवासाचे नियोजन करा",
    countryNotAdded:
      "देश जोडलेला नाही",
    viewItinerary:
      "प्रवासाचे नियोजन पहा",
    readyNextAdventure:
      "तुमच्या पुढील साहसासाठी तयार आहात का?",
    ctaDescription:
      "तुमची पुढील सहल तयार करा, प्रवासाचे बजेट व्यवस्थापित करा, ठिकाणे शोधा आणि सर्व काही एकाच ठिकाणी व्यवस्थित ठेवा.",
    startPlanning:
      "नियोजन सुरू करा",

    // EXPENSES
    travelExpenseManager:
      "प्रवास खर्च व्यवस्थापक",
    trackEveryExpense:
      "प्रत्येक खर्चाचा मागोवा घ्या",
    ofYourJourney:
      "तुमच्या प्रवासाचा",
    manageFoodHotelsTransport:
      "अन्न, हॉटेल, वाहतूक आणि सर्व प्रवास खर्च एकाच ठिकाणी व्यवस्थापित करा.",
    totalSpent:
      "एकूण खर्च",
    addTravelExpenses:
      "तुमचे प्रवास खर्च सहजपणे जोडा आणि व्यवस्थापित करा.",
    tripName:
      "सहलीचे नाव",
    expenseTitle:
      "खर्चाचे नाव",
    selectCategory:
      "श्रेणी निवडा",
    accommodation:
      "निवास",
    food:
      "अन्न",
    transport:
      "वाहतूक",
    shopping:
      "खरेदी",
    activities:
      "उपक्रम",
    other:
      "इतर",
    currency:
      "चलन",
    amount:
      "रक्कम",
    expenseNotes:
      "खर्चाच्या नोंदी",
    saving:
      "जतन करत आहे...",
    expenseHistory:
      "खर्चाचा इतिहास",
    yourExpenses:
      "तुमचे खर्च",
    viewManageExpenses:
      "तुमचे सर्व प्रवास खर्च पहा आणि व्यवस्थापित करा.",
    noExpensesAdded:
      "कोणताही खर्च जोडलेला नाही",
    startAddingExpenses:
      "तुमच्या प्रवास खर्चाचा मागोवा ठेवण्यासाठी खर्च जोडण्यास सुरुवात करा.",
    trip:
      "सहल",
    date:
      "तारीख",
    notesLabel:
      "नोंदी",
    noTrip:
      "कोणतीही सहल नाही",
    noDate:
      "तारीख नाही",
    noNotesAdded:
      "कोणतीही नोंद नाही",
    deleteExpense:
      "खर्च हटवा",
    travelSmartExpenseControl:
      "खर्च नियंत्रणासह स्मार्ट प्रवास करा",
    expenseCtaDescription:
      "तुमच्या खर्चाचा मागोवा घ्या आणि तुमचे प्रवास बजेट सहजपणे व्यवस्थापित करा.",
    planNextTrip:
      "तुमच्या पुढील सहलीचे नियोजन करा",

    // PACKING
    smartPackingPlanner:
      "स्मार्ट पॅकिंग प्लॅनर",
    packSmartForYourJourney:
      "तुमच्या प्रवासासाठी स्मार्ट पॅकिंग करा",
    packingDescription:
      "तुमच्या प्रवासातील आवश्यक वस्तू व्यवस्थित करा, पॅकिंग यादी व्यवस्थापित करा आणि महत्त्वाच्या वस्तू विसरू नका.",
    addPackingItemTitle:
      "पॅकिंग वस्तू जोडा",
    addTravelEssentials:
      "तुमच्या प्रवासातील आवश्यक वस्तू येथे जोडा.",
    itemName:
      "वस्तूचे नाव",
    selectPackingCategory:
      "श्रेणी निवडा",
    clothes:
      "कपडे",
    electronics:
      "इलेक्ट्रॉनिक्स",
    documents:
      "कागदपत्रे",
    toiletries:
      "टॉयलेटरीज",
    accessories:
      "अॅक्सेसरीज",
    quantity:
      "प्रमाण",
    adding:
      "जोडत आहे...",
    addItem:
      "वस्तू जोडा",
    travelEssentials:
      "प्रवासातील आवश्यक वस्तू",
    yourPackingList:
      "तुमची पॅकिंग यादी",
    packingListDescription:
      "तुमच्या वस्तूंचा मागोवा घ्या आणि प्रवासापूर्वी त्या पॅक केल्या आहेत असे चिन्हांकित करा.",
    noItemsAdded:
      "कोणतीही वस्तू जोडलेली नाही",
    startPackingEssentials:
      "तुमची पॅकिंग चेकलिस्ट तयार करण्यासाठी आवश्यक वस्तू जोडण्यास सुरुवात करा.",
    status:
      "स्थिती",
    packed:
      "पॅक केलेले",
    notPacked:
      "पॅक केलेले नाही",
    markPacked:
      "पॅक केलेले म्हणून चिन्हांकित करा",
    markUnpacked:
      "अनपॅक केलेले म्हणून चिन्हांकित करा",
    delete:
      "हटवा",
    readyForNextAdventure:
      "तुमच्या पुढील साहसासाठी तयार आहात का?",
    packingCtaDescription:
      "तुमच्या प्रवासापूर्वी पॅकिंग चेकलिस्ट पूर्ण करा आणि आत्मविश्वासाने प्रवास करा.",
    startYourJourney:
      "तुमचा प्रवास सुरू करा",

    // NOTES
    travelNotesOrganizer:
      "प्रवास नोट्स आयोजक",
    captureTravelMemories:
      "तुमच्या प्रवासाच्या आठवणी जतन करा",
    notesDescription:
      "तुमच्या प्रवासातील कल्पना, महत्त्वाच्या आठवणी आणि अनुभव एकाच ठिकाणी जतन करा.",
    addNewNoteTitle:
      "नवीन नोट जोडा",
    createNotesUpcomingTrips:
      "तुमच्या आगामी सहलींसाठी नोट्स तयार करा.",
    noteTitle:
      "नोटचे शीर्षक",
    selectNoteCategory:
      "श्रेणी निवडा",
    travelPlan:
      "प्रवास योजना",
    reminder:
      "स्मरणपत्र",
    placesToVisit:
      "भेट देण्याची ठिकाणे",
    packingIdea:
      "पॅकिंग कल्पना",
    writeNote:
      "तुमची नोट येथे लिहा...",
    savedNotes:
      "जतन केलेल्या नोट्स",
    myTravelNotes:
      "माझ्या प्रवासाच्या नोट्स",
    manageTravelNotes:
      "तुमच्या प्रवासाच्या कल्पना, स्मरणपत्रे आणि महत्त्वाची माहिती व्यवस्थापित करा.",
    noNotesAdded:
      "कोणतीही नोट जोडलेली नाही",
    startCreatingNotes:
      "तुमच्या आगामी साहसांसाठी नोट्स तयार करण्यास सुरुवात करा.",
    general:
      "सामान्य",
    deleteNote:
      "नोट हटवा",
    keepTravelMemorySafe:
      "प्रत्येक प्रवासाची आठवण सुरक्षित ठेवा",
    notesCtaDescription:
      "तुमचा पुढील प्रवास सुरू करण्यापूर्वी तुमच्या कल्पना, योजना आणि महत्त्वाची माहिती जतन करा.",
    planNextJourneyButton:
      "तुमच्या पुढील प्रवासाचे नियोजन करा",

    // DESTINATIONS
    destinationExplorer:
      "गंतव्य एक्सप्लोरर",
    discoverAmazingPlacesTitle:
      "अद्भुत ठिकाणे शोधा",
    destinationsDescription:
      "तुमची आवडती ठिकाणे जतन करा, नवीन ठिकाणे शोधा आणि तुमच्या पुढील अविस्मरणीय प्रवासाचे नियोजन करा.",
    addNewDestinationTitle:
      "नवीन ठिकाण जोडा",
    createDestinationList:
      "तुमची स्वतःची प्रवास ठिकाणांची यादी तयार करा.",
    destinationName:
      "ठिकाणाचे नाव",
    country:
      "देश",
    imageUrlOptional:
      "इमेज URL (ऐच्छिक)",
    bestTimeToVisit:
      "भेट देण्याचा सर्वोत्तम वेळ",
    budgetRange:
      "बजेट श्रेणी",
    destinationDescription:
      "ठिकाणाचे वर्णन",
    addingDestination:
      "जोडत आहे...",
    addDestination:
      "ठिकाण जोडा",
    myDestinations:
      "माझी ठिकाणे",
    savedDestinations:
      "जतन केलेली ठिकाणे",
    manageFavoritePlaces:
      "तुमची आवडती प्रवासाची ठिकाणे पहा आणि व्यवस्थापित करा.",
    noDestinationsAdded:
      "कोणतेही ठिकाण जोडलेले नाही",
    startAddingDreamDestinations:
      "भविष्यातील सहलींसाठी तुमची स्वप्नातील ठिकाणे जोडण्यास सुरुवात करा.",
    bestTime:
      "सर्वोत्तम वेळ",
    budget:
      "बजेट",
    notAdded:
      "जोडलेले नाही",
    noDescriptionAdded:
      "वर्णन जोडलेले नाही",
    deleteDestination:
      "ठिकाण हटवा",
    readyExploreWorld:
      "तुम्ही जग एक्सप्लोर करण्यासाठी तयार आहात का?",
    destinationCtaDescription:
      "तुमची स्वप्नातील ठिकाणे जतन करा, अविस्मरणीय आठवणी तयार करा आणि तुमच्या पुढील साहसाचे नियोजन सुरू करा.",
    exploreMorePlaces:
      "अधिक ठिकाणे एक्सप्लोर करा",
  },
};

// =====================================================
// LANGUAGE PROVIDER
// =====================================================

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language");

    if (
      savedLanguage &&
      Object.prototype.hasOwnProperty.call(
        translations,
        savedLanguage
      )
    ) {
      return savedLanguage;
    }

    return "English";
  });

  // Save language permanently
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Change language
  const changeLanguage = (newLanguage) => {
    if (
      !Object.prototype.hasOwnProperty.call(
        translations,
        newLanguage
      )
    ) {
      return;
    }

    setLanguage(newLanguage);

    window.dispatchEvent(
      new CustomEvent("languageChanged", {
        detail: newLanguage,
      })
    );
  };

  // Translation function
  const t = (key) => {
    return (
      translations[language]?.[key] ??
      translations.English?.[key] ??
      key
    );
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// =====================================================
// USE LANGUAGE HOOK
// =====================================================

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}