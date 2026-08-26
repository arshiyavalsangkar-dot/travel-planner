const express = require("express");
const router = express.Router();

const Packing = require("../models/Packing");
const protect = require("../auth/authMiddleware");

// GET all packing items
router.get("/", protect, async (req, res) => {
  try {
    const items = await Packing.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    console.error("Get Packing Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch packing items",
    });
  }
});

// ADD packing item
router.post("/", protect, async (req, res) => {
  try {
    const { item, category, quantity } = req.body;

    if (!item || !category) {
      return res.status(400).json({
        success: false,
        message: "Item and category are required",
      });
    }

    const newItem = await Packing.create({
      user: req.user.id,
      item,
      category,
      quantity: quantity || 1,
      packed: false,
    });

    res.status(201).json({
      success: true,
      message: "Packing item added successfully",
      item: newItem,
    });
  } catch (error) {
    console.error("Add Packing Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add packing item",
    });
  }
});

// UPDATE packed status
// UPDATE packing item
router.put("/:id", protect, async (req, res) => {
  try {
    const { item, category, quantity, packed } = req.body;

    const updatedItem = await Packing.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        ...(item !== undefined && { item }),
        ...(category !== undefined && { category }),
        ...(quantity !== undefined && { quantity }),
        ...(packed !== undefined && { packed }),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Packing item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Packing item updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    console.error("Update Packing Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update packing item",
    });
  }
});

// DELETE packing item
router.delete("/:id", protect, async (req, res) => {
  try {
    const deletedItem = await Packing.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Packing item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Packing item deleted successfully",
    });
  } catch (error) {
    console.error("Delete Packing Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete packing item",
    });
  }
});

module.exports = router;