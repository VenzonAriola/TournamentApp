const MongoClient = require('mongodb').MongoClient;
const { UpdateOne } = require('mongodb').UpdateOne;

MongoClient.connect('mongodb+srv://new-comp229:4gSSgLOlGI5sqFYz@cluster0.jbrwwc5.mongodb.net/sample_brackets?retryWrites=true&w=majority', (err, client) => {
  if (err) {
    return console.log(err);
  }

  const collection = client.db('sample_brackets').collection('bracketsample');

  collection.aggregate([
    {
      $match: {
        startDate: { $lte: new Date() }
      }
    },
    {
      $set: {
        status: "active"
      }
    }
  ]).toArray((err, result) => {
    console.log(result);
  });

  client.close();
});