let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// connect to our Bracket Model
let Bracket = require("../models/bracket");

let bracketController = require("../controllers/bracket");

// /* GET Route for the Bracket List page - READ OPeration */
 router.get("/", bracketController.displayBracketList);

// /* GET Route for displaying Add page - Create OPeration */
router.get("/createPage", bracketController.addpage);

router.get("/show/:id", bracketController.addPlayerpage);

// /* POST Route for processing Add page - Create OPeration */
router.post("/createPage", bracketController.addprocesspage);



// /* GET Route for displaying Edit page -UPDATE OPeration */
router.get("/edit/:id", bracketController.displayeditpage);

// /*POST Route for processing Edit page - UPDATE OPeration */
router.post("/edit/:id", bracketController.processingeditpage);

// /* GET to perform book deletion -Delete OPeration */
router.get("/delete/:id", bracketController.deletepage);




module.exports = router;
