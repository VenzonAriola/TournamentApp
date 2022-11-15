let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create a model class
let bracketModel = mongoose.Schema(
  {
    tournamentName: String,
    gameType: String,
    players: Number,
    description: String,
    teams: Array,
  },

  {
    collection: "bracketsample",
  }
);

//bracketmodel to create new bracket more powerful than just class
module.exports = mongoose.model("Bracket", bracketModel);
