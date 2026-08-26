const express = require("express");
const router = express.Router();

const Note = require("../models/Note");
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


// ============================
// TRANSLATE TEXT
// ============================

const translateText = async (
  text,
  targetLanguage
) => {
  const translate = await getTranslate();

  const result = await translate(text, {
    to: targetLanguage,
  });

  return result.text;
};


// ============================
// GET ALL NOTES
// ============================

router.get("/", protect, async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    console.error(
      "Get Notes Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch notes",
    });
  }
});


// ============================
// ADD NOTE
// ============================

router.post("/", protect, async (req, res) => {
  try {
    const {
      title,
      category,
      description,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message:
          "Title and description are required",
      });
    }

    const cleanTitle = title.trim();

    const cleanDescription =
      description.trim();

    console.log(
      "Translating new note..."
    );

    // ============================
    // HINDI
    // ============================

    const titleHindi =
      await translateText(
        cleanTitle,
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

    const titleMarathi =
      await translateText(
        cleanTitle,
        "mr"
      );

    const descriptionMarathi =
      await translateText(
        cleanDescription,
        "mr"
      );

    console.log(
      "Hindi Title:",
      titleHindi
    );

    console.log(
      "Marathi Title:",
      titleMarathi
    );

    // ============================
    // SAVE NOTE
    // ============================

    const note = await Note.create({
      user: req.user.id,

      // English
      title: cleanTitle,

      description:
        cleanDescription,

      // Hindi
      titleHindi,

      descriptionHindi,

      // Marathi
      titleMarathi,

      descriptionMarathi,

      // Category
      category:
        category || "General",

      important: false,
    });

    res.status(201).json({
      success: true,

      message:
        "Note added successfully",

      note,
    });

  } catch (error) {
    console.error(
      "Add Note / Translation Error:",
      error
    );

    res.status(500).json({
      success: false,

      message:
        error.message ||
        "Failed to add note",
    });
  }
});


// ============================
// UPDATE NOTE
// ============================

router.put("/:id", protect, async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      important,
    } = req.body;

    const updateData = {};

    // ============================
    // TITLE
    // ============================

    if (title !== undefined) {
      const cleanTitle =
        title.trim();

      updateData.title =
        cleanTitle;

      updateData.titleHindi =
        await translateText(
          cleanTitle,
          "hi"
        );

      updateData.titleMarathi =
        await translateText(
          cleanTitle,
          "mr"
        );
    }

    // ============================
    // DESCRIPTION
    // ============================

    if (
      description !== undefined
    ) {
      const cleanDescription =
        description.trim();

      updateData.description =
        cleanDescription;

      updateData.descriptionHindi =
        await translateText(
          cleanDescription,
          "hi"
        );

      updateData.descriptionMarathi =
        await translateText(
          cleanDescription,
          "mr"
        );
    }

    // ============================
    // CATEGORY
    // ============================

    if (
      category !== undefined
    ) {
      updateData.category =
        category;
    }

    // ============================
    // IMPORTANT
    // ============================

    if (
      important !== undefined
    ) {
      updateData.important =
        important;
    }

    // ============================
    // UPDATE DATABASE
    // ============================

    const note =
      await Note.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user.id,
        },
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,

      message:
        "Note updated successfully",

      note,
    });

  } catch (error) {
    console.error(
      "Update Note / Translation Error:",
      error
    );

    res.status(500).json({
      success: false,

      message:
        error.message ||
        "Failed to update note",
    });
  }
});


// ============================
// DELETE NOTE
// ============================

router.delete(
  "/:id",
  protect,
  async (req, res) => {
    try {
      const note =
        await Note.findOneAndDelete({
          _id: req.params.id,
          user: req.user.id,
        });

      if (!note) {
        return res.status(404).json({
          success: false,
          message: "Note not found",
        });
      }

      res.status(200).json({
        success: true,

        message:
          "Note deleted successfully",
      });

    } catch (error) {
      console.error(
        "Delete Note Error:",
        error
      );

      res.status(500).json({
        success: false,

        message:
          "Failed to delete note",
      });
    }
  }
);


module.exports = router;