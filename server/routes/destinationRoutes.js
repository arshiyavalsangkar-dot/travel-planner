const express = require("express");
const router = express.Router();

const Destination = require("../models/Destination");
const protect = require("../auth/authMiddleware");


// ============================
// GOOGLE TRANSLATE
// ============================

let translateFunction = null;

const getTranslate = async () => {
  if (!translateFunction) {
    const module =
      await import("@vitalets/google-translate-api");

    translateFunction = module.translate;
  }

  return translateFunction;
};


const translateText = async (
  text,
  targetLanguage
) => {
  if (!text || !text.trim()) {
    return "";
  }

  const translate = await getTranslate();

  const result = await translate(
    text.trim(),
    {
      to: targetLanguage,
    }
  );

  return result.text;
};


// ============================
// GET DESTINATIONS
// ============================

router.get("/", protect, async (req, res) => {
  try {
    const destinations =
      await Destination.find({
        user: req.user.id,
      }).sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      destinations,
    });

  } catch (error) {
    console.error(
      "Get Destinations Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch destinations",
    });
  }
});


// ============================
// ADD DESTINATION
// ============================

router.post("/", protect, async (req, res) => {
  try {
    const {
      name,
      country,
      image,
      bestTime,
      budget,
      description,
    } = req.body;

    if (!name || !country) {
      return res.status(400).json({
        success: false,
        message:
          "Destination name and country are required",
      });
    }

    const cleanName = name.trim();
    const cleanCountry = country.trim();
    const cleanBestTime =
      bestTime?.trim() || "";
    const cleanDescription =
      description?.trim() || "";

    console.log(
      "Translating destination..."
    );

    // ============================
    // HINDI
    // ============================

    const nameHindi =
      await translateText(
        cleanName,
        "hi"
      );

    const countryHindi =
      await translateText(
        cleanCountry,
        "hi"
      );

    const bestTimeHindi =
      await translateText(
        cleanBestTime,
        "hi"
      );

    const descriptionHindi =
      await translateText(
        cleanDescription,
        "hi"
      );

    // ============================
    // MARATHI
    // ============================

    const nameMarathi =
      await translateText(
        cleanName,
        "mr"
      );

    const countryMarathi =
      await translateText(
        cleanCountry,
        "mr"
      );

    const bestTimeMarathi =
      await translateText(
        cleanBestTime,
        "mr"
      );

    const descriptionMarathi =
      await translateText(
        cleanDescription,
        "mr"
      );

    // ============================
    // SAVE
    // ============================

    const destination =
      await Destination.create({
        user: req.user.id,

        // English
        name: cleanName,
        country: cleanCountry,
        bestTime: cleanBestTime,
        description:
          cleanDescription,

        // Hindi
        nameHindi,
        countryHindi,
        bestTimeHindi,
        descriptionHindi,

        // Marathi
        nameMarathi,
        countryMarathi,
        bestTimeMarathi,
        descriptionMarathi,

        // Other
        image: image || "",
        budget: budget || "",
        favorite: false,
      });

    console.log(
      "Destination translations saved."
    );

    res.status(201).json({
      success: true,
      message:
        "Destination added successfully",
      destination,
    });

  } catch (error) {
    console.error(
      "Add Destination Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to add destination",
    });
  }
});


// ============================
// UPDATE FAVORITE
// ============================

router.put("/:id", protect, async (req, res) => {
  try {
    const { favorite } = req.body;

    const destination =
      await Destination.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user.id,
        },
        {
          favorite,
        },
        {
          new: true,
        }
      );

    if (!destination) {
      return res.status(404).json({
        success: false,
        message:
          "Destination not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Favorite status updated",
      destination,
    });

  } catch (error) {
    console.error(
      "Update Destination Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to update destination",
    });
  }
});


// ============================
// DELETE DESTINATION
// ============================

router.delete(
  "/:id",
  protect,
  async (req, res) => {
    try {
      const destination =
        await Destination.findOneAndDelete({
          _id: req.params.id,
          user: req.user.id,
        });

      if (!destination) {
        return res.status(404).json({
          success: false,
          message:
            "Destination not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Destination deleted successfully",
      });

    } catch (error) {
      console.error(
        "Delete Destination Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to delete destination",
      });
    }
  }
);


module.exports = router;