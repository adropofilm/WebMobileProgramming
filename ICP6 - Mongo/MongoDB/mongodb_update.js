/**
 * Created by Vijaya Yeruva on 5/27/2017.
 */

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var myquery = {address: /^S/};
    var newvalues = {$set: {name: "Minnie"}};
    var myoptions = {multi: true};
    var dbase = db.db("mydb");
    dbase.collection("newCollection").updateMany(myquery, newvalues, myoptions, function (err, res) {
        if (err) throw err;
        console.log(res.result.nModified + " record(s) updated");
        db.close();
    });
});
