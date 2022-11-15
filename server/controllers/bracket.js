let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create reference to the model (dbschema )
let Bracket = require("../model/bracket");

module.exports.displayBracketList = (req, res, next) => {
    Bracket.find((err, bracketList) => {
    if (err) {
      return console.error(err);
    } else {
    

      res.render("bracket/display", { title: "Bracket", BracketList: bracketList });
      //render bracket.ejs and pass title and Bracketlist variable we are passing bracketList object to BracketList property
    }
  });
};

module.exports.addpage = (req, res, next) => {
  res.render("bracket/createPage", { title: "Add TeamBracket" });
};

module.exports.addPlayerpage = (req, res, next) => {
  res.render("bracket/createPageAddplayers", { title: "Add TeamBracket" });
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
      //refresh the bracket-list
      res.redirect("/bracket-list");
      console.log();
    }
  });
};



module.exports.displayeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  Bracket.findById(id, (err, Brackettoedit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("bracket/edit", { title: "Edit Bracket", bracket: brackettoedit });
    }
  });
};

module.exports.processingeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  let updatebook = Bracket({
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
      //refresh the book list
      res.redirect("/bracket-list");
    }
  });
};

module.exports.deletepage = (req, res, next) => {
  let id = req.params.id;
  Bracket.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh book list
      res.redirect("/bracket-list");
    }
  });
};

