import express from "express";

import petModel from "../../models/petSchema.js";
import authenticateAdmin from "../../middleware/authenticate.js";
import { signToken } from "../../utils/authToken.js";
import { jwtSecret } from "../../utils/secrets.js";


const adminRouter = express.Router();

adminRouter.get("/verifyAdmin", async (req, res) => {
  const pass = req.headers.passkey;
  if (!pass) {
    res.status(400).json({
      status: false,
      message: "Access denied",
    });
    return;
  }
  try {
    if (pass === jwtSecret) {
      const token = signToken({
        userId: "amitohlyan1997",
        userType: "admin",
      });
      res.status(200).json({
        authToken : token,
        status: true,
        message: "Logged In",
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Incorrect Password",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
});

adminRouter.post("/pet", authenticateAdmin, async (req, res) => {
  try {
    const name = req.body.name;
    const breed = req.body.breed;
    const thumbnail = req.body.thumbnail;
    const images = req.body.images || [];
    if (!name || !breed || !thumbnail) {
      res.status(400).json({
        status: false,
        message: "Missing information",
      });
      return;
    }
    
    const newPet = new petModel({
      name: name,
      breed: breed,
      thumbnail: thumbnail,
      images: images,
    });
    newPet.save();
    res.status(200).json({
      status: true,
      message: "Pet created",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Something went wrong adding new pet",
    });
    return;
  }
});

adminRouter.patch("/pet/", authenticateAdmin, async (req, res) => {
  const petId = req.body._id;
  const name = req.body.name;
  const breed = req.body.breed;
  const thumbnail = req.body.thumbnail;
  const images = req.body.images;

  if (!name || !breed || !thumbnail || !images || !petId) {
    res.status(400).json({
      status: false,
      message: "Missing information",
    });
    return;
  }

  try {
    const updatedPet = {
      name: name,
      breed: breed,
      thumbnail: thumbnail,
      images: images,
    };

    await petModel.findByIdAndUpdate(petId, updatedPet);
    res.status(200).json({
      status: true,
      message: "Pet updated",
    });
    return;
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
    return;
  }
});

adminRouter.delete("/pet/", authenticateAdmin, async (req, res) => {
  console.log(req.body)
  const petId = req.body._id;
  if (!petId) {
    res.status(400).json({
      status: false,
      message: "Missing pet Information",
    });
    return;
  }
  try {
    const pet = await petModel.findByIdAndDelete(petId);
    if (!pet) {
      res.status(400).json({
        status: false,
        message: "No pet Item found",
      });
    } else {
      res.status(200).json({
        status: true,
        message: "Pet deleted",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
    return;
  }
});

export default adminRouter;
