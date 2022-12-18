const mongoose = require('mongoose');
const cron = require('node-cron');
let Bracket = require("../models/bracket");

cron.schedule('0 * * * *', () => {
  const currentDate = new Date();
  Bracket.updateMany({ startdate: { $lte: currentDate } }, { $set: { status: 'Active' } }, function(err, res) {
    console.log(res.nModified + " document(s) updated");
  });
});