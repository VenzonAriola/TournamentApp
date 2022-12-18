const mongoose = require('mongoose');
const cron = require('node-cron');
let Bracket = require("../models/bracket");

cron.schedule('0 * * * *', () => {
  const currentDate = new Date();
  Bracket.updateMany({ startDate: { $lte: currentDate } }, { $set: { status: 'active' } }, function(err, res) {
    console.log(res.nModified + " document(s) updated");
  });
});