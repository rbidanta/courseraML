var mongo = require('mongodb').MongoClient;

var test = require('assert');

var url = 'mongodb://localhost:27017/learnyoumongo';

var collection_name = 'prices';

var size = process.argv[2];



mongo.connect(url, function(err, db) {
      // db gives access to the database
        var collection = db.collection(collection_name);

        var agg_pipeline = [{$match: {'size': size}},{$group: { _id: 'average',average: {$avg: '$price'}}}];

        collection.aggregate(doc_obj, function(err,data) {
        if(err) throw err;
        console.log(data('average'));
        });

        db.close()
    });
