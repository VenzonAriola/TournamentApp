let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create reference to the model (dbschema )
let Bracket = require("../models/bracket");

//display tournament info
module.exports.displayBracketList = (req, res, next) => {
  Bracket.find((err, bracketList) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("bracket/teamlist", {
        title: "Bracket",
        BracketList: bracketList,
      });
      //render bracket.ejs and pass title and Bracketlist variable we are passing bracketList object to BracketList property
    }
  });
};

module.exports.addpage = (req, res, next) => {
  res.render("bracket/createPage", { title: "Add TeamBracket" });
};

module.exports.addprocesspage = (req, res, next) => {
  let newbracket = Bracket({
    tournamentName: req.body.tournamentName,
    gameType: req.body.gameType,
    players: req.body.players,
    description: req.body.description,
    teams: req.body.teams,
  });

  Bracket.create(newbracket, (err, Bracket) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/bracket-list");
      console.log(req.body.teams);
    }
  });
};

//show display for add player
module.exports.addPlayerpage = async (req, res, next) => {
  let id = req.params.id; //id of actual object

  Bracket.findById(id, (err, bracketoshow) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("bracket/list", {
        title: "Tournament Bracket",
        bracket: bracketoshow,
      });
      console.log(bracketoshow);
    }
  });
};

module.exports.displayeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  Bracket.findById(id, (err, bracketoedit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("bracket/edit", {
        title: "Edit Bracket",
        bracket: bracketoedit,
      });
    }
  });
};

module.exports.processingeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  let updatebracket = Bracket({
    _id: id,
    tournamentName: req.body.tournamentName,
    gameType: req.body.gameType,
    players: req.body.players,
    description: req.body.description,
    teams: req.body.teams,
  });
  Bracket.updateOne({ _id: id }, updatebracket, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the bracket list
      res.redirect("/bracket-list");
    }
  });
};

module.exports.deletepage = (req, res, next) => {
  let id = req.params.id;
  Bracket.deleteOne({ _id: id }, (err) => {
    //remove
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh bracket list
      res.redirect("/bracket-list");
    }
  });
  //res.redirect("/bracket-list");
};
