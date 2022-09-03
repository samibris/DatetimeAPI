const express = require('express');
const moment = require('moment-timezone');
var momentDurationFormat = require("moment-duration-format");

const app = express();

app.use(express.json());

app.post("/datetime", (req, res) => {
    // Read datetime 1
    const jdate1 = req.body.date1;
    const jtime1 = req.body.time1;
    const jzone1 = req.body.zone1;
    // Read datetime2
    const jdate2 = req.body.date2;
    const jtime2 = req.body.time2;
    const jzone2 = req.body.zone2;
    // Read operation to do
    const joption = req.body.option;

    switch(joption){
        // Find out number of days
        case '1':
            //fn_Days();
            var a = moment.tz("2013-11-17T01:55:10", "America/Bogota");
            var b = moment.tz("2013-11-17T23:55:30", "Australia/Adelaide");
            console.log(a);
            console.log(b);
            console.log(a.diff(b, 'days'));
            var duration = moment.duration(b.diff(a));
            var t3 = duration.hours() + ":" + duration.minutes() + ":" + duration.seconds();
            console.log(t3);
            console.log(duration.hours());
            console.log(duration.minutes());
            console.log(duration.seconds());

            break;       
        // Find out number of weekdays
        case '2':
            //fn_Weekdays();
            break;
        // Find out number of complete weeks
        case '3':
            //fn_CmpWeeks();
            break;
        // return error message
        default:
            res.json({ message: 'Error - Invalid option'});
    }
    
});

app.listen(3000, () => console.log ("API Server is running..."));