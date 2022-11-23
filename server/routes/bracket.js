let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let jwt = require("jsonwebtoken");
let passport = require("passport");
// connect to our Bracket Model
let Bracket = require("../models/bracket");

let bracketController = require("../controllers/bracket");

// helper function for guard purposes
function requireAuth(req, res, next) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
      return res.redirect("/login");
    }
    next();
  }

// /* GET Route for the Bracket List page - READ OPeration */
 router.get("/", bracketController.displayBracketList);

// /* GET Route for displaying Add page - Create OPeration */
router.get("/createPage",requireAuth, bracketController.addpage);

router.get("/show/:id",requireAuth, bracketController.addPlayerpage);

// /* POST Route for processing Add page - Create OPeration */
router.post("/createPage", bracketController.addprocesspage);



// /* GET Route for displaying Edit page -UPDATE OPeration */
router.get("/edit/:id",requireAuth, bracketController.displayeditpage);

// /*POST Route for processing Edit page - UPDATE OPeration */
router.post("/edit/:id",requireAuth, bracketController.processingeditpage);

// /* GET to perform book deletion -Delete OPeration */
router.get("/delete/:id",requireAuth, bracketController.deletepage);




module.exports = router;
