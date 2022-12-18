const MongoClient = require('mongodb').MongoClient;
const { UpdateMany } = require('mongodb').UpdateMany;

MongoClient.connect('mongodb+srv://new-comp229:4gSSgLOlGI5sqFYz@cluster0.jbrwwc5.mongodb.net/sample_brackets?retryWrites=true&w=majority', (err, client) => {
  if (err) {
    return console.log(err);
  }

  const collection = client.db('sample_brackets').collection('bracketsample');

  collection.bulkWrite([
    {
      updateMany: {
        filter: { startdate: { $lte: new Date() } },
        update: { $set: { status: "active"} }
      }
    }
  ]);

  client.close();
});