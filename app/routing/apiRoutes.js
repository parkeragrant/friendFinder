// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var compatibilityData = require("../data/friends");

var resultArr = [];



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(compatibilityData);
    });



    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body-parser middleware
        // console.log(compatibilityData);

        compatibilityData.push(req.body);
        // res.json(true);

        resultArr = [];

        compatibilityData.forEach(function (item, index) {

            if (index === (compatibilityData.length - 1)) {
                return;
            }

            var dateScoreArr = compatibilityData[index].scores;
            var newScoreArr = compatibilityData[(compatibilityData.length - 1)].scores;
            var totalScore = 0;

            for (i = 0; i < 10; i++) {

                var dif = parseInt(dateScoreArr[i] - newScoreArr[i])
                var absDif = (Math.abs(dif));

                totalScore = totalScore + absDif



            };

            resultArr.push(totalScore);
        });



        console.log(resultArr);
        console.log(compatibilityData);


        var arrMin = (Math.min(...resultArr));

        var indexArrValue = resultArr.indexOf(arrMin);

        var bestMatchName = compatibilityData[indexArrValue].name;

        console.log(indexArrValue);
        console.log(bestMatchName);

        res.json({ name: bestMatchName });
        // res.send(new Buffer(bestMatchName));











        // console.log(compatibilityData);


        // for (i = 0; i < compatibilityData.length; i++) {
        //     console.log(compatibilityData[i].scores);

        //     var scoreArr = compatibilityData[i].scores


        //     // compare to Sarah
        //     for (d = 0; d < scoreArr.length; d++) {
        //         console.log(scoreArr[d]);

        //     };

        // };



    });


};
